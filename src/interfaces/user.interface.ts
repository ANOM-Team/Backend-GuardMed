export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  favorites: string[] | null;
  role: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
