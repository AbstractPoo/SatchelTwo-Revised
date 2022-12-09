import Router from "./Router";
import AuthContextProvider from "./contexts/Auth";
import UserContextProvider from "./contexts/User";
import FeedbackContextProvider from "./contexts/Feedback";
// USE FRAMER MOTION FOR ANIMATIONS
function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <FeedbackContextProvider>
          <Router />
        </FeedbackContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
