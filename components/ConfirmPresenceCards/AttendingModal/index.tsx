import PixButton from "@/components/PixButton/Index";
import SpotifyPlaylist from "@/components/SpotifyPlaylist/Index";
import WhatsappLink from "@/components/WhatsappLink";
import projectConfig from "@/config/project";
import { Modal } from "flowbite-react";

import { useRouter } from "next/navigation";

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
          <div className="font-title text-green-400 text-3xl">
            Presença confirmada!
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="flex gap-4">
            <div className="flex flex-col justify-between">
              <ul className="font-text ml-4 w-3/4 list-disc text-xl  max-sm:text-xl">
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

                <li>Texto sobre a comida...</li>

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

              <PixButton />
            </div>

            {projectConfig.spotifyUrl && <SpotifyPlaylist />}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
