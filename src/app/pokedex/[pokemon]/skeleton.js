import { SVGSkeleton, Skeleton } from "./components/loadingIndicators";

export default function PokedexInfoSkeleton() {
  return (
    <section className="flex flex-col w-full xl:flex-1 items-center">
      <SVGSkeleton className="max-w-64 mt-4 border-gray-600 border-4 rounded-md bg-white p-1 w-32 h-32 md:w-64 md:h-64" />
      <div className="mt-2">
        <Skeleton className="h-6 w-12 sm:h-8 sm:w-16 md:w-[72px] max-w-full" />
      </div>
    </section>
  );
}
