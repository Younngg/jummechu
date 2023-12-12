import { AuthUser, SimpleUser } from './user';

export type InitParty = {
  name: string;
  createdBy: string;
  users: AuthUser[];
};

export type PartyDetail = {
  id: string;
  updateAt: string;
  name: string;
  createdBy: SimpleUser;
  voting: Voting[];
};

export type Voting = {
  foods: VotingFoods[];
  isClosed: boolean;
  updatedAt: any;
  name: string;
  id: string;
};

export type VotingFoods = {
  name: string;
  voter: Omit<SimpleUser[], 'id'>;
  key: string;
};
