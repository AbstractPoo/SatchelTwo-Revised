import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useAuth } from "./hooks/Auth";
import SignIn from "./pages/SignIn";
import MainContainer from "./pages/MainContainer";

function NavigateWithRedirect({ to }) {
  const { pathname } = useLocation();

  return <Navigate to={to + (pathname ? "?redirect=" + pathname : "")} />;
}

function Router() {
  const auth = useAuth();
  return (
    <>
      <HashRouter>
        <Routes>
        <Route path="/SatchelTwo-Revised">
          <Route path="/signin" element={<SignIn />} />

          {auth?.user ? (
            <Route path="*" element={<MainContainer />} />
          ) : (
            <Route path="*" element={<NavigateWithRedirect to="/signin" />} />
          )}
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default Router;
