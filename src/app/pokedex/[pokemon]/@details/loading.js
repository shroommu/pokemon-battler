import { Skeleton } from "@/components/LoadingIndicators";

export default function Loading({}) {
  return (
    <section
      className="flex flex-col h-full w-full items-center xl:flex-1"
      data-testid="sub-page-skeleton-container"
    >
      <Skeleton className="h-full w-full" />
    </section>
  );
}
