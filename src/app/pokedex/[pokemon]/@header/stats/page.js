import HeaderPage from "../page";

export default async function Page({ params }) {
  return HeaderPage({ params, tabSegment: "stats" });
}
