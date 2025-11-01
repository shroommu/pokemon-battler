import { tv } from "tailwind-variants";

const typePillClass = tv({
  base: "flex h-6 w-12 text-xs md:h-8 md:text-md text-center justify-center items-center rounded-md text-white [text-shadow:1px_1px_2px_black;] [border:1px_solid_rgba(0,0,0,.2)]",
  variants: {
    compact: { true: "w-6 md:w-8" },
    size: {
      sm: "text-xs",
      md: "text-md w-16",
      lg: "text-base w-[72px]",
    },
    type: {
      bug: "bg-[#ab2]",
      dragon: "bg-[#76e]",
      electric: "bg-[#fc3]",
      fighting: "bg-[#b54]",
      fire: "bg-[#f42]",
      flying: "bg-[#89f]",
      ghost: "bg-[#66b]",
      grass: "bg-[#7c5]",
      ground: "bg-[#db5]",
      ice: "bg-[#6cf]",
      normal: "bg-[#aa9]",
      poison: "bg-[#a59]",
      psychic: "bg-[#f59]",
      rock: "bg-[#ba6]",
      water: "bg-[#39f]",
    },
  },
});

export default function TypePill({ typeName, compact, size }) {
  return (
    <div
      className={typePillClass({
        type: typeName.toLowerCase(),
        compact: compact,
        size: size,
      })}
      data-testid={`${typeName}-type-pill`}
    >
      {compact ? typeName.slice(0, 3) : typeName}
    </div>
  );
}
