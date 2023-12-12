export type SimpleUser = {
  name: string;
  email: string;
  image?: string;
  id: string;
};

export type AuthUser = SimpleUser & {
  username: string;
};
