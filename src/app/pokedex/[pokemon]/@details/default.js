import { Skeleton } from "@/components/LoadingIndicators";

export default function Default({}) {
  return (
    <section
      className="flex flex-col h-[96px] w-full items-center"
      data-testid="sub-page-skeleton-container"
    >
      <Skeleton className="mt-4 h-full w-full" />
    </section>
  );
}
