import projectConfig from "@/config/project";

export default function Title() {
  return (
    <div className="relative max-md:mt-8 max-phone:mt-14">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-center font-bungee text-5xl text-slate-50 max-lg:text-4xl  max-md:text-3xl max-sm:text-2xl max-phone:text-lg">
          {projectConfig.partyName}
        </h1>
      </div>
    </div>
  );
}
