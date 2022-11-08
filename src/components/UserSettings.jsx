import { useState } from "react";

const pages = {
  appearance: <Appearance />,
};

const pagesTabs = [{ name: "appearance" }];

function Appearance() {
  return <div>these are going to be the settings kiddo</div>;
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
      <div className="absolute inset-0 z-40 w-screen h-screen bg-neutral-900 opacity-25"></div>
      <div className="absolute inset-0 z-50 w-screen h-screen flex justify-center items-center">
        <div>
          <div className="w-60 bg-neutral-900 rounded opacity-100 flex p-2.5">
            <div clasName="w-20 h-full">
              {pagesTabs.map((pageTab) => (
                <TabButton {...pageTab} />
              ))}
            </div>
            <div>{pages[page]}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSettings;
