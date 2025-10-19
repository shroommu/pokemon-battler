// eventually i need a way to match all the pokemon's names because this wildcard doesn't actually work
export const publicRoutes = ["/", "/pokedex", "/pokedex/:pokemon*"];

export const authRoutes = ["/login", "/sign-up"];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
