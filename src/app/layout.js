import "./globals.css";
import Image from "next/image";

import Button from "@/components/Button";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Pokemon Battler",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="flex flex-row bg-red-600 pr-4 items-center">
          <div className="flex flex-col px-8 py-3 pb-8 mr-4 bg-red-700 items-center">
            <Image
              className="max-h-[75px] w-fit"
              priority
              width={0}
              height={0}
              style={{width: '100%', height: '100%'}}
              src="/images/pokemonLogo.svg"
              alt="pokemon logo"
            />
            <div className="text-center text-xl bg-white rounded-2xl w-fit px-4">
              Battler
            </div>
          </div>
          <Nav />
          <Button margin="ml-auto" fontSize="text-2xl">Account</Button>
        </header>
        {children}
      </body>
    </html>
  );
}
