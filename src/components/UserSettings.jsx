import { useState } from "react";
import { Listbox, Switch } from "@headlessui/react";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

const pages = {
  /*appearance: <Appearance />,*/
};

const pagesTabs = [
  /*{ name: "appearance" }*/
];

/*function Appearance() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-row justify-between text-white">
        <div>Dark Mode</div>
        <Switch
          checked={darkMode}
          onChange={setDarkMode}
          className={`${
            darkMode ? "bg-blue-600" : "bg-neutral-800"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              darkMode ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
    </div>
  );
}*/

function TabButton({ name }) {
  return (
    <button className="p-2 text-slate-200 text-xl rounded transition flex justify-start items-center gap-2.5 bg-neutral-800 w-full">
      {name}
    </button>
  );
}

function UserSettings() {
  const [page, setPage] = useState("appearance");
  return (
    <>
      <div>
        <div className="w-96 bg-neutral-900 rounded opacity-100 flex p-2.5 gap-2">
          <div className="h-full">
            {pagesTabs.map((pageTab) => (
              <TabButton
                {...pageTab}
                onClick={() => {
                  setPage(page.name);
                }}
                key={page.name}
              />
            ))}
          </div>
          <div className="w-full">{pages[page]}</div>
        </div>
      </div>
    </>
  );
}

export default UserSettings;
