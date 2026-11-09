import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// 1. Create the Axios Instance
export const apiClient = axios.create({
  baseURL: '/api', // تم التعديل لتجنب مشكلة الـ CORS
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const SERVER_MANAGED_FIELDS = new Set(['entered_by', 'client_id', 'entered_at']);

/** Remove audit and tenant fields recursively so UI payloads can never override JWT/server values. */
export function stripServerManagedFields(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stripServerManagedFields);
  if (!value || typeof value !== 'object') return value;

  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) return value;

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([key]) => !SERVER_MANAGED_FIELDS.has(key))
      .map(([key, nestedValue]) => [key, stripServerManagedFields(nestedValue)]),
  );
}

// 2. Request Interceptor (Add Token)
apiClient.interceptors.request.use(
  (config) => {
    // These values are derived by the API from the authenticated JWT / server clock.
    // Strip them from every JSON mutation body; entered_at is never client-controlled.
    if (['post', 'put', 'patch'].includes((config.method || '').toLowerCase()) && config.data !== undefined) {
      let requestBody: unknown = config.data;
      if (typeof requestBody === 'string' && config.headers?.['Content-Type']?.toString().includes('application/json')) {
        try { requestBody = JSON.parse(requestBody); } catch { /* Preserve non-JSON request bodies. */ }
      }
      config.data = stripServerManagedFields(requestBody);
    }

    // قراءة التوكن الحقيقي من الذاكرة
    const token = useAuthStore.getState().token; 
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor (Handle Errors globally)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // نمنع ظهور التنبيه إذا كان الخطأ قادماً من شاشة تسجيل الدخول نفسها
    const currentToken = useAuthStore.getState().token;
    const sentAuthorization = error.config?.headers?.Authorization;
    if (error.response?.status === 401 && error.config?.url !== '/login' && currentToken && sentAuthorization === `Bearer ${currentToken}`) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
