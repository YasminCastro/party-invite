import AddressMap from "@/components/AddressMap";
import Image from "next/image";
import { useRouter } from "next/router";
import popup from "../../public/home/popup-date.svg";

import Title404 from "@/components/Title404";
import { setCookie } from "cookies-next";
import { NextSeo } from "next-seo";
import "xp.css/dist/98.css";
import { useUser } from "@/providers/user";

export default function Home() {
  const router = useRouter();
  const { isAdmin } = useUser();

  return (
    <>
      <NextSeo
        title="404 • party not found"
        description="Confirme sua presença na festa da Yas"
      />
      <div className="flex min-h-screen flex-row items-center  justify-evenly gap-10 bg-home bg-cover  max-md:flex-col ">
        {isAdmin && (
          <button
            onClick={() => {
              router.push("/admin");
            }}
            className="absolute right-28 top-6 h-8 w-5 text-base"
          >
            Admin
          </button>
        )}

        <button
          onClick={() => {
            router.push("/login");
            setCookie("token", null);
          }}
          className="absolute right-6 top-6 h-8 w-5 text-base"
        >
          Sair
        </button>

        <Title404 />

        <div className="flex flex-col">
          <div className="relative">
            <Image
              src={popup}
              alt="popup background"
              sizes="(min-width: 60em) 24vw,
          (min-width: 28em) 45vw,
          100vw"
            />
            <h3 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-bungee text-3xl text-white max-lg:text-2xl">
              22/07/2023 às 12h
            </h3>
          </div>
          <button
            onClick={() => router.push("/confirm")}
            className="m-4 h-8 text-base"
          >
            Confirmar presença
          </button>
          <AddressMap />
        </div>
      </div>
    </>
  );
}
