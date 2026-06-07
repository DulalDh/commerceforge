import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.jsx';

export const App = () => {
  return <RouterProvider router={router} />;
};
