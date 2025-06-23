"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type UserType = {
  _id: string;
  name?: string;
  email?: string;
  isAdmin: boolean;
};

type AuthContextType = {
  user: UserType | null;
  token: string | null;
  loading: boolean;
  setAuth: (user: UserType, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = Cookies.get("user");
    const storedToken = Cookies.get("token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.error("Failed to parse user cookie:", error);
        setUser(null);
        setToken(null);
        Cookies.remove("user");
        Cookies.remove("token");
      }
    }
    setLoading(false);
  }, []);

  const setAuth = (user: UserType, token: string) => {
    Cookies.set("user", JSON.stringify(user), { expires: 7 });
    Cookies.set("token", token, { expires: 7 });
    setUser(user);
    setToken(token);
  };

  const logout = () => {
        router.refresh(); // Added router refresh
    Cookies.remove("user");
    Cookies.remove("token");
    setUser(null);
    setToken(null);
    router.refresh(); // Added router refresh
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};