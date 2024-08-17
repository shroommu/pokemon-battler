"use client";

import React from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";

import Button from "./Button";
import { locations } from "@/app/constants";

export default function Nav({}) {
  // const { data: session } = getSession();

  return (
    <nav className="flex w-full">
      <ul className="flex flex-row items-center">
        <li>
          <Link href={locations.POKEDEX}>
            <Button
              extraClasses={"mr-2 text-2xl hover:bg-red-500 active:bg-red-700"}
            >
              Pokedex
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
      <Button
        extraClasses={"ml-auto text-2xl hover:bg-red-500 active:bg-red-700"}
      >
        Sign In
      </Button>
    </nav>
  );
}
