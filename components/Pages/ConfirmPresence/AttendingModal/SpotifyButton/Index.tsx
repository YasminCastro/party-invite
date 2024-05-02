import projectConfig from "@/config/project";
import { Button } from "@/components/ui/button";

import { FaSpotify } from "react-icons/fa";
import Link from "next/link";

interface IProps {
  message?: string;
}

export default function SpotifyButton({
  message = "Colaborar na playlist",
}: IProps) {
  return (
    <>
      {projectConfig.spotifyUrl && (
        <Button asChild className="hidden max-md:block">
          <Link href={projectConfig.spotifyUrl} target="_blank">
            <span className="flex items-center gap-2">
              <FaSpotify />
              {message}
            </span>
          </Link>
        </Button>
      )}
    </>
  );
}
