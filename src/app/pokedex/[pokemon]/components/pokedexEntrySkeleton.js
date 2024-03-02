"use client";
import TypePill from "@/components/TypePill";

export default function PokedexEntrySkeleton() {
  return (
    <section className="flex flex-col p-6 w-full bg-gray-200 rounded-md items-center h-screen">
      <h1 className="text-4xl">{`#???`}</h1>
      <div className="w-64 h-64 mt-4 border-gray-600 border-4 rounded-md bg-white p-1" />
      <div className="mt-2">
        <TypePill typeName={"loading"}>{"loading"}</TypePill>
      </div>
    </section>
  );
}
