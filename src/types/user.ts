export type SimpleUser = {
  email: string;
  id: string;
};

export type User = SimpleUser & {
  name: string;
  username: string;
  image?: string;
};
