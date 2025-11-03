"use client";

import React from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";

import Button from "./Button";
import { locations } from "@/app/constants";

export default function Nav({}) {
  return (
    <nav className="hidden w-full md:flex">
      <ul className="flex flex-row items-center">
        <li>
          <Link href={locations.POKEDEX}>
            <Button extraClasses={"relative flex p-0 h-12 w-24 mr-2"}>
              <svg
                viewBox="0 0 10 10"
                className="absolute h-full w-full"
                preserveAspectRatio="none"
              >
                <rect
                  height={"90%"}
                  width={"100%"}
                  y={1}
                  rx={0.5}
                  ry={0.5}
                  className="fill-gray-700"
                />
                <rect
                  height={"90%"}
                  width={"100%"}
                  rx={0.5}
                  ry={0.5}
                  className="fill-gray-500 y-[0] hover:translate-y-[0.5px] active:translate-y-[1px]"
                />
              </svg>
              <div className="absolute flex h-full w-full justify-center items-center text-xl text-gray-300 text-shadow-lg pointer-events-none">
                Pokedex
              </div>
            </Button>
          </Link>
        </li>
        <li>
          <Link href={locations.ANALYTICS}>
            <Button extraClasses={"relative flex p-0 h-12 w-24 mr-2"}>
              <svg
                viewBox="0 0 10 10"
                className="absolute h-full w-full"
                preserveAspectRatio="none"
              >
                <rect
                  height={"90%"}
                  width={"100%"}
                  y={1}
                  rx={0.5}
                  ry={0.5}
                  className="fill-gray-700"
                />
                <rect
                  height={"90%"}
                  width={"100%"}
                  rx={0.5}
                  ry={0.5}
                  className="fill-gray-500 y-[0] hover:translate-y-[0.5px] active:translate-y-[1px]"
                />
              </svg>
              <div className="absolute flex h-full w-full justify-center items-center text-xl text-gray-300 text-shadow-lg pointer-events-none">
                Analytics
              </div>
            </Button>
          </Link>
        </li>
      </ul>
      {/* {session ? (
        <Button
          extraClasses={"ml-auto text-2xl hover:bg-red-500 active:bg-red-700"}
        >
          Account
        </Button>
      ) : (
        <Button
          extraClasses={"ml-auto text-2xl hover:bg-red-500 active:bg-red-700"}
        >
          Sign In
        </Button>
      )} */}
      {/* <Button
        extraClasses={"ml-auto text-2xl hover:bg-red-500 active:bg-red-700"}
      >
        Sign In
      </Button> */}
    </nav>
  );
}
