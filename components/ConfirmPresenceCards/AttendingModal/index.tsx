import PixButton from "@/components/PixButton/Index";
import WhatsappLink from "@/components/WhatsappLink";
import { Spotify } from "react-spotify-embed";
import projectConfig from "@/config/project";
import { Modal } from "flowbite-react";
import { BiSolidStar } from "react-icons/bi";

import { useRouter } from "next/navigation";
import SpotifyButton from "@/components/SpotifyButton/Index";

interface IProps {
  setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>;
  openModal: string | undefined;
}

export default function AttendingModal({ openModal, setOpenModal }: IProps) {
  const { push } = useRouter();
  const size = projectConfig.spotifyUrl ? "6xl" : "xl";

  return (
    <>
      <Modal
        show={openModal === "Attending"}
        onClose={() => {
          setOpenModal(undefined);
          push("/");
        }}
        size={size}
      >
        <Modal.Header>
          <div className="font-title text-green-400 text-3xl max-sm:text-2xl">
            Presença confirmada!
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="flex gap-4 max-md:flex-col">
            <div className="flex flex-col gap-10">
              <ul className="font-text ml-4 list-disc text-xl max-sm:text-lg ">
                <li className="flex space-x-2">
                  <BiSolidStar />
                  <span>
                    <b>Obrigatório</b> o uso de qualquer fantasia{" "}
                    <i>(não precisa ser elaborada)</i> .
                  </span>
                </li>
                <li className="flex space-x-2">
                  <BiSolidStar />
                  <span>
                    Não se esqueça de levar sua bebida e caixa térmica!!
                  </span>
                </li>
                <li className="flex space-x-2">
                  <BiSolidStar />
                  <span>
                    Quer levar alguem? clica{" "}
                    <a
                      href={`https://api.whatsapp.com/send?phone=${projectConfig.whatsappNumber}&text=Oiee%2C%20quero%20convidar%20uma%20pessoa%20para%20seu%20niver...`}
                      target="_blank"
                      className=" text-pink-400"
                    >
                      aqui{" "}
                    </a>
                    para mandar um zap pra ver se pode.
                    <p className="mt-[-5px] font-mono text-sm">
                      sujeito a lotação do local.
                    </p>
                  </span>
                </li>
                <li className="flex space-x-2">
                  <BiSolidStar />
                  <span>
                    Estou pedindo contribuições para a comida da festa.
                  </span>
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
