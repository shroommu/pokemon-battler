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
            <svg className="h-full" viewBox="0 0 6 6">
              <defs>
                <radialGradient
                  cx={"50%"}
                  cy={"50%"}
                  r={0.5}
                  id="big-lightbulb-gradient"
                >
                  <stop offset="0%" stopColor="#adf0ffff" />
                  <stop offset="50%" stopColor="#58e0ffff" />
                  <stop offset="95%" stopColor="#37b8d5ff" />
                </radialGradient>
              </defs>
              <g data-testid="big-lightbulb">
                <circle cx={3} cy={3} r={2.1} fill="#666666ff" />
                <circle cx={3} cy={3} r={2} fill="#888888ff" />
                <circle cx={3} cy={3} r={1.8} fill="#666666ff" />
                <circle
                  cx={3}
                  cy={3}
                  r={1.75}
                  fill="url('#big-lightbulb-gradient')"
                />
                <circle cx={3.5} cy={2.5} r={0.33} fill="#adf0ffff" />
              </g>
            </svg>
            <div className="flex flex-col h-full justify-center">
              <svg className="h-1/3 w-fit" viewBox="0 0 7 2">
                <defs>
                  <radialGradient
                    cx={"50%"}
                    cy={"50%"}
                    r={0.5}
                    id="small-lightbulb-gradient"
                  >
                    <stop offset="0%" stopColor="#ffffffa1" />
                    <stop offset="50%" stopColor="#ffffff6d" />
                    <stop offset="95%" stopColor="#ffffff01" />
                  </radialGradient>
                </defs>

                <g data-testid="red-lightbulb">
                  <circle cx={1} cy={1} r={0.65} fill="#5e5e5eff" />
                  <circle cx={1} cy={1} r={0.6} fill="#888888ff" />
                  <circle cx={1} cy={1} r={0.55} fill="#5e5e5eff" />
                  <circle cx={1} cy={1} r={0.5} className="fill-red-500" />
                  <circle
                    cx={1}
                    cy={1}
                    r={0.5}
                    fill="url('#small-lightbulb-gradient')"
                  />
                  <circle cx={1.25} cy={0.75} r={0.1} fill="#ffffff6d" />
                </g>
                <g data-testid="yellow-lightbulb">
                  <circle cx={3} cy={1} r={0.65} fill="#5e5e5eff" />
                  <circle cx={3} cy={1} r={0.6} fill="#888888ff" />
                  <circle cx={3} cy={1} r={0.55} fill="#5e5e5eff" />
                  <circle cx={3} cy={1} r={0.5} className="fill-yellow-500" />
                  <circle
                    cx={3}
                    cy={1}
                    r={0.5}
                    fill="url('#small-lightbulb-gradient')"
                  />
                  <circle cx={3.25} cy={0.75} r={0.1} fill="#ffffff6d" />
                </g>
                <g data-testid="green-lightbulb">
                  <circle cx={5} cy={1} r={0.65} fill="#5e5e5eff" />
                  <circle cx={5} cy={1} r={0.6} fill="#888888ff" />
                  <circle cx={5} cy={1} r={0.55} fill="#5e5e5eff" />
                  <circle cx={5} cy={1} r={0.5} className="fill-green-500" />
                  <circle
                    cx={5}
                    cy={1}
                    r={0.5}
                    fill="url('#small-lightbulb-gradient')"
                  />
                  <circle cx={5.25} cy={0.75} r={0.1} fill="#ffffff6d" />
                </g>
              </svg>
              <div className="pl-2">
                <Nav />
              </div>
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
