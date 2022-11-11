import { useAuth } from "../hooks/Auth";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, GoogleIcon, SatchelTwoIcon } from "../components/Library";

function SignIn() {
  const { user, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = new URLSearchParams(location.search).get("redirect");
  useEffect(() => {
    if (user) {
      navigate(redirectTo || "/");
    }
  }, [user]);

  return (
    <>
      <div className="w-screen h-screen dark:bg-neutral-900">
        <div className="max-w-2xl flex flex-col justify-center items-center mx-auto gap-4 h-full">
          <SatchelTwoIcon height="h-28 md:h-20" width="w-28 md:w-20" />
          <h1 className="text-neutral-900 dark:text-white font-medium text-5xl md:text-8xl">
            Satchel<span className="text-indigo-800">:</span>Two
          </h1>
          <h2 className="font-normal text-neutral-800 dark:text-neutral-300 text-2xl md:text-5xl text-center">
            Aiding interactions between students & staff
          </h2>
          <Button onClick={googleSignIn} className="text-lg md:text-2xl">
            <GoogleIcon /> Sign in
          </Button>
        </div>
      </div>
    </>
  );
}

export default SignIn;
