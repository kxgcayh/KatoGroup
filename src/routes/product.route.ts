import { Router } from 'express';
import { createProductHandler } from '../controllers/product.controller';
import { authenticate, authorize, validate } from '../middlewares';
import { createProductSchema } from '../schemas/product.schema';
import { ROLE } from '../constants/user-role';

const productRouter = Router();

// Route to create a category
productRouter.post(
  '/',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(createProductSchema),
  createProductHandler
);

export default productRouter;
