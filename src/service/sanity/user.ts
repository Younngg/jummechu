import { User } from '@/types/user';
import { client } from './sanity';

export const addUser = async ({ id, email, name, image }: User) => {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    name,
    email,
    image,
  });
};
