import projectConfig from "@/config/project";
import { Button } from "flowbite-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Tooltip } from "flowbite-react";
import { FaPix } from "react-icons/fa6";

export default function PixButton() {
  return (
    <>
      {projectConfig.chavePix && (
        <Tooltip content="Chave pix copiada!" trigger="click">
          <Button color="dark">
            <CopyToClipboard text={projectConfig.chavePix}>
              <span className="flex items-center gap-2">
                <FaPix />
                Copiar Pix
              </span>
            </CopyToClipboard>
          </Button>
        </Tooltip>
      )}
    </>
  );
}
