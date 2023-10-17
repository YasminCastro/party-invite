"use client";

import Link from "next/link";
import { Button } from "flowbite-react";

import AddressMap from "@/components/AddressMap/Index";
import projectConfig from "@/config/project";
import { useUser } from "@/providers/User";
import { useAuth } from "@/providers/useAuth";

export default function Home() {
  const { isAdmin } = useUser();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-home bg-cover">
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

      <div className="absolute top-1/3 w-full max-md:top-1/4">
        <div className="flex justify-evenly max-md:flex-col max-md:items-center max-md:gap-y-4">
          <h1 className="font-title text-6xl text-login-title max-sm:text-5xl">
            {projectConfig.partyName}
          </h1>

          <div className="flex w-1/3 flex-col items-center gap-2 max-md:w-2/3 max-sm:w-11/12">
            <h3 className="font-title text-3xl text-login-title max-sm:text-2xl">
              {projectConfig.data}
            </h3>

            <Link href="/confirm-presence">
              <Button className="w-full" color={projectConfig.buttonColor}>
                Confirmar presença
              </Button>
            </Link>
            <AddressMap />
          </div>
        </div>
      </div>
    </div>
  );
}
