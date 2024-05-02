import projectConfig from "@/config/project";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AddressMap() {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      {loading ? (
        <Skeleton className="h-52 w-full" />
      ) : (
        <iframe
          src={projectConfig.address}
          width="300"
          height="200"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mt-4 w-full rounded-xl"
        ></iframe>
      )}
      <h4 className="mt-2 w-fit text-xl font-bold max-lg:text-lg  max-md:backdrop-blur-3xl max-sm:text-base">
        {projectConfig.addressWritten}
      </h4>
    </div>
  );
}
