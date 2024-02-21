import React from "react";
import Link from "next/link";

import Button from "./Button";
import { locations } from "@/app/constants";

export default function Nav({}) {
  return (
    <nav className="flex">
      <ul className="flex flex-row items-center">
        {/* <li>
          <Link href={locations.INDEX}>
            <Button margin="mr-2" fontSize="text-2xl" extraClasses={'hover:bg-red-500 active:bg-red-700'}>
              Home
            </Button>
          </Link>
        </li> */}
        <li>
          <Link href={locations.POKEDEX}>
            <Button margin="mr-2" fontSize="text-2xl" extraClasses={'hover:bg-red-500 active:bg-red-700'}>
              Pokedex
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
