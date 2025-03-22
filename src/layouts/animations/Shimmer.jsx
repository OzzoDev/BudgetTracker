import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Shimmer({ children, minHeight }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timeoutId);
  }, []);

  if (isLoading) {
    return (
      <Skeleton
        style={{ minHeight: `${minHeight}px` }}
        className="h-full w-full rounded-md bg-gray-800"
      />
    );
  }

  return children;
}
