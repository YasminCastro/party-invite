import React, { createContext, useContext, useMemo, useState } from "react";
interface IUser {
  name: string;
  status: boolean;
}

interface IValue {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const UserContext = createContext({} as IValue);

export const UserProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState({} as IUser);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): IValue => useContext(UserContext);
