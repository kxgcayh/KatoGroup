import { NextFunction, Request, Response } from 'express';
import {
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_PAGINATION_SIZE,
} from '../constants/pagination';
import {
  createProduct,
  getAllProduct,
  getProduct,
} from '../services/product.service';
import { Product } from '../types/product.type';

export const createProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const userId = req.user?.id;
    const product: Product = await createProduct({
      ...req.body,
      author: userId,
    });
    return res.status(201).send({
      data: product,
      status: res.statusCode,
      message: 'Create Product Success',
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProductsHandler = async (
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

    const products: Product[] = await getAllProduct({ page, size });
    return res.status(200).send({
      data: products,
      status: 200,
      message: 'Products Fetched Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const product: Product | null = await getProduct(req.params.id);
    if (product) {
      return res.status(200).send({
        data: product,
        status: res.statusCode,
        message: 'Product Not Found',
      });
    }
    return res.status(404).send({
      status: res.statusCode,
      message: 'Product Not Found',
    });
  } catch (error) {
    next(error);
  }
};
