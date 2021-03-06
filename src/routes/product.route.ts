import { Router } from 'express';
import {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductHandler,
  updateProductHandler,
} from '../controllers/product.controller';
import { authenticate, authorize, validate } from '../middlewares';
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from '../schemas/product.schema';
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

// Route to get a category
productRouter.get(
  '/:id',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(getProductSchema),
  getProductHandler
);

// Route to update a category
productRouter.patch(
  '/:id',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(updateProductSchema),
  updateProductHandler
);

productRouter.delete(
  '/:id',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(deleteProductSchema),
  deleteProductHandler
);

productRouter.get('/', authenticate, getAllProductsHandler);

export default productRouter;
