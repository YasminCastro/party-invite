import Image from "next/image";
import popup from "../../public/home/circle.svg";

export default function Title404() {
  return (
    <div className="relative">
      <Image src={popup} width={600} height={600} alt="circle" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap  text-center">
        <h1 className="font-bungee text-6xl  text-purple-950">404 NOT FOUND</h1>
        <h2 className="font-bungee text-4xl text-white">ERRO INTERNO:</h2>
        <h2 className="font-bungee text-4xl  text-white">
          YAS NÃO FOI ENCONTRADA
        </h2>
      </div>
    </div>
  );
}
