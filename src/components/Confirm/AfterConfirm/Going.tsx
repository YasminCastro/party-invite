import SpotifyPlaylist from "@/components/SpotifyPlaylist";
import Image from "next/image";
import "xp.css/dist/98.css";
import gif from "../../../../public/confirm/graphic-design-is-my-passion-designer.gif";


export default function Going() {
  return (
    <div className="m-2 flex flex-row gap-4 ">
      <div className="flex flex-col justify-around">
        <div>
          <h2 className="font-bebas text-4xl text-yellow-400">
            Aiiii mt bão você vai!!
          </h2>
          <ul className="ml-4 list-disc font-bebas  text-white">
            <li className="text-xl">
              Não se esqueça de levar sua bebida e caixa/bolsa térmica.
            </li>
            <li className="text-lg">
              Quer me dar um presente e não sabe o que? pode fazer um pix para{" "}
              <a className="text-yellow-400">yasminsdcastro@gmail.com</a>
            </li>
            <li className="text-lg">
              Quer levar alguem? clica{" "}
              <a
                href="https://api.whatsapp.com/send?phone=5562981695581&text=Oiee%2C%20quero%20convidar%20uma%20pessoa%20para%20seu%20niver..."
                target="_blank"
                className="font-bebas text-yellow-300"
              >
                aqui
              </a>{" "}
              para mandar um zap pra Yas pra ver se pode.
            </li>
          </ul>
        </div>

        <Image
          src={gif}
          alt="Graphic design is my passion"
          sizes="(min-width: 60em) 24vw,
          (min-width: 28em) 45vw,
          100vw"
        />
      </div>
      <SpotifyPlaylist />
    </div>
  );
}
