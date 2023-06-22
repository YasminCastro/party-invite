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

      <div className="flex min-h-screen flex-row items-center  justify-evenly bg-home bg-cover ">
        <button
          className="absolute right-6 top-6 h-8 w-5 text-base"
          onClick={() => router.push("/")}
        >
          Voltar
        </button>

        <div className="wt-10 max-lg:w-2/3  flex items-center  justify-center gap-2 rounded-lg bg-gray-950 bg-opacity-80 bg-clip-padding p-4 max-sm:w-full">
          {/* {user && user.status ? <Going /> : <NotGoing />} */}

          <NotGoing />
        </div>
      </div>
    </>
  );
}
