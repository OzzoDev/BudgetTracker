import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Shimmer({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timeoutId);
  }, []);

  if (isLoading) {
    return <Skeleton className="h-full w-full rounded-md bg-gray-800" />;
  }

  return children;
}
