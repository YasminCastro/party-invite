import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import "xp.css/dist/98.css";

export default function NotGoingCard() {
  const router = useRouter();
  return (
    <>
      <NextSeo
        title="404 • Niver da Yas"
        description="Presença confirmada ou não..."
      />

      <div className="flex min-h-screen flex-row items-center  justify-evenly bg-home bg-cover "></div>
      <button
        className="absolute right-6 top-6 h-8 w-5 text-base"
        onClick={() => router.push("/")}
      >
        Voltar
      </button>
      <div className="text-center">
        <div className="mb-4">
          <h2 className="font-bebas text-2xl text-yellow-400">
            Muito triste que você não vai :/
          </h2>
          <h2 className="font-bebas text-2xl text-yellow-400">
            talvez na próxima você consiga
          </h2>
        </div>

        <p className="font-bebas text-xl text-white">
          ps. caso mude de ideia pode confirmar se vai até o dia 20/07 :)
        </p>
      </div>
    </>
  );
}
