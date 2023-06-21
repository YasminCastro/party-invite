import "xp.css/dist/98.css";

interface IProps {}

export default function Going({}: IProps) {
  return (
    <>
      <div className="m-2 flex flex-col gap-4 text-center">
        <h2 className="font-bebas text-4xl text-yellow-400">
          Aiiii mt bão você vai!!
        </h2>
        <p className="font-bebas text-xl text-white">
          * Quer levar alguem? clica{" "}
          <a
            href="https://api.whatsapp.com/send?phone=5562981695581&text=Oiee%2C%20quero%20convidar%20uma%20pessoa%20para%20seu%20niver..."
            target="_blank"
            className="font-bebas text-yellow-300"
          >
            aqui
          </a>{" "}
          para mandar um zap pra Yas pra ver se pode.
        </p>
      </div>
    </>
  );
}
