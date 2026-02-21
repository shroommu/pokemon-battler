export const ANALYTICS_SECTIONS = [
  { value: "overview", label: "Overview" },
  { value: "distribution", label: "Distribution" },
  { value: "relationships", label: "Relationships" },
];

export const resolveSection = (selectedSection = "overview") => {
  return ANALYTICS_SECTIONS.some(({ value }) => value === selectedSection)
    ? selectedSection
    : "overview";
};

export const getSectionHref = (section) => {
  if (section === "overview") {
    return "/analytics";
  }

  return `/analytics?section=${section}`;
};
