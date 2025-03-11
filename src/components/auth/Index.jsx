import { Login } from "./login/Login";
import { Signup } from "./signup/Signup";
import { useState } from "react";
export const Auth = () => {
  const [type, setType] = useState("login");
  return (
    <>
      {type == "login" ? (
        <Login setType={() => setType("signup")} />
      ) : (
        <Signup setType={() => setType("login")} />
      )}
    </>
  );
};
