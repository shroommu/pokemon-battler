import Tab from "./components/tab";

export default function Tabs({ selectedTab, setSelectedTab }) {
  return (
    <div className="h-12">
      <ul className="flex flex-row h-auto">
        <li key={"info"}>
          <Tab text={"Info"} onClick={() => setSelectedTab("Info")} />
        </li>
        <li key={"stats"}>
          <Tab text={"Stats"} onClick={() => setSelectedTab("Stats")} />
        </li>
      </ul>
    </div>
  );
}
