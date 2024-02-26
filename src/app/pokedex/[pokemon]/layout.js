import { Suspense } from "react";

export default async function Pokedex({ children }) {
  // return <Suspense>{children}</Suspense>;
  return children;
}
