import { SatchelTwoIcon } from "./Library";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import {
  HomeworksNavigationIcon,
  SubscriptionsNavigationIcon,
} from "./Library";
import UserSettings from "./UserSettings";

const navigationRoutes = [
  {
    href: "/homeworks",
    name: "Homeworks",
    icon: <HomeworksNavigationIcon />,
  },
  {
    href: "/subscriptions",
    name: "Subscriptions",
    icon: <SubscriptionsNavigationIcon />,
  },
];

// 3B3A47 use this colour becuase brian thinks it looks nice :)

function NavigationBar() {
  const [settings, setSettings] = useState(false);
  const { user } = useAuth();

  function displaySettings() {
    setSettings(true);
  }

  return (
    <div className="flex flex-col w-60 bg-neutral-900 p-2.5 justify-between">
      <div className="flex flex-col">
        <div className="flex justify-around items-center py-5">
          <SatchelTwoIcon width="w-12" height="h-12" dependant={false} />
          <div className="text-white font-medium text-2xl">
            Satchel<span className="text-indigo-800">:</span>Two
          </div>
        </div>
        <div className="flex flex-col gap-2.5 w-full">
          {navigationRoutes.map((route) => (
            <NavigationButton {...route} />
          ))}
        </div>
      </div>
      {settings ? <UserSettings /> : <></>}
      <div>
        <button
          onClick={displaySettings}
          className="p-2 text-slate-200 text-xl rounded transition flex justify-start items-center gap-2.5 bg-neutral-800 w-full"
        >
          <img className="h-8 w-8 rounded" src={user.photoURL} alt="pfp" />
          <div>User Settings</div>
        </button>
      </div>
    </div>
  );
}

function NavigationButton({ href, name, icon }) {
  return (
    <NavLink to={href}>
      {({ isActive }) => (
        <div
          key={name}
          className={
            "p-2 text-slate-200 text-xl rounded transition flex justify-start items-center gap-2.5 " +
            (isActive
              ? "bg-neutral-700"
              : "bg-neutral-900 hover:bg-neutral-800")
          }
        >
          <div>{icon}</div>
          <div>{name}</div>
        </div>
      )}
    </NavLink>
  );
}

export default NavigationBar;
