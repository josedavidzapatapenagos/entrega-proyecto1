import { useState } from "react";

let currentUser: any = null;

export const useAuth = () => {
  const [user, setUser] = useState(currentUser);

  const login = (u: any) => {
    currentUser = u;
    setUser(u);
  };

  const logout = () => {
    currentUser = null;
    setUser(null);
  };

  return { user, login, logout };
};