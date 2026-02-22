import TypePill from "@/components/TypePill";
import Image from "next/image";

function ComparePokemonCard({ pokemon, side }) {
  if (!pokemon) {
    return (
      <div
        className="flex flex-col items-center rounded-md border border-gray-400 bg-gray-100 p-3 min-h-[220px] justify-center"
        data-testid={`compare-${side}-card-empty`}
      >
        <h3 className="font-semibold mb-2">{`Pokemon ${side.toUpperCase()}`}</h3>
        <p className="text-sm text-gray-700">Not selected</p>
      </div>
    );
  }

  const renderTypes = () => {
    if (pokemon.types.length === 2) {
      return (
        <div className="flex flex-row items-center">
          <TypePill typeName={pokemon.types[0]} />
          <div className="px-2">/</div>
          <TypePill typeName={pokemon.types[1]} />
        </div>
      );
    }

    if (pokemon.types.length === 1) {
      return <TypePill typeName={pokemon.types[0]} />;
    }

    return <span className="text-sm text-gray-700">N/A</span>;
  };

  return (
    <div className="rounded-md border border-gray-400 bg-white p-3" data-testid={`compare-${side}-card`}>
      <section className="flex flex-col items-center">
        <h3 className="text-2xl md:text-4xl text-center" data-testid={`compare-${side}-name`}>
          {`#${pokemon.pokedexNumber ? String(pokemon.pokedexNumber).padStart(3, "0") : "???"} ${
            pokemon.name
          }`}
        </h3>
        {pokemon.sprite ? (
          <div className="mt-4 relative w-full h-auto max-w-64 aspect-square">
            <Image
              src={pokemon.sprite}
              fill
              alt={`${pokemon.name} front sprite`}
              className="rounded-md bg-white p-1 [image-rendering:pixelated]"
              unoptimized
            />
          </div>
        ) : null}
        <div className="mt-2" data-testid={`compare-${side}-type`}>
          {renderTypes()}
        </div>
      </section>
    </div>
  );
}

export default function CompareHeader({ pokemonA, pokemonB }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4" data-testid="compare-header">
      <ComparePokemonCard pokemon={pokemonA} side="a" />
      <ComparePokemonCard pokemon={pokemonB} side="b" />
    </div>
  );
}
