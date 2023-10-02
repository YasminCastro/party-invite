import projectConfig from "@/config/project";
import { Spotify } from "react-spotify-embed";

export default function SpotifyPlaylist() {
  const spotifyUrl: string = projectConfig.spotifyUrl
    ? projectConfig.spotifyUrl
    : "";

  return (
    <>
      {projectConfig.spotifyUrl && (
        <div className="flex w-1/2 flex-col items-center justify-around max-lg:w-full">
          <button
            className="mb-2 h-8 text-base"
            onClick={() => (window.location.href = spotifyUrl)}
          >
            Colaborar na playlist da festa
          </button>
          <Spotify link={spotifyUrl} className=" w-full" />
        </div>
      )}
    </>
  );
}
