import { tv } from "tailwind-variants";

const typePillClass = tv({
  base: "flex h-8 w-[6rem] text-center justify-center items-center rounded-md text-white [text-shadow:1px_1px_2px_black;] [border:1px_solid_rgba(0,0,0,.2)]",
  variants: {
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

export default function TypePill({ children, typeName }) {
  return (
    <div className={typePillClass({ type: typeName.toLowerCase() })}>
      {children}
    </div>
  );
}
