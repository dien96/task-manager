import { createContext } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
  profileImageUrl: string;
}

export interface UserContextProps {
  user: User | null;
  loading: boolean;
  updateUser: (userData: User) => void;
  clearUser: () => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  loading: true,
  updateUser: () => {},
  clearUser: () => {},
});
