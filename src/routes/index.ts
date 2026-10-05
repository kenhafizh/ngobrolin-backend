import { Router } from 'express';
import authRoutes from '../features/auth/auth.routes';
import chatRoutes from '../features/chat/chat.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Service is healthy',
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
