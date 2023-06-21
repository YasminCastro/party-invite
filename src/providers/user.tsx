import axios from "axios";
import { getCookie } from "cookies-next";
import jwt, { JwtPayload } from "jsonwebtoken";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  const cookie = getCookie("token") as string;
  const [render, setRender] = useState(false);

  const getUser = useCallback(async () => {
    const token = jwt.decode(cookie) as JwtPayload;

    if (token) {
      try {
        if (token.result._id) {
          const { data } = await axios.get(
            `/api/find-user?id=${token.result._id}`
          );
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setRender(true);
      }
    }
  }, [cookie]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );
  return (
    <UserContext.Provider value={value}>
      {render ? children : null}
    </UserContext.Provider>
  );
};

export const useUser = (): IValue => useContext(UserContext);
