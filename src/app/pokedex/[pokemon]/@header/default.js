import { Skeleton } from "@/components/LoadingIndicators";

export default function Default({}) {
  return (
    <section
      className="flex flex-col h-[96px] w-full items-center mb-4"
      data-testid="sub-page-skeleton-container"
    >
      <Skeleton className="h-full w-full" />
    </section>
  );
}
