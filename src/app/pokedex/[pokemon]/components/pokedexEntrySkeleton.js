"use client";
import TypePill from "@/components/TypePill";

export default function PokedexEntrySkeleton() {
  return (
    <section className="flex flex-col p-6 w-full bg-gray-200 rounded-md items-center h-screen">
      <h1 className="text-4xl text-gray-400">{`#???`}</h1>
      <div className="w-64 h-64 mt-4 border-gray-300 border-4 rounded-md bg-gray-100 p-1" />
      <div className="mt-2">
        <TypePill typeName={"loading"} />
      </div>
    </section>
  );
}
