"use client";
import Tab from "./components/tab";

export default function Tabs({ pokemon }) {
  return (
    <div className="h-24">
      <ul className="h-auto">
        <li>
          <Tab text={"Info"} />
        </li>
        <li>
          <Tab text={"Stats"} />
        </li>
      </ul>
    </div>
  );
}
