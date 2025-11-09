import { SVGSkeleton, Skeleton } from "./components/loadingIndicators";

export default function PokedexInfoSkeleton() {
  return (
    <section className="flex flex-col w-full xl:flex-1 items-center">
      <SVGSkeleton className="mt-4 border-gray-600 border-4 rounded-md bg-white w-64 h-64" />
      <div className="mt-2">
        <Skeleton className="h-6 w-12 sm:h-8 sm:w-16 md:w-[72px] max-w-full" />
      </div>
    </section>
  );
}
