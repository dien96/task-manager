import { useState, useEffect, type ReactNode } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { UserContext } from "@/context/UserContext";
import type { User } from "@/context/UserContext";

interface UserProviderType {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderType) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // New state to track loading

  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser({ ...response.data, token: accessToken });
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("token", userData.token); // Save token
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
