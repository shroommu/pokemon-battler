import { SVGSkeleton, Skeleton } from "../loadingIndicators";

export default function PokedexNavSkeleton() {
  return (
    <div className="flex justify-center w-full h-16">
      <div className="flex flex-row mr-auto items-center">
        <Skeleton className="h-full w-24" />
      </div>
      <Skeleton className="w-96 h-full max-w-full" />
      <div className="flex flex-row ml-auto items-center">
        <Skeleton className="h-full w-24" />
      </div>
    </div>
  );
}
