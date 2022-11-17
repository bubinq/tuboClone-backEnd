import { createContext } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useSessionStorage("users", []);
  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};
