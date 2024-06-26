"use client";

import GoBackButton from "@/components/Global/GoBackButton/Index";
import GuestList from "@/components/Global/GuestList/Index";
import NewGuest from "@/components/Pages/Admin/NewGuest/Index";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Admin() {
  const [openNewGuest, setOpenNewGuest] = useState(false);
  const [refreshList, setRefreshList] = useState("");

  return (
    <>
      <GoBackButton title="Voltar" path="/" />
      <div className="mt-6 flex justify-center max-sm:ml-5 max-sm:mt-5 max-sm:justify-start">
        <Button
          size="lg"
          onClick={() => {
            setOpenNewGuest(true);
          }}
        >
          Novo Convidado
        </Button>
      </div>
      <GuestList
        isAdmin={true}
        refreshList={refreshList}
        setRefreshList={setRefreshList}
      />

      {openNewGuest && (
        <NewGuest
          setOpenNewGuest={setOpenNewGuest}
          openNewGuest={openNewGuest}
          setRefreshList={setRefreshList}
        />
      )}
    </>
  );
}
