import projectConfig from "@/config/project";

import GoBackButton from "@/components/GoBackButton/Index";
import SpotifyPlaylist from "@/components/SpotifyPlaylist/Index";
import WhatsappLink from "@/components/WhatsappLink";

export default function AttendingConfirmation() {
  return (
    <div className="flex min-h-screen items-center justify-evenly bg-home bg-cover">
      <GoBackButton path="/" title="Voltar" />

      <div className="flex gap-4 rounded-lg bg-gray-950 bg-opacity-80 p-8 max-md:w-full max-md:flex-col">
        <div className="flex flex-col ">
          <h2 className="font-title mb-4 text-4xl text-blue-400">
            Presença confirmada!
          </h2>
          <ul className="font-alt ml-4 w-[90%] list-disc text-white max-md:w-full">
            <li className="text-2xl max-sm:text-xl">
              Não se esqueça de levar sua bebida e caixa/bolsa térmica!!
            </li>
            <li className="text-2xl max-sm:text-xl">
              Caso você tenha conjuge não esqueça de confimar a presença delu
              também!!
              <p className="mt-[-5px] font-mono text-sm">
                caso seu conjugue não esteja na lista me avisa no{" "}
                <WhatsappLink
                  number={projectConfig.whatsappNumber}
                  message="Oiee, não achei meu conjugue na lista pode colocar elu por favor?"
                >
                  zap
                </WhatsappLink>
              </p>
            </li>

            <li className="text-2xl max-sm:text-xl">Texto sobre a comida...</li>

            <li className="text-2xl max-sm:text-xl">
              Quer me dar um presente e não sabe o que? pode me dar{" "}
              <p className=" text-blue-400">cerveja</p>
            </li>
            <li className="text-2xl max-sm:text-xl">
              Quer levar alguem? clica{" "}
              <WhatsappLink
                number={projectConfig.whatsappNumber}
                message="Oieee quero chamar uma pessoa para o seu aniversario..."
              >
                zap
              </WhatsappLink>{" "}
              para mandar um zap pra ver se pode.
              <p className="mt-[-5px] font-mono text-sm">
                sujeito a lotação do local.
              </p>
            </li>
          </ul>
        </div>
        {projectConfig.spotifyUrl && <SpotifyPlaylist />}
      </div>
    </div>
  );
}
