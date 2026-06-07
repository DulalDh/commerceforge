# API Documentation

Base URL: `/api/v1`

## Current Scaffold Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | API health check |
| GET | `/api/v1` | API metadata |
| GET | `/api/v1/auth/status` | Auth module placeholder |
| POST | `/api/v1/auth/register` | Register customer |
| POST | `/api/v1/auth/login` | Login and receive JWT tokens |
| GET | `/api/v1/users/me` | Get authenticated profile |
| PATCH | `/api/v1/users/me` | Update authenticated profile |
| POST | `/api/v1/users/me/addresses` | Add address |
| PATCH | `/api/v1/users/me/addresses/:addressId` | Update address |
| DELETE | `/api/v1/users/me/addresses/:addressId` | Delete address |
| GET | `/api/v1/products` | List, search, and filter products |
| GET | `/api/v1/products/:productId` | Get product details |
| POST | `/api/v1/products` | Create product as admin |
| PATCH | `/api/v1/products/:productId` | Update product as admin |
| DELETE | `/api/v1/products/:productId` | Delete product as admin |
| GET | `/api/v1/cart` | Get current customer cart |
| POST | `/api/v1/cart/items` | Add item to cart |
| PATCH | `/api/v1/cart/items/:itemId` | Update item quantity |
| DELETE | `/api/v1/cart/items/:itemId` | Remove cart item |
| DELETE | `/api/v1/cart` | Clear cart |
| POST | `/api/v1/orders` | Create order from cart |
| GET | `/api/v1/orders/me` | Customer order history |
| GET | `/api/v1/orders/me/:orderId` | Customer order detail |
| GET | `/api/v1/orders/admin` | Admin order list |
| PATCH | `/api/v1/orders/admin/:orderId/status` | Admin order status update |
| PATCH | `/api/v1/orders/admin/:orderId/courier` | Admin updates courier name, tracking ID, estimated delivery date |
| PATCH | `/api/v1/orders/admin/:orderId/delivery-status` | Admin updates delivery status |
| GET | `/api/v1/payments/status` | Payment module placeholder |
| GET | `/api/v1/payments/methods` | Available Bangladesh payment methods |
| GET | `/api/v1/payments/admin` | Admin payment list |
| PATCH | `/api/v1/payments/admin/:paymentId/verify` | Admin verifies manual bKash/Nagad payment |
| GET | `/api/v1/ai/status` | AI module placeholder |
| GET | `/api/v1/ai/search` | Smart product search |
| POST | `/api/v1/ai/recommendations` | Product recommendations from wishlist/cart/product context |
| POST | `/api/v1/ai/chatbot` | Customer chatbot for products, orders, returns, delivery |
| POST | `/api/v1/ai/admin/product-content` | Admin product description and SEO generator |

## Planned Authentication

- Send access tokens as `Authorization: Bearer <token>`.
- Admin-only product and order management routes require the `admin` role.
- Registered users receive the `customer` role by default.

## Planned Ecommerce Resources

- Products
- Categories
- Carts
- Orders
- Payments
- Reviews
- AI search and recommendations

## Bangladesh Payments

Supported payment methods:

- `cash_on_delivery`
- `bkash_manual`
- `nagad_manual`
- `sslcommerz`

Manual bKash and Nagad orders require `paymentDetails.transactionId`.
Admins verify manual payments by updating payment status to `paid`, `failed`, or `refunded`.
SSLCommerz is isolated behind `sslcommerz.service.js` so real credentials and hosted checkout calls can be added later.

## Delivery And Courier

Delivery statuses:

- `pending`
- `confirmed`
- `processing`
- `shipped`
- `delivered`
- `cancelled`
- `returned`

Shipping charge rules:

- Inside Dhaka: `80`
- Outside Dhaka: `130`

Orders store `courierName`, `trackingId`, `deliveryStatus`, `estimatedDeliveryDate`, and `statusTimeline` for customer tracking.

## AI Features

The AI module currently uses local placeholder heuristics and database queries. External provider integration is isolated through `aiProvider.service.js`.

Environment variables for future provider integration:

```text
AI_PROVIDER=openai
AI_API_KEY=
```

Current service files:

- `aiRecommendationService.js`
- `aiSearchService.js`
- `aiChatbotService.js`
- `aiProductContentService.js`
