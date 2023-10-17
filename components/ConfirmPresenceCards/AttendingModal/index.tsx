import PixButton from "@/components/PixButton/Index";
import WhatsappLink from "@/components/WhatsappLink";
import { Spotify } from "react-spotify-embed";
import projectConfig from "@/config/project";
import { Button, Modal } from "flowbite-react";

import { useRouter } from "next/navigation";
import SpotifyButton from "@/components/SpotifyButton/Index";

interface IProps {
  setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>;
  openModal: string | undefined;
}

export default function AttendingModal({ openModal, setOpenModal }: IProps) {
  const { push } = useRouter();

  return (
    <>
      <Modal
        show={openModal === "Attending"}
        onClose={() => {
          setOpenModal(undefined);
          push("/");
        }}
        size="6xl"
      >
        <Modal.Header>
          <div className="font-title text-green-400 text-3xl max-sm:text-2xl">
            Presença confirmada!
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="flex gap-4 max-md:flex-col">
            <div className="flex flex-col gap-10">
              <ul className="font-text ml-4 list-disc text-xl max-sm:text-lg">
                <li>
                  Não se esqueça de levar sua bebida e caixa/bolsa térmica!!
                </li>
                <li>
                  Caso você tenha conjuge não esqueça de confimar a presença
                  delu também!!
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

                <li>
                  Quer me dar um presente e não sabe o que? pode me dar{" "}
                  <p className=" text-green-400">cerveja</p>
                </li>
                <li>
                  Quer levar alguem? clica{" "}
                  <WhatsappLink
                    number={projectConfig.whatsappNumber}
                    message="Oieee quero chamar uma pessoa para o seu aniversario..."
                  >
                    aqui
                  </WhatsappLink>{" "}
                  para mandar um zap pra ver se pode.
                  <p className="mt-[-5px] font-mono text-sm">
                    sujeito a lotação do local.
                  </p>
                </li>
              </ul>
              <div className="flex gap-x-6 justify-center max-sm:flex-col max-sm:gap-y-3">
                <PixButton />
                <SpotifyButton />
              </div>
            </div>

            {projectConfig.spotifyUrl && (
              <div className="w-1/2 max-md:w-full">
                <Spotify link={projectConfig.spotifyUrl} className=" w-full" />
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
