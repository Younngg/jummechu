import { SimpleUser, User } from './user';

export type InitParty = {
  name: string;
  createdBy: string;
  users: User[];
};

export type SimpleParty = {
  id: string;
  updatedAt: string;
  name: string;
  createdBy: SimpleUser;
  isClosed: boolean;
  createdAt: string;
};

export type PartyDetail = SimpleParty & {
  createdBy: User;
  foods: Food[];
  isClosed: boolean;
  canBeAdded: boolean;
  isAnonymous: boolean;
};

export type UpdatedParty = {
  name?: string;
  isClosed?: boolean;
  canBeAdded?: boolean;
  isAnonymous?: boolean;
};

export type Food = {
  name: string;
  voters: User[];
  id: string;
};

export type Place = {
  position: { lat: string; lng: string };
  content: string;
};
