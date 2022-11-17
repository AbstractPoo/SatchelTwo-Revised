import { useGetApi, USER_DATA } from "../hooks/Api";
import { useAuth } from "../hooks/Auth";
import { createContext } from "react";
import LoadingScreen from "../components/Loading";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const { loaded, user } = useAuth();
  const userData = useGetApi(USER_DATA);

  return (
    <>
      {(loaded && !user) || (loaded && userData && user) ? (
        <UserContext.Provider value={{ loaded, userData }}>
          {children}
        </UserContext.Provider>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
