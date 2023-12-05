"use client";
import { useGuests } from "@/providers/Guests";
import GuestTable from "./GuestTable";

interface IProps {
  isAdminPage: boolean;
}

export default function ListGuests({ isAdminPage }: IProps) {
  const { error, totalConfirmedGuests, totalGuests } = useGuests();

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
        <GuestTable isAdminPage={isAdminPage} />
      </div>
    </div>
  );
}
