import { useGetApi, USER_DATA } from "../hooks/Api";
import { useAuth } from "../hooks/Auth";
import { createContext } from "react";
import LoadingScreen from "../components/Loading";

export const AppearanceContext = createContext();

export default function AppearanceContextProvider({ children }) {
  let useDark = window.matchMedia("(prefers-color-scheme: dark)");
  const darkState = Boolean(localStorage.getItem("darkMode"));
  if (darkState !== undefined) {
    useDark = { matches: darkState };
  }
  if (useDark.matches) {
    document.documentElement.classList.add("dark");
  }

  return (
    <>
      <AppearanceContext.Provider value={{ useDark }}>
        {children}
      </AppearanceContext.Provider>
    </>
  );
}
