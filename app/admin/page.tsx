"use client";

import { useState } from "react";

import ListGuests from "@/components/AdminCards/ListGuests";
import GoBackButton from "@/components/GoBackButton/Index";
import { Button } from "flowbite-react";
import projectConfig from "@/config/project";
import NewGuestModal from "@/components/AdminCards/NewGuestModal";

export default function Admin() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [reloadGuests, setReloadGuests] = useState<string>("");

  return (
    <>
      <GoBackButton title="Voltar" path="/" />
      <div className="flex flex-col min-h-screen items-center bg-home bg-center bg-cover space-y-4">
        <Button
          onClick={() => setOpenModal("NewGuest")}
          color={projectConfig.buttonColor}
          size="sm"
          className="mt-4"
        >
          Novo
        </Button>
        <ListGuests
          isAdminPage={true}
          reloadGuests={reloadGuests}
          setReloadGuests={setReloadGuests}
        />
      </div>

      {openModal === "NewGuest" && (
        <NewGuestModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setReloadGuests={setReloadGuests}
        />
      )}
    </>
  );
}
