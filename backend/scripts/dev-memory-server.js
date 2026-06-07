import { MongoMemoryServer } from 'mongodb-memory-server';

process.env.NODE_ENV ||= 'development';
process.env.PORT ||= '5001';
process.env.CLIENT_URL ||= 'http://localhost:5173';
process.env.CORS_ORIGINS ||= 'http://localhost:5173';
process.env.JWT_ACCESS_SECRET ||= 'local-access-secret-with-more-than-32-characters';
process.env.JWT_REFRESH_SECRET ||= 'local-refresh-secret-with-more-than-32-characters';
process.env.JWT_ACCESS_EXPIRES_IN ||= '15m';
process.env.JWT_REFRESH_EXPIRES_IN ||= '7d';
process.env.JWT_ISSUER ||= 'bd-ai-ecommerce-api';
process.env.JWT_AUDIENCE ||= 'bd-ai-ecommerce-client';

const mongoServer = await MongoMemoryServer.create({
  instance: {
    ip: '127.0.0.1'
  }
});

process.env.MONGODB_URI = mongoServer.getUri();

console.log(`In-memory MongoDB running at ${process.env.MONGODB_URI}`);

await import('../src/server.js');

const shutdown = async () => {
  await mongoServer.stop();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
