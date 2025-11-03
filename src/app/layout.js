import "./globals.css";
import Image from "next/image";

import Nav from "@/components/Nav";
import Link from "next/link";

import { locations } from "./constants";

export const metadata = {
  title: "Pokemon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-auto">
        <header className="relative bg-red-500 min-h-[80px] md:min-h-[120px]">
          <svg
            className="absolute h-full w-full"
            viewBox="0 0 13 2.1"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 2 C 2 2 4 2 6 2 C 7 2 8 1 9 1 L 13 1 L 13 0 L 0 0 Z"
              className="fill-red-900 translate-y-[.1px]"
            />
            <path
              d="M 0 2 C 2 2 4 2 6 2 C 7 2 8 1 9 1 L 13 1 L 13 0 L 0 0 Z"
              className="fill-red-700"
            />
          </svg>

          <div className="absolute flex flex-row w-full h-full pl-4">
            <svg className="h-full" viewBox="0 0 4 6">
              <circle cx={2} cy={3} r={2} fill="#888888ff" />
              <circle cx={2} cy={3} r={1.75} fill="#58e0ffff" />
            </svg>
            <div className="flex flex-col h-full pl-2 justify-center">
              <svg className="h-1/3 w-fit" viewBox="0 0 7 2">
                <circle cx={1} cy={1} r={0.6} fill="#888888ff" />
                <circle cx={1} cy={1} r={0.5} className="fill-red-500" />
                <circle cx={3} cy={1} r={0.6} fill="#888888ff" />
                <circle cx={3} cy={1} r={0.5} className="fill-yellow-500" />
                <circle cx={5} cy={1} r={0.6} fill="#888888ff" />
                <circle cx={5} cy={1} r={0.5} className="fill-green-500" />
              </svg>
              <Nav />
            </div>
          </div>
        </header>
        <section className="flex flex-row min-h-[calc(100vh-60px)] md:min-h-[calc(100vh-119px)] justify-center bg-red-500">
          {children}
        </section>
      </body>
    </html>
  );
}
