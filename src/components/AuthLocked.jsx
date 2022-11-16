import { Route } from "react-router-dom";
import { useGetApi, USER_DATA } from "../hooks/Api";

function AuthLocked({ children, level }) {
  const userData = useGetApi(USER_DATA);
  return userData?.level ? (
    userData.level >= level ? (
      <>{children}</>
    ) : (
      <>you are not authorised to be here</>
    )
  ) : (
    <>loading</>
  );
}

export default AuthLocked;
