import { SVGSkeleton, Skeleton } from "../loadingIndicators";

export default function PokedexNavSkeleton() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center w-full h-[50px] mb-2">
        <div className="flex flex-row mr-auto items-center">
          <Skeleton className="h-full w-24" />
        </div>
        <Skeleton className="w-96 h-full max-w-full" />
        <div className="flex flex-row ml-auto items-center">
          <Skeleton className="h-full w-24" />
        </div>
      </div>
      <div className="flex w-full h-8 justify-center">
        <Skeleton className="w-32 h-full" />
      </div>
    </div>
  );
}
