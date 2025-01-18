import { useEffect } from "react";
import { getAuth0Client } from "lib/auth0";

export default function Home() {
  useEffect(() => {
    const setupLogin = async () => {
      const auth0 = await getAuth0Client();

      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        try {
          await auth0.handleRedirectCallback();
          const user = await auth0.getUser();
          console.log("Usuario autenticado:", user);

          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );

          await fetch("http://localhost:8080/api/auth", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              nickname: user.nickname,
              picture: user.picture,
              updated_at: user.updated_at,
            }),
          });
        } catch (error) {
          console.error(
            "Error procesando el redireccionamiento de Auth0:",
            error
          );
        }
      }

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
