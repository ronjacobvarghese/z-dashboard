import { AiFillAppstore } from "react-icons/ai";
import { MantineProvider, RingProgress, Text } from "@mantine/core";

import zag from "/logo.png";
import report from "/report.svg";
import settings from "/settings.svg";
import plus from "/plus.svg";

import "./App.css";
import Charts from "./components/Charts";
import Table from "./components/Table";

function App() {
  return (
    <>
      <nav className="h-full rounded-s-2xl bg-white p-6 w-[17.5rem]">
        <header className="w-full  ">
          <img src={zag} className="pl-10 object-cover" />
        </header>
        <ul className="nav-list">
          <li>
            <img src={report} alt="report" />
            <label>Reports</label>
          </li>
          <li>
            <AiFillAppstore size="1.5rem" />
            <label>Workspaces</label>
          </li>
          <li>
            <img src={settings} alt="report" />
            <label>Settings</label>
          </li>
        </ul>
      </nav>
      <main className="w-full h-full">
        <header className="flex justify-between border-b border-gray-300 items-center mx-8 my-2 py-4">
          <h1 className="py-4 font-bold text-2xl">Orders</h1>
          <button className="bg-[#3062C8] mr-4 flex gap-2 px-4 py-2 text-gray-100 rounded-lg">
            <img src={plus} /> Add Order
          </button>
        </header>
        <Charts />
        <Table />
      </main>
    </>
  );
}

export default App;
