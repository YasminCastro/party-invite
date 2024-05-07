"use client";

import { SetStateAction, useEffect, useState } from "react";

import { IGuest } from "@/interface/guests";
import * as guestsService from "@/services/guests";
import GuestTable from "./GuestTable/Index";
import Footer from "../Footer/Index";

interface IProps {
  isAdmin: boolean;
  refreshList: string;
  setRefreshList: React.Dispatch<SetStateAction<string>>;
}

export default function GuestList({
  isAdmin,
  refreshList,
  setRefreshList,
}: IProps) {
  const [totalGuests, setTotalGuests] = useState(0);
  const [totalConfirmedGuests, setTotalConfirmedGuestss] = useState(0);
  const [guests, setGuests] = useState<IGuest[]>([]);

  const getGuests = async () => {
    try {
      const response = await guestsService.getGuests();
      setGuests(response.guests);
      setTotalGuests(response.guestsCount);
      setTotalConfirmedGuestss(response.confirmedGuestsCount);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGuests();
  }, [refreshList]);

  return (
    <div className="my-4 flex flex-col items-center space-y-4">
      <div className="w-1/2 rounded-2xl bg-card p-6 shadow-lg max-lg:w-3/4 max-md:w-screen ">
        <div className="flex justify-evenly">
          <p className="text-xl max-md:text-lg max-sm:text-base">
            Total de convidados: {totalGuests}
          </p>
          <p className="text-xl max-md:text-lg max-sm:text-base">
            Total de confirmados: {totalConfirmedGuests}
          </p>
        </div>
      </div>
      <div className="h-[72vh] w-1/2 overflow-auto rounded-2xl bg-card p-4 shadow-lg max-lg:w-3/4 max-md:w-screen">
        <GuestTable
          isAdmin={isAdmin}
          guests={guests}
          setRefreshList={setRefreshList}
        />
      </div>
      <Footer isTable={true} />
    </div>
  );
}
