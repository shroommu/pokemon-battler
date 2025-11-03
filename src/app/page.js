export default function Home() {
  return (
    <div data-testid="container" className="flex flex-row h-auto w-full">
      <div
        className="flex flex-col m-4 h-auto md:w-full"
        data-testid="home-page-container"
      >
        <section
          className="flex flex-col p-6 w-full bg-gray-200 rounded-md items-center h-full"
          data-testid="home-page"
        >
          <h1 className="text-xl mb-4">
            Welcome to the Wonderful World of Pokemon!
          </h1>
          <p>
            I&apos;m building this website to level up and evolve my web
            development and data visualization skills.
          </p>
          <p>
            I&apos;m using NextJS, postgreSQL, TailwindCSS, D3.js and a few other
            tools and libraries to make the magic happen.
          </p>
          <p>Thanks for visiting!</p>
        </section>
      </div>
    </div>
  );
}
