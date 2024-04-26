import projectConfig from "@/config/project";
import { Button } from "@/components/ui/button";

import { FaSpotify } from "react-icons/fa";
import Link from "next/link";

export default function SpotifyButton() {
  return (
    <>
      {projectConfig.spotifyUrl && (
        <Button asChild>
          <Link href={projectConfig.spotifyUrl} target="_blank">
            <span className="flex items-center gap-2">
              <FaSpotify />
              Colaborar na playlist
            </span>
          </Link>
        </Button>
      )}
    </>
  );
}
