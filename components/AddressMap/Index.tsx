import projectConfig from "@/config/project";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AddressMap() {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(loading);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <Skeleton className="w-full h-48" />
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
    </div>
  );
}
