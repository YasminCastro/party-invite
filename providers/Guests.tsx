"use client";

import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface IGuests {
  _id: string;
  name: string;
  receivedInvitation: boolean;
  status: boolean;
  isAdmin?: boolean;
}

interface IValue {
  guests: IGuests[];
  loading: boolean;
  error: string;
  totalConfirmedGuests: number;
  totalGuests: number;
  fetchGuests: any;
}

const GuestsContext = createContext({} as IValue);

export const GuestProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalConfirmedGuests, setTotalConfirmedGuests] = useState(0);
  const [totalGuests, setTotalGuests] = useState(0);

  const fetchGuests = async () => {
    try {
      const { data } = await axios.get("/api/guests/get");
      console.log(data);
      data.sort(compareGuests);
      setGuests(data);

      const confirmedGuests = data.reduce(
        (count: number, guest: any) => count + (guest.status ? 1 : 0),
        0
      );
      setTotalConfirmedGuests(confirmedGuests);
      setTotalGuests(data.length);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const value = useMemo(
    () => ({
      guests,
      loading,
      error,
      totalConfirmedGuests,
      totalGuests,
      fetchGuests,
    }),
    [guests, loading, error, totalConfirmedGuests, totalGuests, fetchGuests]
  );
  return (
    <GuestsContext.Provider value={value}>{children}</GuestsContext.Provider>
  );
};

export const useGuests = (): IValue => useContext(GuestsContext);

const compareGuests = (guestA: any, guestB: any) => {
  if (guestA.status && !guestB.status) {
    return -1;
  } else if (!guestA.status && guestB.status) {
    return 1;
  } else {
    return guestA.name.localeCompare(guestB.name);
  }
};
