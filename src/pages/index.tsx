import AddressMap from "@/components/AddressMap";
import { useRouter } from "next/router";
import Image from "next/image";

import Title from "@/components/Title";
import { setCookie } from "cookies-next";
import { NextSeo } from "next-seo";
import { useUser } from "@/providers/user";
import { Button } from "flowbite-react";

import projectConfig from "@/config/project";
import rhary from "../../public/home/rhary-sentado.png";

export default function Home() {
  const router = useRouter();
  const { isAdmin } = useUser();

  return (
    <>
      <NextSeo
        title={`${projectConfig.seoName} • Home`}
        description="Confirme sua presença na festa!"
      />
      <div className="flex min-h-screen flex-row items-center  justify-evenly gap-10 bg-home bg-cover  max-md:flex-col ">
        {isAdmin && (
          <Button
            onClick={() => {
              router.push("/admin");
            }}
            className="absolute right-24 top-6 z-50"
            gradientDuoTone="purpleToBlue"
          >
            Admin
          </Button>
        )}

        <Button
          onClick={() => {
            router.push("/login");
            setCookie("token", null);
          }}
          className="absolute right-6 top-6 z-50"
          gradientDuoTone="purpleToBlue"
        >
          Sair
        </Button>

        <Title />

        <div className="flex flex-col gap-8">
          <div className="relative">
            <h3 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-bungee text-3xl text-white max-lg:text-2xl">
              {projectConfig.data}
            </h3>
          </div>
          <Button
            onClick={() => router.push("/confirm")}
            className="text-base"
            gradientDuoTone="purpleToPink"
          >
            Confirmar presença
          </Button>
          <AddressMap />
        </div>

        <div className="absolute bottom-0 opacity-50">
          <Image src={rhary} alt="Logo" width={70} />
        </div>
      </div>
    </>
  );
}
