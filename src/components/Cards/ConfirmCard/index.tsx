import { IStepActive } from "@/pages/confirm";
import { useUser } from "@/providers/user";
import axios from "axios";
import { NextSeo } from "next-seo";
import { FormEvent, useEffect, useState } from "react";
import "xp.css/dist/98.css";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepActive>>;
  setUser: React.Dispatch<React.SetStateAction<IStepActive>>;
  user: any;
}

export default function ConfirmCard({ setCardActive }: IProps) {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const [confirmValue, setConfirmValue] = useState(false);

  useEffect(() => {
    setConfirmValue(user.status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      console.log({ name: user.name, status: confirmValue });
      const { data } = await axios.post("/api/update-status", {
        name: user.name,
        status: confirmValue,
      });

      setUser(data.user);
      if (confirmValue) {
        setCardActive("going");
      } else {
        setCardActive("notGoing");
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <NextSeo
        title="404 • Confirmar presença"
        description="Confirme sua presença na festa da Yas"
      />

      <div className="flex min-h-screen flex-row items-center  justify-evenly bg-home bg-cover">
        <form
          onSubmit={handleLogin}
          className="max-md:w-2/3 max-sm:w-3/4 flex w-1/2 flex-col items-center justify-center gap-2 rounded-lg bg-gray-950 bg-opacity-30 bg-clip-padding p-4 max-phone:w-full"
        >
          <div>
            <div className="flex w-full flex-col ">
              <label className="text-base text-white">Nome</label>
              <input
                className="h-6 p-2 text-base"
                disabled
                defaultValue={user.name}
              />
            </div>
            <div className="m-4 flex gap-8 text-white">
              <input
                id="yes"
                type="radio"
                name="confirm"
                onClick={() => setConfirmValue(true)}
                defaultChecked={user.status}
              />
              <label htmlFor="yes" className="text-lg">
                Vou :D
              </label>

              <input
                id="no"
                type="radio"
                name="confirm"
                onClick={() => setConfirmValue(false)}
                defaultChecked={!user.status}
              />
              <label htmlFor="no" className="text-lg">
                Não Vou :(
              </label>
            </div>
          </div>

          <button className="h-8 w-full text-base " disabled={loading}>
            {loading ? "Carregando..." : "Confirmar"}
          </button>
        </form>
      </div>
    </>
  );
}
