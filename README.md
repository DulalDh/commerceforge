# Bangladesh AI Ecommerce

Full-stack AI-powered ecommerce platform scaffold for Bangladesh.

## Stack

- Backend: Node.js, Express.js, MongoDB, Mongoose, REST API
- Frontend: React, Vite, Tailwind CSS, React Router, Zustand, Axios
- Auth: JWT with admin and customer roles
- Payments: Cash on Delivery, bKash manual, Nagad manual, SSLCommerz-ready structure
- AI: recommendations, smart search, chatbot, product content generator

## Structure

```text
backend/    Express API
frontend/   React Vite app
docs/       Supporting documentation
```

## Install

```bash
npm install
```

## Development

Backend:

```bash
cp backend/.env.example backend/.env
npm run dev:backend
```

Frontend:

```bash
cp frontend/.env.example frontend/.env
npm run dev:frontend
```

## Production Build

Backend syntax/build check:

```bash
npm run build --workspace backend
```

Frontend production build:

```bash
npm run build --workspace frontend
```

## Start Backend

```bash
npm run start --workspace backend
```

Production:

```bash
npm run start:prod --workspace backend
```

## Tests

```bash
npm test
```

Backend only:

```bash
npm run test:backend
```

Frontend only:

```bash
npm run test:frontend
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md).

## API Reference

See [API_DOCS.md](./API_DOCS.md).
# commerceforge
