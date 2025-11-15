import { Skeleton } from "./components/loadingIndicators";

export default function PokedexLoading() {
  return (
    <section
      className="flex flex-col min-h-72 h-full w-full xl:flex-1 items-center"
      data-testid="sub-page-skeleton-container"
    >
      <Skeleton className="mt-4 h-full w-full" />
    </section>
  );
}
