# Testing

## Install

```bash
npm install
```

## Backend

Backend tests use Jest, Supertest, and MongoDB Memory Server.

```bash
npm run test:backend
```

Covered areas:

- Auth API
- Product API
- Cart API
- Order API

## Frontend

Frontend tests use Vitest, jsdom, and React Testing Library.

```bash
npm run test:frontend
```

Covered areas:

- Basic component rendering
- Search component behavior
- Protected route redirects
- Admin route authorization

## All Tests

```bash
npm test
```
