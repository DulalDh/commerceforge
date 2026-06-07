import { createBrowserRouter } from 'react-router-dom';
import { AdminRoute } from '../components/common/AdminRoute.jsx';
import { ProtectedRoute } from '../components/common/ProtectedRoute.jsx';
import { AdminLayout } from '../components/admin/AdminLayout.jsx';
import { MainLayout } from '../components/layout/MainLayout.jsx';
import { AdminCategoryManagementPage } from '../pages/AdminCategoryManagementPage.jsx';
import { AdminCouponManagementPage } from '../pages/AdminCouponManagementPage.jsx';
import { AdminCustomerListPage } from '../pages/AdminCustomerListPage.jsx';
import { AdminDashboardPage } from '../pages/AdminDashboardPage.jsx';
import { AdminOrderManagementPage } from '../pages/AdminOrderManagementPage.jsx';
import { AdminPaymentVerificationPage } from '../pages/AdminPaymentVerificationPage.jsx';
import { AdminProductManagementPage } from '../pages/AdminProductManagementPage.jsx';
import { AdminReviewModerationPage } from '../pages/AdminReviewModerationPage.jsx';
import { CartPage } from '../pages/CartPage.jsx';
import { CheckoutPage } from '../pages/CheckoutPage.jsx';
import { HomePage } from '../pages/HomePage.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';
import { NotFoundPage } from '../pages/NotFoundPage.jsx';
import { OrderHistoryPage } from '../pages/OrderHistoryPage.jsx';
import { OrderTrackingPage } from '../pages/OrderTrackingPage.jsx';
import { ProductDetailsPage } from '../pages/ProductDetailsPage.jsx';
import { ProductListingPage } from '../pages/ProductListingPage.jsx';
import { ProfilePage } from '../pages/ProfilePage.jsx';
import { RegisterPage } from '../pages/RegisterPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'products',
        element: <ProductListingPage />
      },
      {
        path: 'products/:productId',
        element: <ProductDetailsPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'cart',
            element: <CartPage />
          },
          {
            path: 'checkout',
            element: <CheckoutPage />
          },
          {
            path: 'profile',
            element: <ProfilePage />
          },
          {
            path: 'orders',
            element: <OrderHistoryPage />
          },
          {
            path: 'orders/:orderId/tracking',
            element: <OrderTrackingPage />
          }
        ]
      },
      {
        element: <AdminRoute />,
        children: [
          {
            path: 'admin',
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <AdminDashboardPage />
              },
              {
                path: 'products',
                element: <AdminProductManagementPage />
              },
              {
                path: 'categories',
                element: <AdminCategoryManagementPage />
              },
              {
                path: 'coupons',
                element: <AdminCouponManagementPage />
              },
              {
                path: 'orders',
                element: <AdminOrderManagementPage />
              },
              {
                path: 'payments',
                element: <AdminPaymentVerificationPage />
              },
              {
                path: 'customers',
                element: <AdminCustomerListPage />
              },
              {
                path: 'reviews',
                element: <AdminReviewModerationPage />
              }
            ]
          }
        ]
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);
