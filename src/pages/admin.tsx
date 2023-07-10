import DeleteGuest from "@/components/Admin/DeleteGuest";
import EditGuest from "@/components/Admin/EditGuest";
import ListGuests from "@/components/Admin/ListGuests";
import NewGuestForm from "@/components/Admin/NewGuestForm";
import { useUser } from "@/providers/user";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import "xp.css/dist/98.css";

export type IStepActive =
  | "newGuest"
  | "editGuest"
  | "listGuests"
  | "deleteGuest";

export default function Admin() {
  const { isAdmin } = useUser();
  const { push, query } = useRouter();

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

  return (
    <>
      <NextSeo title="Admin" description="Área restrista" />
      <button
        className="absolute right-6 top-6 h-8 w-5 text-base max-sm:text-sm"
        onClick={() => push("/")}
      >
        Voltar
      </button>
      <div className="flex min-h-screen items-center justify-center bg-login bg-cover ">
        <div className="absolute top-6 flex gap-4 max-md:left-6 max-md:gap-2 max-sm:left-4">
          <button
            className="h-8 text-base max-sm:text-sm"
            onClick={() => {
              setCardActive("newGuest");
            }}
          >
            Criar Convidado
          </button>
          <button
            className="h-8 text-base max-sm:text-sm"
            onClick={() => {
              setCardActive("listGuests");
            }}
          >
            Ver Convidados
          </button>
        </div>
        <div>{Cards[cardActive]()}</div>
      </div>
    </>
  );
}
