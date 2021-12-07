import { Router } from 'express';
import {
  createCategoryHandler,
  getCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  getAllCategoriesHandler,
} from '../controllers/category.controller';
import { authenticate, authorize, validate } from '../middlewares';
import {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
} from '../schemas/category.schema';
import { ROLE } from '../constants/user-role';

const categoryRouter = Router();

// Route to create a category
categoryRouter.post(
  '/',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(createCategorySchema),
  createCategoryHandler
);

//Route to fetch a category
categoryRouter.get(
  '/:id',
  authenticate,
  validate(getCategorySchema),
  getCategoryHandler
);

//Route to update a category
categoryRouter.patch(
  '/:id',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(updateCategorySchema),
  updateCategoryHandler
);

//Route to delete a category
categoryRouter.delete(
  '/:id',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(deleteCategorySchema),
  deleteCategoryHandler
);

//Route to get all the categories
categoryRouter.get('/', authenticate, getAllCategoriesHandler);

export default categoryRouter;
