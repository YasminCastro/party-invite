import logo from "../../public/login/rharynice.svg";
import Image from "next/image";

export default function Title() {
  return (
    <div className="relative max-md:mt-8 max-phone:mt-14">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[400px] w-[700px] max-2xl:h-[300px] max-2xl:w-[600px] max-xl:w-[500px] max-lg:h-[200px] max-lg:w-[400px] max-phone:h-[200px] max-phone:w-[300px] ">
          <Image src={logo} alt="Logo" fill sizes="100vw" />
        </div>
      </div>
    </div>
  );
}
