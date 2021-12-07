import { NextFunction, Request, Response } from 'express';
import {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from '../services/category.service';
import {
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_PAGINATION_SIZE,
} from '../constants/pagination';
import { Category } from '../types/category.type';

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
    return res.status(201).send({
      data: category,
      status: res.statusCode,
      message: 'Create Category Success',
    });
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
    return res.status(404).send({
      status: res.statusCode,
      message: 'Category Not Found',
    });
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
    return res.status(200).send({
      data: category,
      status: res.statusCode,
      message: 'Update Category Success',
    });
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
    return res.status(200).send({
      status: res.statusCode,
      message: 'Category Deleted Successfully',
    });
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
      data: categories,
      status: 200,
      message: 'Categories Fetched Successfully',
    });
  } catch (error) {
    next(error);
  }
};
