import { AuthorizationFailedException, NotFoundException } from '../exceptions';
import CategoryModel, { ICategoryDB } from '../models/category.model';
import UserModel from '../models/user.model';
import transform from '../transformers/category.transformer';
import {
  Category,
  CategoryCreateInput,
  CategoryUpdateInput,
  Pagination,
} from '../types/category.type';

// Create a category in the database convert the result to the Category type and send it back to the controller
export const createCategory = async (
  categoryInput: CategoryCreateInput
): Promise<Category> => {
  const isAuthorExists = await UserModel.exists({ _id: categoryInput.author });

  if (!isAuthorExists) {
    throw new NotFoundException(
      `User with id ${categoryInput.author} not found`
    );
  }
  let category: ICategoryDB = await CategoryModel.create(categoryInput);
  category = await category.populate('author').execPopulate();
  return transform(category);
};

// Fetch a category from database convert it to the Category type and send it back to the controller
export const getCategory = async (id: string): Promise<Category | null> => {
  const category: ICategoryDB | null = await CategoryModel.findById(
    id
  ).populate('author');
  if (!category) {
    return null;
  }
  return transform(category);
};

// Update a category from database convert it to the Category type and send it back to the controller
export const updateCategory = async (
  id: string,
  categoryUpdate: CategoryUpdateInput,
  userId: string | undefined
): Promise<Category> => {
  const category: Category | null = await getCategory(id);
  if (!category) {
    throw new NotFoundException(`Category with an id ${id} not found`);
  }
  if (category.author.id !== userId) {
    throw new AuthorizationFailedException([
      `User is not authorized to perform update on the requested category`,
    ]);
  }

  const updatedCategory: ICategoryDB | null =
    await CategoryModel.findByIdAndUpdate(id, categoryUpdate, {
      new: true,
    }).populate('author');

  if (!updatedCategory) {
    throw new NotFoundException(`Category with an id ${id} not found`);
  }
  return transform(updatedCategory);
};

// Delete a category from database convert
export const deleteCategory = async (
  id: string,
  userId: string | undefined
): Promise<boolean> => {
  const category: Category | null = await getCategory(id);
  if (!category) {
    throw new NotFoundException(`Category with an id ${id} not found`);
  }
  if (category.author.id !== userId) {
    throw new AuthorizationFailedException([
      `User is not authorized to perform delete on the requested category`,
    ]);
  }

  await CategoryModel.findByIdAndDelete(id);
  return true;
};

// Fetch all the categories from database convert it to the Category type and send it back to the controller
export const getAllCategories = async (
  pagination: Pagination
): Promise<Array<Category>> => {
  const categories: Array<ICategoryDB> = await CategoryModel.find()
    .limit(pagination.size)
    .skip((pagination.page - 1) * pagination.size)
    .populate('author');
  return categories.map((category) => transform(category));
};
