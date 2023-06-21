import axios from "axios";
import { useRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import "xp.css/dist/98.css";
import GuestForm from "./BeforeConfirm/GuestForm";

interface IProps {
  setDidConfirm: Dispatch<SetStateAction<boolean>>;
  setConfirm: Dispatch<SetStateAction<boolean>>;
  name: string;
  confirm: boolean;
}

export default function AfterConfirm({
  setDidConfirm,
  name,
  setConfirm,
  confirm,
}: IProps) {
  const router = useRouter();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const { data } = await axios.post("/api/update-status", {
        name,
        status: confirm,
      });
      router.push("/confirm", { query: "confirm=true" });

      setDidConfirm(true);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    console.log(confirm);
  }, [confirm]);
  return (
    <form
      onSubmit={handleLogin}
      className="flex w-1/2 flex-col items-center justify-center gap-2 rounded-lg bg-gray-950 bg-opacity-30 bg-clip-padding p-4 max-sm:w-3/4"
    >
      <GuestForm setConfirm={setConfirm} name={name} confirm={confirm} />
      <button className="h-8 w-full text-base ">Confirmar</button>
    </form>
  );
}
