import React from "react";
import Link from "next/link";

import Button from "@/components/Button";

export default function NavButton({ href, buttonText }) {
  const navButtonTestId = `nav-button-${buttonText.toLowerCase()}`;

  return (
    <Link href={href}>
      <Button
        extraClasses={"relative flex p-0 h-12 w-24 mr-2"}
        testId={navButtonTestId}
      >
        <svg
          viewBox="0 0 10 10"
          className="absolute h-full w-full group peer"
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
            className="fill-gray-500 y-[0] group-hover:translate-y-[0.5px] group-active:translate-y-[1px]"
          />
        </svg>
        <div className="absolute flex h-full w-full justify-center items-center text-xl text-gray-300 text-shadow-lg pointer-events-none -translate-y-[5%] peer-hover:translate-y-0 peer-active:translate-y-[5%]">
          {buttonText}
        </div>
      </Button>
    </Link>
  );
}
