const size = {
  mobile: "425px",
  tablet: "768px",
  laptop: "1260px",
  desktop: "2560px",
};

const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(max-width: ${size.desktop})`,
};

const locations = {
  INDEX: "/",
  POKEDEX: "/pokedex/",
  ANALYTICS: "/analytics/",
  COMPARE: "/compare/",
  ABOUT: "/about/",
};

const locationsWithLabels = {
  INDEX: { path: locations.INDEX, label: "Home" },
  POKEDEX: { path: locations.POKEDEX, label: "Pokedex" },
  ANALYTICS: { path: locations.ANALYTICS, label: "Analytics" },
  COMPARE: { path: locations.COMPARE, label: "Compare" },
};

export { device, locations, locationsWithLabels };
