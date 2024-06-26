"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import AddressMap from "@/components/Pages/Home/AddressMap/Index";
import projectConfig from "@/config/project";
import { useUser } from "@/providers/User";
import { useAuth } from "@/providers/useAuth";
import { useState } from "react";
import Footer from "@/components/Global/Footer/Index";

export default function Home() {
  const { isAdmin } = useUser();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-home bg-cover bg-center">
      <div>
        {isAdmin && (
          <Link href="/admin">
            <Button className="absolute right-24 top-6 z-50 ">Admin</Button>
          </Link>
        )}

        <Button onClick={logout} className="absolute right-6 top-6 z-50">
          Sair
        </Button>
      </div>

      <div className="flex w-full justify-evenly max-md:flex-col max-md:items-center ">
        <div className="w-1/3 max-xl:w-1/2 max-md:mb-4 max-md:w-3/4">
          <h1 className="text-center font-title text-8xl text-primary max-lg:mt-24 max-lg:text-7xl">
            {projectConfig.partyName}
          </h1>
        </div>

        <div className="flex w-1/3 flex-col items-center gap-2 max-md:w-2/3 max-sm:w-11/12">
          <h3 className="font-title text-3xl font-bold">
            {projectConfig.data}
          </h3>

          <Link href="/confirm-presence">
            <Button
              className="w-full"
              color={projectConfig.buttonColor}
              onClick={() => {
                setLoading(true);
              }}
              disabled={loading}
            >
              {loading ? "Carregando..." : "Confirmar presença"}
            </Button>
          </Link>

          <AddressMap />
        </div>
      </div>
      <Footer />
    </div>
  );
}
