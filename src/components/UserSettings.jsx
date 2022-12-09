import { useState } from "react";
import { Listbox } from "@headlessui/react";
 
const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

function MyListbox() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
      <Listbox.Button>{selectedPerson.name}</Listbox.Button>
      <Listbox.Options>
        {people.map((person) => (
          <Listbox.Option
            key={person.id}
            value={person}
            disabled={person.unavailable}
          >
            {person.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

const pages = {
  appearance: <Appearance />,
};

const pagesTabs = [{ name: "appearance" }];

function Appearance() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-row justify-between text-white">
        <div>Theme</div>
        <MyListbox />
      </div>
    </div>
  );
}

function TabButton({ name }) {
  return (
    <button
      key={name}
      className="p-2 text-slate-200 text-xl rounded transition flex justify-start items-center gap-2.5 bg-neutral-800 w-full"
    >
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
