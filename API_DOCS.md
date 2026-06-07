# API Docs

Base URL:

```text
/api/v1
```

Authentication:

```text
Authorization: Bearer <accessToken>
```

## Auth

| Method | Path | Access |
| --- | --- | --- |
| POST | `/auth/register` | Public |
| POST | `/auth/login` | Public |

## Users

| Method | Path | Access |
| --- | --- | --- |
| GET | `/users/me` | Customer/Admin |
| PATCH | `/users/me` | Customer/Admin |
| POST | `/users/me/addresses` | Customer/Admin |
| PATCH | `/users/me/addresses/:addressId` | Customer/Admin |
| DELETE | `/users/me/addresses/:addressId` | Customer/Admin |

## Products

| Method | Path | Access |
| --- | --- | --- |
| GET | `/products` | Public |
| GET | `/products/:productId` | Public |
| POST | `/products` | Admin |
| PATCH | `/products/:productId` | Admin |
| DELETE | `/products/:productId` | Admin |

## Cart

| Method | Path | Access |
| --- | --- | --- |
| GET | `/cart` | Customer/Admin |
| POST | `/cart/items` | Customer/Admin |
| PATCH | `/cart/items/:itemId` | Customer/Admin |
| DELETE | `/cart/items/:itemId` | Customer/Admin |
| DELETE | `/cart` | Customer/Admin |

## Orders And Delivery

| Method | Path | Access |
| --- | --- | --- |
| POST | `/orders` | Customer/Admin |
| GET | `/orders/me` | Customer/Admin |
| GET | `/orders/me/:orderId` | Customer/Admin |
| GET | `/orders/admin` | Admin |
| PATCH | `/orders/admin/:orderId/status` | Admin |
| PATCH | `/orders/admin/:orderId/courier` | Admin |
| PATCH | `/orders/admin/:orderId/delivery-status` | Admin |

Delivery statuses: `pending`, `confirmed`, `processing`, `shipped`, `delivered`, `cancelled`, `returned`.

## Payments

| Method | Path | Access |
| --- | --- | --- |
| GET | `/payments/methods` | Public |
| GET | `/payments/admin` | Admin |
| PATCH | `/payments/admin/:paymentId/verify` | Admin |

Supported methods: `cash_on_delivery`, `bkash_manual`, `nagad_manual`, `sslcommerz`.

## Admin

| Method | Path | Access |
| --- | --- | --- |
| GET | `/admin/stats` | Admin |
| GET | `/admin/activity-logs` | Admin |
| GET | `/admin/customers` | Admin |
| GET | `/admin/categories` | Admin |
| POST | `/admin/categories` | Admin |
| PATCH | `/admin/categories/:categoryId` | Admin |
| DELETE | `/admin/categories/:categoryId` | Admin |
| GET | `/admin/coupons` | Admin |
| POST | `/admin/coupons` | Admin |
| PATCH | `/admin/coupons/:couponId` | Admin |
| DELETE | `/admin/coupons/:couponId` | Admin |
| GET | `/admin/reviews` | Admin |
| PATCH | `/admin/products/:productId/reviews/:reviewId` | Admin |

## AI

| Method | Path | Access |
| --- | --- | --- |
| GET | `/ai/search` | Public |
| POST | `/ai/recommendations` | Customer/Admin |
| POST | `/ai/chatbot` | Customer/Admin |
| POST | `/ai/admin/product-content` | Admin |
