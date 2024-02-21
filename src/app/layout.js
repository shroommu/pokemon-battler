import "./globals.css";
import Image from "next/image";

import Button from "@/components/Button";
import Nav from "@/components/Nav";
import Link from "next/link";

import { locations } from "./constants";

export const metadata = {
  title: "Pokemon Battler",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen">
        <header className="flex flex-row bg-red-700 pr-4 items-center">
          <Link href={locations.INDEX}>
            <div className="flex flex-col px-8 py-3 pb-8 mr-4 bg-red-700 items-center">
              <Image
                className="max-h-[75px] w-fit"
                priority
                width={0}
                height={0}
                style={{ width: "100%", height: "100%" }}
                src="/images/pokemonLogo.svg"
                alt="pokemon logo"
              />
              <div className="text-center text-xl bg-white rounded-2xl w-fit px-4">
                Battler
              </div>
            </div>
          </Link>
          <Nav />
          {/* <Button margin="ml-auto" fontSize="text-2xl">
            Account
          </Button> */}
        </header>
        <section className="flex flex-row grow h-0 bg-gray-600">
          <div
            testid="pokedex-sidebar"
            className="h-auto grow max-w-[48px] bg-red-700"
          />
          {children}
        </section>
      </body>
    </html>
  );
}
