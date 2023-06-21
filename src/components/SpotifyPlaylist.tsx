import { Spotify } from "react-spotify-embed";
import "xp.css/dist/98.css";

export default function SpotifyPlaylist() {
  return (
    <div className="flex flex-col justify-center ">
      <Spotify link="https://open.spotify.com/playlist/0Fyoivhuile8c1RSOEGdYd?si=91fa4819a3ee4eb6" />
      <button
        className="mt-2 h-8 text-base"
        onClick={() =>
          (window.location.href =
            "https://open.spotify.com/playlist/0Fyoivhuile8c1RSOEGdYd?si=6025485073554154&pt=5be3147f4492bb8694aa82a65d1fd2b2")
        }
      >
        Colaborar na playlist da festa
      </button>
    </div>
  );
}
