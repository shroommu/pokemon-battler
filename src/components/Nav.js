"use client";

import React from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";

import Button from "./Button";
import { locations } from "@/app/constants";

export default function Nav({}) {
  const { data: session } = getSession();

  return (
    <nav className="flex">
      <ul className="flex flex-row items-center">
        <li>
          <Link href={locations.POKEDEX}>
            <Button
              margin="mr-2"
              fontSize="text-2xl"
              extraClasses={"hover:bg-red-500 active:bg-red-700"}
            >
              Pokedex
            </Button>
          </Link>
        </li>
      </ul>
      {session ? (
        <Button
          margin="ml-auto"
          fontSize="text-2xl"
          extraClasses={"hover:bg-red-500 active:bg-red-700"}
        >
          Account
        </Button>
      ) : (
        <Button
          margin="ml-auto"
          fontSize="text-2xl"
          extraClasses={"hover:bg-red-500 active:bg-red-700"}
        >
          Sign In
        </Button>
      )}
    </nav>
  );
}
