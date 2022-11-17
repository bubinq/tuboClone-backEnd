import { createContext, useState } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useSessionStorage("authUser", null);
  const [subbedChannels, setSubbedChannels] = useState([])
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, subbedChannels, setSubbedChannels }}>
      {children}
    </AuthContext.Provider>
  );
};
