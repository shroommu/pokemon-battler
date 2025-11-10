import { locations } from "@/app/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div
        className="flex width-full h-2 bg-red-900"
        data-testid="footer-lip"
      />
      <div
        className="flex flex-col width-full h-[120px] p-4 bg-red-700"
        data-testid="footer-body"
      >
        <div className="flex flex-col" data-testid="sitemap-container">
          <h1>SITEMAP</h1>
          <Link href={locations.INDEX} className="underline">
            Home
          </Link>
          <Link href={locations.POKEDEX} className="underline">
            Pokedex
          </Link>
          <Link href={locations.ABOUT} className="underline">
            About
          </Link>
        </div>
        <div
          className="flex flex-row w-full mt-auto"
          data-testid="credits-container"
        >
          <p className="text-md mr-auto">
            A website by{" "}
            <a href="http://alexakruckenberg.com" className="underline">
              Alex Kruckenberg
            </a>
          </p>
          <p className="text-md ml-auto">© 2025</p>
        </div>
      </div>
    </footer>
  );
}
