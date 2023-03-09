import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import LoadingScreen from "../components/Loading";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(false);

  function googleSignIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  function logOut() {
    signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoaded(true);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {loaded ? (
        <AuthContext.Provider
          value={{ auth, googleSignIn, logOut, user, loaded }}
        >
          {children}
        </AuthContext.Provider>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
