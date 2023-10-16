"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import EditGuest from "@/components/AdminCards/EditGuest";
import ListGuests from "@/components/AdminCards/ListGuests";
import GoBackButton from "@/components/GoBackButton/Index";
import { Button } from "flowbite-react";
import projectConfig from "@/config/project";
import NewGuestModal from "@/components/AdminCards/NewGuestModal";

export type IAdminAction =
  | "newGuest"
  | "editGuest"
  | "listGuests"
  | "deleteGuest";

export type IAdminModal = "NewGuest" | "";

export default function Admin() {
  const { query } = useParams();
  const [openModal, setOpenModal] = useState<string | undefined>();

  const cardActiveFromQuery = (query as any)?.cardActive;

  const [cardActive, setCardActive] = useState<IAdminAction>("listGuests");

  useEffect(() => {
    if (cardActiveFromQuery) setCardActive(cardActiveFromQuery as IAdminAction);
  }, [cardActiveFromQuery]);

  let ActiveComponent;
  switch (cardActive) {
    case "listGuests":
      ActiveComponent = ListGuests;
      break;
    case "editGuest":
      ActiveComponent = EditGuest;
      break;
    default:
      ActiveComponent = ListGuests;
  }

  return (
    <>
      <GoBackButton title="Voltar" path="/" />
      <div className="flex min-h-screen items-center justify-center bg-home">
        <div className="absolute top-6 flex gap-4 max-md:left-6 max-md:gap-2 max-sm:left-4">
          <Button
            onClick={() => setOpenModal("NewGuest")}
            color={projectConfig.buttonColor}
            size="sm"
          >
            Novo
          </Button>
          <Button
            onClick={() => setCardActive("listGuests")}
            color={projectConfig.buttonColor}
            size="sm"
          >
            Lista
          </Button>
        </div>
        <ActiveComponent setCardActive={setCardActive} />
      </div>

      {openModal === "NewGuest" && (
        <NewGuestModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  );
}
