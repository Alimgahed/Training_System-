import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export default function AuthenticatedRoutes() {
  return <RouterProvider router={router} />;
}
