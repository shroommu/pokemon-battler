import "./globals.css";
import Image from "next/image";

import Nav from "@/components/Nav";
import Link from "next/link";

import { locations } from "./constants";
import Header from "@/components/Header";

export const metadata = {
  title: "Pokemon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-auto">
        <Header />
        <section className="flex flex-row min-h-[calc(100vh-60px)] md:min-h-[calc(100vh-119px)] justify-center bg-red-500">
          {children}
        </section>
      </body>
    </html>
  );
}
