import Going from "@/components/Confirm/AfterConfirm/Going";
import NotGoing from "@/components/Confirm/AfterConfirm/NotGoing";
import { useUser } from "@/providers/user";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import "xp.css/dist/98.css";
export default function AfterConfirm() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <>
      <NextSeo
        title="404 • Niver da Yas"
        description="Presença confirmada ou não..."
      />

      <div className="flex min-h-screen flex-row items-center  justify-evenly bg-home bg-cover">
        <div className="max-sm:w-3/4 flex w-1/2 flex-col items-center justify-center gap-2 rounded-lg bg-gray-950 bg-opacity-80 bg-clip-padding p-4">
          {user && user.status ? <Going /> : <NotGoing />}

          <button
            className="h-8 w-full text-base"
            onClick={() => router.push("/")}
          >
            Voltar
          </button>
        </div>
      </div>
    </>
  );
}
