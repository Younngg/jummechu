import { AuthUser } from './user';

export type InitParty = {
  name: string;
  createdBy: string;
  users: AuthUser[];
};

export type Voting = {
  foods: VotingFoods[];
  isClosed: boolean;
  updatedAt: any;
  createdAt: any;
};

export type VotingFoods = {
  name: string;
  users: string[];
};
