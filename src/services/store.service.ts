import { AuthorizationFailedException, NotFoundException } from '../exceptions';
import StoreModel, { IStoreDB } from '../models/store.model';
import UserModel from '../models/user.model';
import { transform } from '../transformers/store.transformer';
import { Store, StoreCreateInput, StoreUpdateInput } from '../types/store.type';
import { Pagination } from '../types/pagination.type';

export const getAllStores = async (
  pagination: Pagination
): Promise<Array<Store>> => {
  const stores: Array<IStoreDB> = await StoreModel.find()
    .limit(pagination.size)
    .skip((pagination.page - 1) * pagination.size)
    .populate('author');
  return stores.map((store) => transform(store));
};

export const createStore = async (
  storeInput: StoreCreateInput
): Promise<Store> => {
  const isAuthorExists = await UserModel.exists({ _id: storeInput.author });
  if (!isAuthorExists) {
    throw new NotFoundException(`User with id ${storeInput.author} not found`);
  }
  let store: IStoreDB = await StoreModel.create(storeInput);
  store = await store.populate('store').execPopulate();
  return transform(store);
};

export const getStore = async (id: string): Promise<Store | null> => {
  const store: IStoreDB | null = await StoreModel.findById(id).populate(
    'author'
  );
  if (!store) {
    return null;
  }
  return transform(store);
};

export const updateStore = async (
  id: string,
  storeUpdate: StoreUpdateInput,
  userId: string | undefined
): Promise<Store> => {
  const store: Store | null = await getStore(id);
  if (!store) throw new NotFoundException(`Store with an id ${id} not found`);
  if (store.author.id !== userId) {
    throw new AuthorizationFailedException([
      `User is not authorized to perform update on the requested store`,
    ]);
  }

  const updatedStore: IStoreDB | null = await StoreModel.findByIdAndUpdate(
    id,
    storeUpdate,
    { new: true }
  ).populate('author');

  if (!updatedStore) {
    throw new NotFoundException(`Store with an id ${id} not found`);
  }

  return transform(updatedStore);
};

export const deleteStore = async (
  id: string,
  userId: string | undefined
): Promise<boolean> => {
  const store: Store | null = await getStore(id);
  if (!store) throw new NotFoundException(`Store with an id ${id} not found`);
  if (store.author.id !== userId) {
    throw new AuthorizationFailedException([
      `User is not authorized to perform delete on the requested store`,
    ]);
  }
  await StoreModel.findByIdAndDelete(id);
  return true;
};
