import projectConfig from "@/config/project";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaPix } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PixButton() {
  return (
    <>
      {projectConfig.chavePix && (
        <Popover>
          <PopoverTrigger asChild>
            <Button>
              <CopyToClipboard text={projectConfig.chavePix}>
                <span className="flex items-center gap-2">
                  <FaPix />
                  Copiar Pix
                </span>
              </CopyToClipboard>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit text-sm p-2" side="top">
            Chave pix copiada!
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
