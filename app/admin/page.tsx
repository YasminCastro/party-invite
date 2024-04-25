"use client";

import { useEffect, useState } from "react";

import GoBackButton from "@/components/GoBackButton/Index";
import { IGuest } from "@/interface/guests";
import * as guestsService from "@/services/guests";

import ListGuests from "@/components/ListGuests/Index";

export default function Admin() {
  const [reloadGuests, setReloadGuests] = useState<string>("");

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
  }, [reloadGuests]);

  return (
    <>
      <GoBackButton title="Voltar" path="/" />
      <div className="flex flex-col items-center my-14 space-y-8">
        <div className="bg-card shadow-lg rounded w-1/2 p-8">
          <div className="flex justify-evenly">
            <p className="text-xl"> Total de convidados: {totalGuests}</p>
            <p className="text-xl">
              Total de confirmados: {totalConfirmedGuests}
            </p>
          </div>
        </div>
        <div className="bg-card shadow-lg rounded w-1/2 p-8">
          <ListGuests
            isAdminPage={true}
            guests={guests}
            setReloadGuests={setReloadGuests}
          />
        </div>
      </div>
    </>
  );
}
