import EditGuest from "@/components/Admin/EditGuest";
import ListGuests from "@/components/Admin/ListGuests";
import NewGuestForm from "@/components/Admin/NewGuestForm";
import { useUser } from "@/providers/user";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import "xp.css/dist/98.css";

export type IStepActive = "novoConvidado" | "editarConvidado" | "verConvidados";

export default function Admin() {
  const { isAdmin } = useUser();
  const { push, query } = useRouter();

  const [cardActive, setCardActive] = useState<IStepActive>("verConvidados");

  useEffect(() => {
    if (query?.cardActive) setCardActive(query?.cardActive as IStepActive);
  }, [query]);

  const Cards = useMemo(
    () => ({
      novoConvidado: () => <NewGuestForm />,
      verConvidados: () => <ListGuests setCardActive={setCardActive} />,
      editarConvidado: () => <EditGuest />,
    }),
    []
  );

  return (
    <>
      <NextSeo title="Admin" description="Área restrista" />
      <button
        className="absolute right-6 top-6 h-8 w-5 text-base"
        onClick={() => push("/")}
      >
        Voltar
      </button>
      <div className="flex min-h-screen items-center justify-center bg-login bg-cover">
        <div className="absolute top-6 flex gap-4 ">
          <button
            className="mb-2 h-8 text-base"
            onClick={() => {
              setCardActive("novoConvidado");
            }}
          >
            Criar Convidado
          </button>
          <button
            className="mb-2 h-8 text-base"
            onClick={() => {
              setCardActive("verConvidados");
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