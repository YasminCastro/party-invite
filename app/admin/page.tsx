"use client";

import GoBackButton from "@/components/Global/GoBackButton/Index";
import GuestList from "@/components/Global/GuestList/Index";
import NewGuest from "@/components/Pages/Admin/NewGuest/Index";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Admin() {
  const [openNewGuest, setOpenNewGuest] = useState(false);

  return (
    <>
      <GoBackButton title="Voltar" path="/" />
      <div className="mt-6 flex justify-center">
        <Button
          size="lg"
          onClick={() => {
            setOpenNewGuest(true);
          }}
        >
          Novo Convidado
        </Button>
      </div>
      <GuestList isAdmin={true} />

      {openNewGuest && (
        <NewGuest
          setOpenNewGuest={setOpenNewGuest}
          openNewGuest={openNewGuest}
        />
      )}
    </>
  );
}
