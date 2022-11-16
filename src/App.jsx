import Router from "./Router";
import AuthContextProvider from "./contexts/Auth";
import UserContextProvider from "./contexts/User";

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
