import { Skeleton } from "@/components/LoadingIndicators";

export default function Default({}) {
  return (
    <section
      className="flex flex-col h-full w-[282px] items-center"
      data-testid="sub-page-skeleton-container"
    >
      <Skeleton className="h-full w-full" />
    </section>
  );
}
