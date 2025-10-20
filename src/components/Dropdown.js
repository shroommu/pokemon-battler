"use client";

import { useState } from "react";
import Button from "./Button";

export default function Dropdown({ buttonText, buttonType, children, testId }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpen(!isOpen)} type={buttonType}>
        {buttonText}
      </Button>
      {isOpen && (
        <div
          data-testid={`${testId}-list`}
          className="flex flex-col absolute bg-white h-1/2 overflow-y-scroll"
          onClick={() => setIsOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}
