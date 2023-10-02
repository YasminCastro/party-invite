import Image from "next/image";
import graphic from "/public/confirm/graphic-design-is-my-passion-designer.gif";

import { NextSeo } from "next-seo";
import projectConfig from "@/config/project";

export default function GoingCard() {
  return (
    <>
      <NextSeo
        title={`${projectConfig.seoName}`}
        description="Presença confirmada ou não..."
      />

      <div className="flex min-h-screen items-center justify-evenly bg-home bg-cover">
        {/* <PurpleToBlueButton path="/" title="Voltar" /> */}

        <div className="flex gap-4 rounded-lg bg-gray-950 bg-opacity-80 p-8 max-md:w-full max-md:flex-col">
          <div className="flex flex-col ">
            <h2 className="font-bebas mb-4 text-4xl text-blue-400">
              Presença confirmada!
            </h2>
            <ul className="font-bebas ml-4 w-[90%] list-disc text-white max-md:w-full">
              <li className="text-2xl max-sm:text-xl">
                Não se esqueça de levar sua bebida e caixa/bolsa térmica!!
              </li>
              <li className="text-2xl max-sm:text-xl">
                Caso você tenha conjuge não esqueça de confimar a presença delu
                também!!
                <p className="mt-[-5px] font-mono text-sm">
                  caso seu conjugue não esteja na lista me avisa no{" "}
                  <a
                    href={`https://api.whatsapp.com/send?phone=${projectConfig.whatsappNumber}`}
                    target="_blank"
                    className="font-mono text-blue-400"
                  >
                    zap
                  </a>{" "}
                </p>
              </li>

              <li className="text-2xl max-sm:text-xl">
                Texto sobre a comida...
              </li>

              <li className="text-2xl max-sm:text-xl">
                Quer me dar um presente e não sabe o que? pode me dar{" "}
                <a className=" text-blue-400">cerveja</a>
              </li>
              <li className="text-2xl max-sm:text-xl">
                Quer levar alguem? clica{" "}
                <a
                  href={`https://api.whatsapp.com/send?phone=${projectConfig.whatsappNumber}&text=Oiee%2C%20quero%20convidar%20uma%20pessoa%20para%20seu%20niver...`}
                  target="_blank"
                  className=" text-blue-400"
                >
                  aqui
                </a>{" "}
                para mandar um zap pra ver se pode.
                <p className="mt-[-5px] font-mono text-sm">
                  sujeito a lotação do local.
                </p>
              </li>
            </ul>
          </div>
          {/* {projectConfig.spotifyUrl && <SpotifyPlaylist />} */}
        </div>
      </div>
    </>
  );
}
