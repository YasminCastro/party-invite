"use client";

import ListGuests from "@/components/AdminCards/ListGuests";
import GoBackButton from "@/components/Global/GoBackButton/Index";
import { useState } from "react";

export default function Convidades() {
  const [reloadGuests, setReloadGuests] = useState<string>("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-login bg-cover bg-center">
      <GoBackButton title="Início" path="/" />
      <ListGuests
        isAdminPage={false}
        setReloadGuests={setReloadGuests}
        reloadGuests={reloadGuests}
      />
    </div>
  );
}
