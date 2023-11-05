"use client";

import ListGuests from "@/components/AdminCards/ListGuests";
import GoBackButton from "@/components/GoBackButton/Index";

export default function Convidades() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-login bg-cover bg-center">
      <GoBackButton title="Início" path="/" />
      <ListGuests isAdminPage={false} />
    </div>
  );
}
