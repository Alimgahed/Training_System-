import { Button } from '../../../shared/components/Button';
import { useOrganizationTypes } from '../api/useOrganizationTypes';

export function OrganizationTypesList() {
  // استدعاء الـ Hook المخصص الذي بنيناه
  const { data, isLoading, isError, error, refetch } = useOrganizationTypes();

  // 1. معالجة حالة التحميل (Loading State)
  if (isLoading) {
    return <div style={{ padding: '20px' }}>جاري تحميل أنواع المنظمات...</div>;
  }

  // 2. معالجة حالة الخطأ (Error State)
  if (isError) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <p>حدث خطأ أثناء جلب البيانات: {error?.message}</p>
        <Button variant="danger" onClick={() => refetch()}>إعادة المحاولة</Button>
      </div>
    );
  }

  // 3. معالجة حالة النجاح وعرض البيانات (Success State)
  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h2>أنواع المنظمات</h2>
      
      {data?.length === 0 ? (
        <p>لا توجد بيانات.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {data?.map((org) => (
            <li 
              key={org.id} 
              style={{ 
                padding: '15px', 
                border: '1px solid #ddd',
                borderRadius: '8px',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <strong>{org.name}</strong> 
              <span style={{ display: 'block', fontSize: '12px', color: '#666' }}>
                رقم العميل: {org.client_id}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
