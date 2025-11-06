import Tab from "./components/tab";

export default function Tabs({ selectedTab, setSelectedTab }) {
  return (
    <div className="h-12">
      <ul className="flex flex-row h-auto">
        <li key={"info"}>
          <Tab text={"Info"} />
        </li>
        <li key={"stats"}>
          <Tab text={"Stats"} />
        </li>
      </ul>
    </div>
  );
}
