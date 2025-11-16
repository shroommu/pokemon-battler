import { Skeleton } from "@/components/LoadingIndicators";

export default function Default({}) {
  return (
    <section
      className="flex flex-col h-full w-full xl:flex-1 items-center"
      data-testid="sub-page-skeleton-container"
    >
      <Skeleton className="mt-4 h-full w-full" />
    </section>
  );
}
