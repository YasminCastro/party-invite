import GuestForm from "@/components/Confirm/BeforeConfirm/GuestForm";
import { useUser } from "@/providers/user";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { user, setUser } = useUser();

  const [confirmValue, setConfirmValue] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const { data } = await axios.post("/api/update-status", {
        name: user.name,
        status: confirmValue,
      });
      setUser(data.user);
      router.push("/confirm/result");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex min-h-screen flex-row items-center  justify-evenly bg-home bg-cover">
      <form
        onSubmit={handleLogin}
        className="flex w-1/2 flex-col items-center justify-center gap-2 rounded-lg bg-gray-950 bg-opacity-30 bg-clip-padding p-4 max-sm:w-3/4"
      >
        <GuestForm
          setConfirmValue={setConfirmValue}
          name={user.name}
          confirm={user.status}
        />
        <button className="h-8 w-full text-base ">Confirmar</button>
      </form>
    </div>
  );
}
