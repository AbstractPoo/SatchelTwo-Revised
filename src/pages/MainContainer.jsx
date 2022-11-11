import { useAuth } from "../hooks/Auth";
import NavigationBar from "../components/NavigationBar";
import { Route, Routes, Navigate } from "react-router-dom";
import { Button } from "../components/Library";
import Homeworks from "./LoggedIn/Homeworks";

function MainContainer() {
  const { logOut } = useAuth();

  return (
    <div className="flex h-screen">
      <NavigationBar />
      <div>
        {
          //<Button onClick={logOut}>log out of the account skid</Button>
        }
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to="/homeworks" />} />
            <Route path="/homeworks/*" element={<Homeworks />} />
            <Route
              path="/subscriptions/*"
              element={<>future subscriptions page</>}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default MainContainer;
