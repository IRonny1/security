import { useState } from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

import "./Login.scss";

function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <div className="login-page">
      <div className="login-container">
        {isSignIn ? (
          <SignIn setIsSignIn={setIsSignIn} />
        ) : (
          <SignUp setIsSignIn={setIsSignIn} />
        )}
      </div>
    </div>
  );
}

export default Login;
