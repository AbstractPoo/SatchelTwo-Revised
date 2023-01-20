import Router from "./Router";
import AuthContextProvider from "./contexts/Auth";
import UserContextProvider from "./contexts/User";
import FeedbackContextProvider from "./contexts/Feedback";
import AppearanceContextProvider from "./contexts/Appearance";

function App() {
  return (
    <AppearanceContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <FeedbackContextProvider>
            <Router />
          </FeedbackContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </AppearanceContextProvider>
  );
}

export default App;
