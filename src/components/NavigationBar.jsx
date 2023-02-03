import { SatchelTwoIcon, TickIcon, CrossIcon } from "./Library";
import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { USER_DATA, useGetApi } from "../hooks/Api";
import { useFeedback } from "../hooks/Feedback";
import {
  HomeworksNavigationIcon,
  SubscriptionsNavigationIcon,
} from "./Library";
import UserSettings from "./UserSettings";
import { useDarkMode } from "usehooks-ts";

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
  {
    href: "/teacher",
    name: "Teacher",
    icon: <SubscriptionsNavigationIcon />,
    routeLevel: 1,
  },
  {
    href: "/admin",
    name: "Admin",
    icon: <SubscriptionsNavigationIcon />,
    routeLevel: 2,
  },
];

// 3B3A47 use this colour becuase brian thinks it looks nice :)

function NavigationBar() {
  const { user } = useAuth();
  const userData = useGetApi(USER_DATA);
  const { createModal } = useFeedback();

  return (
    <div className="flex flex-col w-60 bg-neutral-900 p-2.5 justify-between flex-shrink-0">
      <div className="flex flex-col">
        <div className="flex justify-around items-center py-5">
          <SatchelTwoIcon width="w-12" height="h-12" dependant={false} />
          <div className="text-white font-medium text-2xl">
            Satchel<span className="text-indigo-800">:</span>Two
          </div>
        </div>
        <div className="flex flex-col gap-2.5 w-full">
          {navigationRoutes.flatMap((route) => {
            if (
              !route.routeLevel ||
              (userData?.level && userData?.level >= route.routeLevel)
            ) {
              return [<NavigationButton key={route.name} {...route} />];
            } else {
              return [];
            }
          })}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <DarkModeToggle />
        <LogOut />
      </div>
    </div>
  );
}

function DarkModeToggle() {
  const { isDarkMode, toggle } = useDarkMode();
  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  return (
    <div className="w-full flex flex-row justify-between items-center">
      <div className=" text-lg text-slate-200">Dark mode</div>
      <button
        className="rounded bg-gray-200 p-1 hover:bg-gray-300 transition"
        onClick={toggle}
      >
        {isDarkMode ? (
          <TickIcon className="w-3 h-3" />
        ) : (
          <CrossIcon className="w-3 h-3" />
        )}
      </button>
    </div>
  );
}

function LogOut() {
  const { logOut } = useAuth();

  return (
    <button
      className="rounded bg-gray-200 px-1 py-0.5 m-2.5 hover:bg-gray-300 transition w-full"
      onClick={logOut}
    >
      logout
    </button>
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
