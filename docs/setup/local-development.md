# Local Development

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- MongoDB running locally or a MongoDB Atlas connection string

## Setup

```bash
npm install
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Update secrets and database values before running the apps.

## Run

```bash
npm run dev:backend
npm run dev:frontend
```

Backend health check:

```bash
curl http://localhost:5000/health
```

## Seed Data

After configuring MongoDB and secrets, seed an admin user and sample products:

```bash
npm run seed --workspace backend
```

Default seeded admin:

```text
email: admin@example.com
password: Admin@12345
```
