import { createApp } from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';

const app = createApp();

const startServer = async () => {
  await connectDatabase();

  app.listen(env.PORT, () => {
    console.log(`API server running on port ${env.PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start API server:', error);
  process.exit(1);
});
