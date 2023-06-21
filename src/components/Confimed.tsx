import axios from "axios";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import "xp.css/dist/98.css";

interface IProps {
  setDidConfirm: Dispatch<SetStateAction<boolean>>;
}

export default function Confimed({ setDidConfirm }: IProps) {
  const [name, setName] = useState("yasmin");
  const [confirm, setConfirm] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      console.log(confirm);
      const { data } = await axios.post("/api/update-status", {
        name,
        status: confirm,
      });
      setDidConfirm(true);
      console.log(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    <form
      onSubmit={handleLogin}
      className="flex w-1/2 flex-col items-center justify-center gap-2 rounded-lg bg-gray-950 bg-opacity-20 bg-clip-padding p-4 max-sm:w-3/4"
    ></form>
  );
}
