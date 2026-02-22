"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { slugifyPokemonName } from "@/app/utils";
import CompareHeader from "./components/CompareHeader";
import StatsTable from "./components/StatsTable";

function buildCompareQuery(searchParams, { a, b }) {
  const nextParams = new URLSearchParams(searchParams.toString());

  if (a) {
    nextParams.set("a", a);
  } else {
    nextParams.delete("a");
  }

  if (b) {
    nextParams.set("b", b);
  } else {
    nextParams.delete("b");
  }

  const queryString = nextParams.toString();
  return queryString ? `?${queryString}` : "";
}

export default function CompareClient({
  pokemonOptions = [],
  initialA = "",
  initialB = "",
  pokemonA = null,
  pokemonB = null,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const optionItems = useMemo(
    () => {
      const hasMissingSlug = pokemonOptions.some((pokemon) => !pokemon.slug);

      if (!hasMissingSlug) {
        return pokemonOptions;
      }

      return pokemonOptions.map((pokemon) => ({
        ...pokemon,
        slug: pokemon.slug ?? slugifyPokemonName(pokemon.name),
      }));
    },
    [pokemonOptions]
  );

  const optionSlugs = useMemo(
    () => new Set(optionItems.map((pokemon) => pokemon.slug)),
    [optionItems]
  );

  const selectedA = searchParams.get("a") ?? initialA;
  const selectedB = searchParams.get("b") ?? initialB;
  const hasDuplicateSelection = Boolean(selectedA && selectedB && selectedA === selectedB);

  function updateSelection(nextSelection) {
    const query = buildCompareQuery(searchParams, nextSelection);
    router.replace(`${pathname}${query}`);
  }

  function onChangeA(event) {
    const nextA = event.target.value;

    if (nextA && nextA === selectedB) {
      return;
    }

    updateSelection({ a: nextA, b: selectedB });
  }

  function onChangeB(event) {
    const nextB = event.target.value;

    if (nextB && nextB === selectedA) {
      return;
    }

    updateSelection({ a: selectedA, b: nextB });
  }

  const safeSelectedA = optionSlugs.has(selectedA) ? selectedA : "";
  const safeSelectedB = optionSlugs.has(selectedB) ? selectedB : "";

  return (
    <div className="flex flex-col h-full w-full" data-testid="compare-page">
      <h1 className="text-2xl mb-4 text-center">Compare Pokemon</h1>

      <p className="mb-4 text-center">
        Pick two Pokemon to compare their stats side-by-side.
      </p>

      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        aria-label="pokemon selectors"
      >
        <label className="flex flex-col gap-2" htmlFor="compare-pokemon-a">
          <span className="font-semibold">Pokemon A</span>
          <select
            id="compare-pokemon-a"
            data-testid="compare-pokemon-a-select"
            className="rounded-md border border-gray-400 px-2 py-1 bg-white"
            value={safeSelectedA}
            onChange={onChangeA}
          >
            <option value="">Select Pokemon A</option>
            {optionItems.map((pokemon) => (
              <option
                key={pokemon.id}
                value={pokemon.slug}
                disabled={pokemon.slug === safeSelectedB}
              >
                {pokemon.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2" htmlFor="compare-pokemon-b">
          <span className="font-semibold">Pokemon B</span>
          <select
            id="compare-pokemon-b"
            data-testid="compare-pokemon-b-select"
            className="rounded-md border border-gray-400 px-2 py-1 bg-white"
            value={safeSelectedB}
            onChange={onChangeB}
          >
            <option value="">Select Pokemon B</option>
            {optionItems.map((pokemon) => (
              <option
                key={pokemon.id}
                value={pokemon.slug}
                disabled={pokemon.slug === safeSelectedA}
              >
                {pokemon.name}
              </option>
            ))}
          </select>
        </label>
      </section>

      {hasDuplicateSelection ? (
        <div
          className="mb-4 rounded-md border border-yellow-700 bg-yellow-100 p-3 text-sm"
          data-testid="compare-duplicate-warning"
        >
          Select two different Pokemon to compare.
        </div>
      ) : null}

      <section
        className="flex-1 rounded-md border-2 border-gray-400 bg-white/70 p-4"
        data-testid="compare-panel"
        aria-label="comparison panel"
      >
        <h2 className="text-xl mb-2">Comparison</h2>
        <CompareHeader pokemonA={pokemonA} pokemonB={pokemonB} />
        <StatsTable pokemonA={pokemonA} pokemonB={pokemonB} />
        {!pokemonA || !pokemonB ? (
          <p data-testid="compare-panel-state">
            Select two Pokemon to see names, sprites, types, and stats.
          </p>
        ) : null}
      </section>
    </div>
  );
}
