import { NextFunction, Request, Response } from 'express';
import { createProduct, getProduct } from '../services/product.service';
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
