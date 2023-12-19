export type SimpleUser = {
  email: string;
  id: string;
};

export type User = SimpleUser & {
  name: string;
  image?: string;
};
