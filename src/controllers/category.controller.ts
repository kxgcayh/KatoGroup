import { NextFunction, Request, Response } from 'express';
import {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from '../services/category.service';
import { Category } from '../types/category.type';

const DEFAULT_PAGINATION_PAGE = 1;
const DEFAULT_PAGINATION_SIZE = 10;

// Method to handle the category creation
export const createCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const userId = req.user?.id;
    const category: Category = await createCategory({
      ...req.body,
      author: userId,
    });
    return res.status(201).send(category);
  } catch (error) {
    next(error);
  }
};

// Method to handle category fetching
export const getCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const category: Category | null = await getCategory(req.params.id);

    if (category) {
      return res.status(200).send(category);
    }
    return res.status(404).send();
  } catch (error) {
    next(error);
  }
};

// Method to handle category update
export const updateCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const userId = req.user?.id;
    const category: Category = await updateCategory(
      req.params.id,
      req.body,
      userId
    );
    return res.status(200).send(category);
  } catch (error) {
    next(error);
  }
};

// Method to handle category deletion
export const deleteCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const userId = req.user?.id;
    await deleteCategory(req.params.id, userId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Method to fetch all the categories
export const getAllCategoriesHandler = async (
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

    const categories: Category[] = await getAllCategories({ page, size });
    return res.status(200).send({
      status: 200,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};