import { NextFunction, Request, Response } from 'express';
import { createProduct } from '../services/product.service';
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
