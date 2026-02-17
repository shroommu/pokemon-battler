import Histogram from "@/components/charts/Histogram/Histogram";
import { getAllPokemonWithMaxStats } from "@/services/getAllPokemonWithMaxStats";
import { getHistogramData } from "@/utils/getHistogramData";

export default async function UIPlayground({}) {
  const data = await getAllPokemonWithMaxStats().then((res) =>
    getHistogramData(res.data, "max_stats"),
  );

  return (
    <div data-testid="ui-playground-page">
      <Histogram bins={data} />
    </div>
  );
}
