import StarChart from "@/components/charts/StarChart/StarChart";

export default function AboutPage() {
  return (
    <div
      data-testid="container"
      className="flex flex-col h-full p-4 w-full items-center"
    >
      <h1 className="text-2xl mb-4 text-center">
        A Project by Alex Kruckenberg
      </h1>
      <p className="mb-4 text-center">
        I&apos;m building this website to level up and evolve my web development
        and data visualization skills.
      </p>
      <p className="mb-4 text-center">
        I&apos;m using NextJS, postgreSQL, TailwindCSS, D3.js and a few other
        tools and libraries to make the magic happen.
      </p>
      <p className="text-center mb-4">Thanks for visiting!</p>
      <StarChart />
    </div>
  );
}
