import { Router } from 'express';
import categoryRouter from './category.route';
import authRouter from './auth.route';
import storeRouter from './store.route';
import productRouter from './product.route';

const router = Router();

// Endpoint co check server status
router.get('/health-check', async (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };

  try {
    res.send(healthCheck);
  } catch (e: any) {
    healthCheck.message = e;
    res.status(503).send();
  }
});

// Import all product routes
router.use('/products', productRouter);

// Import all store routes
router.use('/stores', storeRouter);

// Import all category routes
router.use('/categories', categoryRouter);

//Import all auth routes
router.use('/auth', authRouter);

export default router;
