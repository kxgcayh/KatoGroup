import { NextFunction, Request, Response } from 'express';
import {
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_PAGINATION_SIZE,
} from '../constants/pagination';
import {
  createStore,
  deleteStore,
  getAllStores,
  getStore,
  updateStore,
} from '../services/store.service';
import { Store } from '../types/store.type';

export const getAllStoresHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const page =
      (req.query.page && parseInt(req.query.page.toString())) ||
      DEFAULT_PAGINATION_PAGE;
    const size =
      (req.query.size && parseInt(req.query.size.toString())) ||
      DEFAULT_PAGINATION_SIZE;
    const stores: Store[] = await getAllStores({ page, size });
    return res.status(200).send({
      data: stores,
      status: 200,
      message: 'Stores Fetched Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const createStoreHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const userId = req.user?.id;
    const store: Store = await createStore({
      ...req.body,
      author: userId,
    });
    return res.status(201).send({
      data: store,
      status: res.statusCode,
      message: 'Store Created Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getStoreHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const store: Store | null = await getStore(req.params.id);
    if (store) return res.status(200).send(store);
    return res.status(404).send({
      status: res.statusCode,
      message: 'Store Not Found',
    });
  } catch (error) {
    next(error);
  }
};

export const updateStoreHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const userId = req.user?.id;
    const store: Store = await updateStore(req.params.id, req.body, userId);
    return res.status(200).send({
      data: store,
      status: res.statusCode,
      message: 'Store Updated Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStoreHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const userId = req.user?.id;
    await deleteStore(req.params.id, userId);
    return res.status(200).send({
      status: res.statusCode,
      message: 'Store Deleted Successfully',
    });
  } catch (error) {
    next(error);
  }
};
