"use client";

import Link from "next/link";
import { Button } from "flowbite-react";

import AddressMap from "@/components/AddressMap/Index";
import projectConfig from "@/config/project";
import { useUser } from "@/providers/User";
import { useAuth } from "@/providers/useAuth";
import { useState } from "react";

export default function Home() {
  const { isAdmin } = useUser();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-home bg-cover bg-center flex items-center justify-center">
      <div>
        {isAdmin && (
          <Link href="/admin">
            <Button
              className="absolute right-24 top-6 z-50"
              color={projectConfig.buttonColor}
            >
              Admin
            </Button>
          </Link>
        )}

        <Button
          onClick={logout}
          className="absolute right-6 top-6 z-50"
          color={projectConfig.buttonColor}
        >
          Sair
        </Button>
      </div>

      <div className="w-full flex justify-evenly max-md:flex-col max-md:items-center max-md:gap-y-4">
        <div className="w-1/3 max-xl:w-1/2 max-md:mb-4 max-md:w-3/4">
          <h1 className="font-title text-center text-login-title font-bold text-7xl max-xl:text-5xl max-sm:text-4xl">
            {projectConfig.partyName}
          </h1>
        </div>

        <div className="flex w-1/3 flex-col items-center gap-2 max-md:w-2/3 max-sm:w-11/12">
          <h3 className="font-title text-3xl text-login-title max-lg:text-2xl max-sm:text-xl">
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
    </div>
  );
}
