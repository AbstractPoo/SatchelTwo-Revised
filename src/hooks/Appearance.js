import { useContext } from "react";
import { AppearanceContext } from "../contexts/Appearance";

export function useAppearance() {
  return useContext(AppearanceContext);
}
