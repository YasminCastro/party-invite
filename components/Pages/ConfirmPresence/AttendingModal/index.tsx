import PixButton from "@/components/Pages/ConfirmPresence/AttendingModal/PixButton/Index";
import { Spotify } from "react-spotify-embed";
import projectConfig from "@/config/project";

import { useRouter } from "next/navigation";
import SpotifyButton from "@/components/Pages/ConfirmPresence/AttendingModal/SpotifyButton/Index";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IProps {
  setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>;
  openModal: string | undefined;
}

export default function AttendingModal({ openModal, setOpenModal }: IProps) {
  const { push } = useRouter();

  let trigger = false;

  if (openModal === "Attending") {
    trigger = true;
  }

  return (
    <>
      <Dialog
        open={trigger}
        onOpenChange={() => {
          setOpenModal(undefined);
          push("/");
        }}
      >
        <DialogContent className="w-1/2  max-w-full max-xl:w-screen">
          <DialogHeader>
            <DialogTitle className="font-text text-3xl text-green-600">
              Amei que você vai!!
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex gap-2 ">
            <div className="flex w-full flex-col justify-between max-md:w-full">
              <ul className="list-inside list-disc space-y-1 text-lg max-sm:text-base">
                <li>
                  Caso você tenha conjuge não esqueça de confimar a presença
                  delu também!!
                </li>
                <li>
                  caso seu conjugue não esteja na lista me avisa no{" "}
                  <a
                    href="https://wa.me/5562982043566"
                    className="underline"
                    target="_blank"
                  >
                    zap
                  </a>{" "}
                </li>
                <li>
                  Quer levar alguem? me manda uma mensagem no{" "}
                  <a
                    href="https://wa.me/5562982043566"
                    className="underline"
                    target="_blank"
                  >
                    zap
                  </a>{" "}
                  ver se pode.
                  <span className="text-sm"> sujeito a lotação do local.</span>
                </li>
              </ul>
              <div className="mt-4 flex gap-2">
                <PixButton />
                <SpotifyButton message="Playlist da festa" />
              </div>
            </div>

            {projectConfig.spotifyUrl && (
              <div className="w-1/2 max-md:hidden ">
                <Spotify link={projectConfig.spotifyUrl} className=" w-full" />
              </div>
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
