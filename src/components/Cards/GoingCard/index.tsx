import SpotifyPlaylist from "@/components/SpotifyPlaylist";
import Image from "next/image";
import graphic from "/public/confirm/graphic-design-is-my-passion-designer.gif";

import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import "xp.css/dist/98.css";

export default function GoingCard() {
  const router = useRouter();

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
        <div className=" m-2 flex flex-row gap-4 max-md:flex-col">
          <div className="mt-10 flex flex-col  justify-around">
            <div>
              <h2 className="font-bebas text-4xl text-yellow-400">
                Aiiii mt bão você vai!!
              </h2>
              <ul className="ml-4 w-[90%] list-disc font-bebas text-white max-md:w-full">
                <li className="text-xl">
                  Não se esqueça de levar sua bebida e caixa/bolsa térmica.
                </li>
                <li className="text-xl">
                  Caso você tenha conjuge não esqueça de confimar a presença
                  delu também!!
                </li>
                <div className="p-4">
                  <Image
                    src={graphic}
                    alt="Graphic design is my passion"
                    sizes="(min-width: 60em) 24vw,
          (min-width: 28em) 45vw,
          100vw"
                  />
                </div>

                <li className="text-lg">
                  Quer me dar um presente e não sabe o que? pode fazer um pix
                  para{" "}
                  <a className="text-yellow-400">yasminsdcastro@gmail.com</a>
                </li>
                <li className="text-lg">
                  Quer levar alguem? clica{" "}
                  <a
                    href="https://api.whatsapp.com/send?phone=5562981695581&text=Oiee%2C%20quero%20convidar%20uma%20pessoa%20para%20seu%20niver..."
                    target="_blank"
                    className="font-bebas text-yellow-300"
                  >
                    aqui
                  </a>{" "}
                  para mandar um zap pra Yas pra ver se pode.
                </li>
              </ul>
            </div>
          </div>
          <SpotifyPlaylist />
        </div>
      </div>
    </>
  );
}
