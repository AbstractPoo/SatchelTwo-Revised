import { useAuth } from "../hooks/Auth";
import NavigationBar from "../components/NavigationBar";
import { Route, Routes, Navigate } from "react-router-dom";
import { Button } from "../components/Library";
import Homeworks from "./LoggedIn/Homeworks";
import Subscriptions from "./LoggedIn/Subscriptions";
import Teacher from "./Teacher/Teacher";
import AuthLocked from "../components/AuthLocked";
import Admin from "./Teacher/Admin";

function MainContainer() {
  const { logOut } = useAuth();

  return (
    <div className="flex h-screen w-screen">
      <NavigationBar />
      <div className="w-full min-w-0">
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to="/homeworks" />} />
            <Route path="/homeworks/*" element={<Homeworks />} />
            <Route path="/subscriptions/*" element={<Subscriptions />} />

            <Route
              path="/teacher/*"
              element={
                <AuthLocked level={1}>
                  <Teacher />
                </AuthLocked>
              }
            />
            <Route
              path="/admin"
              element={
                <AuthLocked level={2}>
                  <Admin />
                </AuthLocked>
              }
            ></Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default MainContainer;
