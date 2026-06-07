# Deployment Guide

## Backend

The backend is an Express API using MongoDB Atlas in production.

### Production Environment

Copy the production template:

```bash
cp backend/.env.production.example backend/.env
```

Required values:

- `NODE_ENV=production`
- `PORT`
- `CLIENT_URL`
- `CORS_ORIGINS`
- `MONGODB_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `JWT_ISSUER`
- `JWT_AUDIENCE`

### MongoDB Atlas

1. Create a MongoDB Atlas project.
2. Create a cluster.
3. Create a database user with read/write access.
4. Add your backend host IP to Network Access. For managed platforms, use the platform's static egress IP if available. During early testing only, Atlas can temporarily allow `0.0.0.0/0`.
5. Copy the connection string.
6. Set:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/bd_ai_ecommerce?retryWrites=true&w=majority
```

### CORS Production Setup

Set `CLIENT_URL` to the primary frontend URL and include every allowed frontend origin in `CORS_ORIGINS`.

```env
CLIENT_URL=https://your-frontend-domain.vercel.app
CORS_ORIGINS=https://your-frontend-domain.vercel.app,https://www.yourdomain.com
```

### Backend Scripts

```bash
npm install
npm run build --workspace backend
npm run start --workspace backend
```

For production process managers, run:

```bash
npm run start:prod --workspace backend
```

## Frontend

The frontend is a Vite React app.

### API Base URL

Copy the frontend production env template:

```bash
cp frontend/.env.production.example frontend/.env.production
```

Set:

```env
VITE_API_BASE_URL=https://your-backend-api-domain.com/api/v1
```

### Production Build

```bash
npm install
npm run build --workspace frontend
```

The build output is created in:

```text
frontend/dist
```

## Vercel Frontend Deployment

1. Import the repository into Vercel.
2. Set the project root to `frontend`.
3. Set build command:

```bash
npm run build
```

4. Set output directory:

```text
dist
```

5. Add environment variable:

```env
VITE_API_BASE_URL=https://your-backend-api-domain.com/api/v1
```

6. Deploy.

## Backend Hosting Options

Suitable backend hosts include Render, Railway, Fly.io, AWS Elastic Beanstalk, DigitalOcean App Platform, or a VPS.

For any host:

- Install Node.js 20 or newer.
- Set production environment variables.
- Run `npm install`.
- Start with `npm run start:prod --workspace backend`.
- Ensure the backend domain is included in frontend `VITE_API_BASE_URL`.
- Ensure the frontend domain is included in backend `CORS_ORIGINS`.
