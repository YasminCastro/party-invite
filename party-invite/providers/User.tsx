"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface IUser {
  _id: string;
  name: string;
  status: boolean;
  receivedInvitation: boolean;
  isAdmin?: boolean;
  password?: string;
}

interface IValue {
  user: IUser;
  isAdmin: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const UserContext = createContext({} as IValue);

export const UserProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  // const router = useRouter();

  const [user, setUser] = useState({} as IUser);
  const [isAdmin, setIsAdmin] = useState(false);
  const cookie = getCookie("token") as string;

  useEffect(() => {
    const token = jwt.decode(cookie) as JwtPayload;
    setIsAdmin(token?.result?.isAdmin);
  }, [cookie]);

  const getUser = useCallback(async () => {
    const token = jwt.decode(cookie) as JwtPayload;

    if (token) {
      try {
        if (token.result._id) {
          const { data } = await axios.get(
            `/api/guests/get-one?id=${token.result._id}`
          );
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [cookie]);

  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     getUser();
  //   };

  //   router.events.on("routeChangeStart", handleRouteChange);

  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChange);
  //   };
  // }, [router, getUser]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isAdmin,
    }),
    [user, setUser, isAdmin]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): IValue => useContext(UserContext);
