import { useEffect } from "react";
import { getAuth0Client } from "lib/auth0";

export default function Home() {
  useEffect(() => {
    const setupLogin = async () => {
      const auth0 = await getAuth0Client();

      document.getElementById("login")?.addEventListener("click", async () => {
        await auth0.loginWithRedirect();
      });
    };

    setupLogin();
  }, []);

  return (
    <div>
      <button id="login">Click to Login</button>
    </div>
  );
}
