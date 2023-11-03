"use client";

import ListGuests from "@/components/AdminCards/ListGuests";

export default function Convidades() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-home bg-cover bg-center">
      <div className="absolute top-6 flex gap-4 max-md:left-6 max-md:gap-2 max-sm:left-4"></div>
      <ListGuests isAdminPage={false} />
    </div>
  );
}
