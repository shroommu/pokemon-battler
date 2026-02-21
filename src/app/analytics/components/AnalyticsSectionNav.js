import Link from "next/link";

import { ANALYTICS_SECTIONS, getSectionHref } from "../constants";

export default function AnalyticsSectionNav({ resolvedSection }) {
  return (
    <div
      className="flex flex-row flex-wrap justify-center gap-2"
      data-testid="analytics-section-nav"
    >
      {ANALYTICS_SECTIONS.map((section) => {
        const isSelected = resolvedSection === section.value;

        return (
          <Link
            key={section.value}
            href={getSectionHref(section.value)}
            className={`flex justify-center items-center p-2 rounded-md cursor-pointer ${
              isSelected ? "bg-gray-400" : "bg-gray-300"
            }`}
            data-testid={`analytics-section-${section.value}`}
          >
            {section.label}
          </Link>
        );
      })}
    </div>
  );
}
