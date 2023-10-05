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

      <div className="absolute top-1/3 w-full">
        <div className="flex justify-evenly">
          <h1 className="font-title text-6xl text-login-title">
            {projectConfig.partyName}
          </h1>

          <div className="flex w-1/3 flex-col items-center gap-2">
            <h3 className="font-title text-3xl text-login-title">
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
