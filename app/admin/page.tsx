"use client";

import { useState } from "react";

import ListGuests from "@/components/AdminCards/ListGuests";
import GoBackButton from "@/components/GoBackButton/Index";
import { Button } from "flowbite-react";
import projectConfig from "@/config/project";
import NewGuestModal from "@/components/AdminCards/NewGuestModal";

export type IAdminModal = "NewGuest" | "";

export default function Admin() {
  const [openModal, setOpenModal] = useState<string | undefined>();

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
        </div>
        <ListGuests />
      </div>

      {openModal === "NewGuest" && (
        <NewGuestModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  );
}
