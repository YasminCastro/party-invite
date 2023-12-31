import projectConfig from "@/config/project";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AddressMap() {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {loading ? (
        <SkeletonTheme
          baseColor="#e0e0e0"
          highlightColor="#dcdcdc"
          borderRadius={12}
        >
          <Skeleton className="w-full h-48" />
        </SkeletonTheme>
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
      <h4 className="font-title text-xl text-login-title max-lg:text-lg max-sm:text-base mt-2  w-fit">
        {projectConfig.addressWritten}
      </h4>
    </div>
  );
}
