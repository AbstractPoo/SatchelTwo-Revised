import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./hooks/Auth";
import SignIn from "./pages/SignIn";
import MainContainer from "./pages/MainContainer";

function Router() {
  const auth = useAuth();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />

          {auth?.user ? (
            <Route path="*" element={<MainContainer />} />
          ) : (
            <Route path="*" element={<Navigate to="/signin" />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
