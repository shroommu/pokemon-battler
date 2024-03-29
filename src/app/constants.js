const size = {
  mobile: "425px",
  tablet: "768px",
  laptop: "1260px",
  desktop: "2560px",
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(max-width: ${size.desktop})`,
};

export const locations = {
  INDEX: "/",
  POKEDEX: "/pokedex/",
};

export const locationsWithLabels = {
  INDEX: { path: locations.INDEX, label: "Home" },
  POKEDEX: { path: locations.POKEDEX, label: "Pokedex" },
};
