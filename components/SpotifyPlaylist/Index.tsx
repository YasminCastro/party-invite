import projectConfig from "@/config/project";
import { Button } from "flowbite-react";
import { Spotify } from "react-spotify-embed";

export default function SpotifyPlaylist() {
  const spotifyUrl: string = projectConfig.spotifyUrl
    ? projectConfig.spotifyUrl
    : "";

  return (
    <>
      {projectConfig.spotifyUrl && (
        <div className="flex w-1/2 flex-col items-center justify-around max-lg:w-full">
          <Button
            className="my-4 h-8 text-base"
            color="dark"
            href={spotifyUrl}
            target="_blank"
          >
            Colaborar na playlist da festa
          </Button>
          <Spotify link={spotifyUrl} className=" w-full" />
        </div>
      )}
    </>
  );
}
