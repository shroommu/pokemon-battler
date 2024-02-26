import { Suspense } from "react";

export default function Pokedex({ children }) {
  return <Suspense>{children}</Suspense>;
}
