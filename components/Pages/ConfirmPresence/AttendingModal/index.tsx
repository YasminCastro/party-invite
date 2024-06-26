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
            <DialogTitle className="text-3xl text-green-600">
              Oba! Vou adorar ter você comigo!
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex gap-2">
            <div className="flex w-2/3 flex-col justify-between max-md:w-full">
              <ul className="list-inside list-disc space-y-1 text-lg max-sm:text-base">
                <li>
                  Nesse ano, decidi fazer algo diferente, tô pedindo para cada
                  convidado levar 2kg de alimentos não perecíveis, os quais
                  serão utilizados na produção de marmitas para moradores de
                  rua.
                </li>
                <li>Não se esqueça de levar sua bebida e caixa térmica!</li>
                <li>After na Roxy!</li>
                <li>
                  Quer me ajudar nos comes e bebes (vai ter pinga e doses) manda
                  10zao no pix (se quiser mandar mais, pode).
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
