import PokemonOfTheDay from "@/components/PokemonOfTheDay";

export default async function Home() {
  const pokedexNumber = await fetch(process.env.URL + "/api/refreshDaily").then(
    (res) => res.json()
  );

  return (
    <div data-testid="container" className="flex flex-row h-full p-4 w-full">
      <div
        className="flex flex-col h-auto md:w-full"
        data-testid="home-page-container"
      >
        <section
          className="flex flex-col p-6 w-full bg-gray-200 rounded-md items-center h-full"
          data-testid="home-page"
        >
          <h1 className="text-2xl mb-4 text-center">
            Welcome to the Wonderful World of Pokemon!
          </h1>
          <p className="mb-4 text-center">
            I&apos;m building this website to level up and evolve my web
            development and data visualization skills.
          </p>
          <p className="mb-4 text-center">
            I&apos;m using NextJS, postgreSQL, TailwindCSS, D3.js and a few
            other tools and libraries to make the magic happen.
          </p>
          <p className="text-center mb-4">Thanks for visiting!</p>

          <PokemonOfTheDay pokemon={{ name: pokedexNumber }} />
        </section>
      </div>
    </div>
  );
}
