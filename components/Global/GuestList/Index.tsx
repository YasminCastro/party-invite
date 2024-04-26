"use client";

import { useEffect, useState } from "react";

import { IGuest } from "@/interface/guests";
import * as guestsService from "@/services/guests";
import GuestTable from "./GuestTable/Index";

interface IProps {
  isAdmin: boolean;
}

export default function GuestList({ isAdmin }: IProps) {
  const [totalGuests, setTotalGuests] = useState(0);
  const [totalConfirmedGuests, setTotalConfirmedGuestss] = useState(0);
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState<IGuest[]>([]);

  const getGuests = async () => {
    try {
      const response = await guestsService.getGuests();
      console.log("GET GUESTS", response);
      setGuests(response.guests);
      setTotalGuests(response.guestsCount);
      setTotalConfirmedGuestss(response.confirmedGuestsCount);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGuests();
  }, []);

  return (
    <div className="my-6 flex flex-col items-center space-y-6">
      <div className="w-1/2 rounded bg-card p-8 shadow-lg">
        <div className="flex justify-evenly">
          <p className="text-xl"> Total de convidados: {totalGuests}</p>
          <p className="text-xl">
            Total de confirmados: {totalConfirmedGuests}
          </p>
        </div>
      </div>
      <div className="w-1/2 rounded bg-card p-8 shadow-lg">
        <GuestTable isAdmin={isAdmin} guests={guests} />
      </div>
    </div>
  );
}
