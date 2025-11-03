"use client";

import React from "react";
import { getSession } from "next-auth/react";

import NavButton from "./components/NavButton";
import { locations } from "@/app/constants";

export default function Nav({}) {
  return (
    <nav className="hidden w-full md:flex">
      <ul className="flex flex-row items-center">
        <li>
          <NavButton href={locations.INDEX} buttonText={"Home"} />
        </li>
        <li>
          <NavButton href={locations.POKEDEX} buttonText={"Pokedex"} />
        </li>
        <li>
          <NavButton href={locations.ANALYTICS} buttonText={"Analyze"} />
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
