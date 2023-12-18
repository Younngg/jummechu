import { User } from '@/types/user';
import { client } from './sanity';

export const addUser = async ({ id, username, email, name, image }: User) => {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    username,
    name,
    email,
    image,
  });
};
