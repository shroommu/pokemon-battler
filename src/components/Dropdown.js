"use client";

import { useId, useState } from "react";
import Button from "./Button";

export default function Dropdown({ buttonText, buttonType, children, testId }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId().replace(/[:]/g, "");
  const resolvedButtonTestId = testId ? `${testId}-button` : undefined;
  const resolvedMenuTestId = testId ? `${testId}-menu` : undefined;

  return (
    <div>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        type={buttonType}
        testId={resolvedButtonTestId}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="menu"
      >
        {buttonText}
      </Button>
      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-label={`${buttonText} menu`}
          data-testid={resolvedMenuTestId}
          className="flex flex-col absolute bg-white h-1/2 overflow-y-scroll z-10"
          onClick={() => setIsOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}
