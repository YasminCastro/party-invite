import DeleteGuest from "@/components/Admin/DeleteGuest";
import EditGuest from "@/components/Admin/EditGuest";
import ListGuests from "@/components/Admin/ListGuests";
import NewGuestForm from "@/components/Admin/NewGuestForm";
import PurpleToBlueButton from "@/components/PurpleToBlueButton";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "flowbite-react";

export type IStepActive =
  | "newGuest"
  | "editGuest"
  | "listGuests"
  | "deleteGuest";

export default function Admin() {
  const { query } = useRouter();

  const [cardActive, setCardActive] = useState<IStepActive>("listGuests");

  useEffect(() => {
    if (query?.cardActive) setCardActive(query?.cardActive as IStepActive);
  }, [query]);

  const Cards = useMemo(
    () => ({
      newGuest: () => <NewGuestForm />,
      listGuests: () => <ListGuests setCardActive={setCardActive} />,
      editGuest: () => <EditGuest />,
      deleteGuest: () => <DeleteGuest setCardActive={setCardActive} />,
    }),
    []
  );
  const router = useRouter();

  return (
    <>
      <NextSeo title="Admin" description="Área restrista" />
      <Button
        className="absolute right-6 top-6"
        color="gray"
        onClick={() => router.push("/")}
      >
        Voltar
      </Button>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cyan-400  via-cyan-800 to-red-500">
        <div className="absolute top-6 flex gap-4 max-md:left-6 max-md:gap-2 max-sm:left-4">
          <Button
            className="text-base max-sm:text-sm"
            onClick={() => {
              setCardActive("newGuest");
            }}
            color="gray"
          >
            Criar Convidado
          </Button>
          <Button
            className="text-base max-sm:text-sm"
            onClick={() => {
              setCardActive("listGuests");
            }}
            color="gray"
          >
            Ver Convidados
          </Button>
        </div>
        <div>{Cards[cardActive]()}</div>
      </div>
    </>
  );
}
