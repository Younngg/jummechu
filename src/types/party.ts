import { AuthUser, SimpleUser } from './user';

export type InitParty = {
  name: string;
  createdBy: string;
  users: AuthUser[];
};

export type SimpleParty = {
  id: string;
  updateAt: string;
  name: string;
};

export type PartyDetail = SimpleParty & {
  createdBy: SimpleUser;
  foods: Food[];
  isClosed: boolean;
};

export type Food = {
  name: string;
  voters: Omit<SimpleUser[], 'id'>;
  id: string;
};
