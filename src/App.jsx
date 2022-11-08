import Router from "./Router";
import AuthContextProvider from "./contexts/Auth";

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
