import { Skeleton } from "@/components/LoadingIndicators";

export default function Default({}) {
  return (
    <section
      className="flex flex-col h-full w-full items-center xl:flex-1 mr-4"
      data-testid="sub-page-skeleton-container"
    >
      <Skeleton className="h-full w-full" />
    </section>
  );
}
