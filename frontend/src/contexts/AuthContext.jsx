import { createContext, useEffect, useState } from "react";
import { authServerAxios } from "../lib/axios.lib";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

    const fetchProfile = async () => {
      try {
        const res = await authServerAxios.get("/auth/user/profile/google");
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
