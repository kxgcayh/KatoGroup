import { Router } from 'express';
import { ROLE } from '../constants/user-role';
import {
  createStoreHandler,
  deleteStoreHandler,
  getAllStoresHandler,
  getStoreHandler,
  updateStoreHandler,
} from '../controllers/store.controller';
import { authenticate, authorize, validate } from '../middlewares';
import {
  createStoreSchema,
  deleteStoreSchema,
  getStoreSchema,
  updateStoreSchema,
} from '../schemas/store.schema';

const storeRouter = Router();

storeRouter.get('/', authenticate, getAllStoresHandler);

storeRouter.post(
  '/',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(createStoreSchema),
  createStoreHandler
);

storeRouter.get(
  '/:id',
  authenticate,
  validate(getStoreSchema),
  getStoreHandler
);

storeRouter.patch(
  '/:id',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(updateStoreSchema),
  updateStoreHandler
);

storeRouter.delete(
  '/:id',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(deleteStoreSchema),
  deleteStoreHandler
);

export default storeRouter;
