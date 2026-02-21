import { renderDetailsPage } from "./renderDetailsPage";

export default async function Page({ params }) {
  return renderDetailsPage(params, "Moves");
}
