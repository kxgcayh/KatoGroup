import { NotFoundException } from '../exceptions';
import { IProductDB, ProductModel } from '../models/product.model';
import UserModel from '../models/user.model';
import { transform } from '../transformers/product.transformer';
import { Product, ProductCreateInput } from '../types/product.type';

export const createProduct = async (
  productInput: ProductCreateInput
): Promise<Product> => {
  const isAuthorExists = await UserModel.exists({ _id: productInput.author });
  if (!isAuthorExists) {
    throw new NotFoundException(
      `User with id ${productInput.author} not found`
    );
  }
  let product: IProductDB = await ProductModel.create(productInput);
  product = await product.populate('user').execPopulate();
  return transform(product);
};

export const getProduct = async (id: string): Promise<Product | null> => {
  const product: IProductDB | null = await ProductModel.findById(id).populate(
    'user'
  );
  if (!product) {
    return null;
  }
  return transform(product);
};
