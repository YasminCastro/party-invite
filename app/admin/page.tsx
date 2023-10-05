"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import NewGuestForm from "@/components/AdminCards/NewGuestForm";
import DeleteGuest from "@/components/AdminCards/DeleteGuest";
import EditGuest from "@/components/AdminCards/EditGuest";
import ListGuests from "@/components/AdminCards/ListGuests";
import AdminNavigation from "@/components/AdminCards/AdminNavigation";
import GoBackButton from "@/components/GoBackButton/Index";

export type IAdminAction =
  | "newGuest"
  | "editGuest"
  | "listGuests"
  | "deleteGuest";

export default function Admin() {
  const { query } = useParams();

  const cardActiveFromQuery = (query as any)?.cardActive;

  const [cardActive, setCardActive] = useState<IAdminAction>("listGuests");

  useEffect(() => {
    if (cardActiveFromQuery) setCardActive(cardActiveFromQuery as IAdminAction);
  }, [cardActiveFromQuery]);

  let ActiveComponent;
  switch (cardActive) {
    case "newGuest":
      ActiveComponent = NewGuestForm;
      break;
    case "listGuests":
      ActiveComponent = ListGuests;
      break;
    case "editGuest":
      ActiveComponent = EditGuest;
      break;
    case "deleteGuest":
      ActiveComponent = DeleteGuest;
      break;
    default:
      ActiveComponent = ListGuests;
  }

  return (
    <>
      <GoBackButton title="Voltar" path="/" />
      <div className="flex min-h-screen items-center justify-center bg-home">
        <AdminNavigation setActiveView={setCardActive} />
        <ActiveComponent setCardActive={setCardActive} />
      </div>
    </>
  );
}
