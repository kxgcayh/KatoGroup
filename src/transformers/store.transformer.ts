import { IStoreDB } from '../models/store.model';
import { Store } from '../types/store.type';
import { transform as transformUser } from './user.transformer';

const transform = (store: IStoreDB): Store => {
  return {
    id: store._id.toString(),
    name: store.name,
    description: store.description,
    author: transformUser(store.author),
  };
};

export default transform;
