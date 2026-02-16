import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const { pokemon: pokemonSlug } = await params;

  redirect(`/pokedex/${pokemonSlug}/moves`);
}
