import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';
import { logger } from './utils/logger';

const { server } = createApp();
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  logger.info(`Socket.io ready`);
});
