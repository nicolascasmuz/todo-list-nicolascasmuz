import { useEffect } from "react";
import { getAuth0Client } from "lib/auth0";
import { useLogin } from "state/hooks/useLogin";

export default function Home() {
  const login = useLogin();

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
          console.log("user: ", user);

          const userData = {
            email: user.email,
            nickname: user.nickname,
            picture: user.picture,
            updated_at: user.updated_at,
          };

          login(userData);
        } catch (error) {
          console.error(
            "Error procesando el redireccionamiento de Auth0:",
            error
          );
        }
      }

      document.getElementById("login")?.addEventListener("click", async () => {
        await auth0.loginWithRedirect({
          authorizationParams: {
            redirect_uri: "http://localhost:3000/dashboard",
          },
        });
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
