import type { NextPage } from "next";
import { getAuth0Client } from "lib/auth0";
import { MyTasksLogo } from "ui/logo";
import styles from "./login.module.css";
import { LoginButton } from "ui/buttons";

const Login: NextPage = () => {
  const HandleClick = async (e) => {
    const auth0 = await getAuth0Client();

    await auth0.loginWithRedirect({
      authorizationParams: {
        redirect_uri: "http://localhost:3000/dashboard",
      },
    });
  };

  return (
    <section className={styles["general-container"]}>
      <MyTasksLogo />
      <LoginButton onClick={HandleClick}>Click to Login</LoginButton>
    </section>
  );
};

export default Login;
