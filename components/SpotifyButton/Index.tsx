import projectConfig from "@/config/project";
import { Button } from "flowbite-react";

import { FaSpotify } from "react-icons/fa";

export default function SpotifyButton() {
  return (
    <>
      {projectConfig.spotifyUrl && (
        <Button color="dark" href={projectConfig.spotifyUrl} target="_blank">
          <span className="flex items-center gap-2">
            <FaSpotify />
            Colaborar na playlist da festa
          </span>
        </Button>
      )}
    </>
  );
}
