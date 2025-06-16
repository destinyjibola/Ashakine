"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

type UserType = {
  _id: string;
  name?: string;
  email?: string;
  image?: string;
};

type AuthContextType = {
  user: UserType | null;
  token: string | null;
  loading: boolean; // Added loading state
  setAuth: (user: UserType, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Initialize as true

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
    setLoading(false); // Set loading to false after checking cookies
  }, []);

  const setAuth = (user: UserType, token: string) => {
    Cookies.set("user", JSON.stringify(user), { expires: 7 });
    Cookies.set("token", token, { expires: 7 });
    console.log("setAuth - User:", user);
    console.log("setAuth - Token:", token);
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    setUser(null);
    setToken(null);
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