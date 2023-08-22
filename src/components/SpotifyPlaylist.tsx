import projectConfig from "@/config/project";
import { Spotify } from "react-spotify-embed";

export default function SpotifyPlaylist() {
  return (
    <div className="flex flex-col items-center justify-around ">
      <button
        className="mb-2 h-8 text-base"
        onClick={() => (window.location.href = projectConfig.spotifyUrl)}
      >
        Colaborar na playlist da festa
      </button>
      <Spotify link={projectConfig.spotifyUrl} className=" w-full" />
    </div>
  );
}
