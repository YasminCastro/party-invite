import GuestForm from "@/components/Confirm/BeforeConfirm/GuestForm";
import { useUser } from "@/providers/user";
import axios from "axios";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const [confirmValue, setConfirmValue] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      const { data } = await axios.post("/api/update-status", {
        name: user.name,
        status: confirmValue,
      });
      setUser(data.user);
      router.push("/confirm/result");
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
          <GuestForm
            setConfirmValue={setConfirmValue}
            name={user.name}
            confirm={user.status}
          />
          <button className="h-8 w-full text-base " disabled={loading}>
            {loading ? "Carregando..." : "Confirmar"}
          </button>
        </form>
      </div>
    </>
  );
}
