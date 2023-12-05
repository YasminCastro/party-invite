"use client";
import GuestTable from "./GuestTable";
import * as guestsService from "@/services/guests";
import { useEffect, useState } from "react";
import { IGuest } from "@/interface/guests";
import GuestTableSkeleton from "./GuestTableSkeleton";

interface IProps {
  isAdminPage: boolean;
  reloadGuests?: string;
}

export default function ListGuests({ isAdminPage, reloadGuests }: IProps) {
  const [guests, setGuests] = useState<IGuest[]>([]);
  const [totalGuests, setTotalGuests] = useState(0);
  const [totalConfirmedGuests, setTotalConfirmedGuestss] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getGuests = async () => {
    try {
      const response = await guestsService.getGuests();
      setGuests(response.guests);
      setTotalGuests(response.guestsCount);
      setTotalConfirmedGuestss(response.confirmedGuestsCount);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGuests();
  }, [reloadGuests]);

  if (loading) {
    return <GuestTableSkeleton isAdminPage={isAdminPage} />;
  }

  if (error) {
    return <p>Ocorreu um erro ao carregar os convidados.</p>;
  }

  return (
    <div>
      <div className="text-center">
        <p className="font-title text-xl  text-admin-title  max-sm:text-base font-bold">
          Total de confirmados: {totalConfirmedGuests}
        </p>
        <p className="font-title text-base  text-admin-title  max-sm:text-sm font-bold">
          Total de convidados: {totalGuests}
        </p>
      </div>
      <div className="mt-3 h-[78vh] overflow-auto">
        <GuestTable isAdminPage={isAdminPage} guests={guests} />
      </div>
    </div>
  );
}
