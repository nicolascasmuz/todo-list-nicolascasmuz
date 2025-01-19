import { useEffect } from "react";
import { getAuth0Client } from "lib/auth0";
import { login } from "lib/api";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  useEffect(() => {
    const saveLogin = async () => {
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

          console.log("userData Home: ", userData);

          await login(userData);
        } catch (error) {
          console.error(
            "Error procesando el redireccionamiento de Auth0:",
            error
          );
        }
      }
    };

    saveLogin();
  }, []);

  return (
    <section className="dashboard__container">
      <h1 className="dashboard__title">myTasks</h1>
      <form className="dashboard__form">
        <input
          className="dashboard__input"
          type="text"
          name="task"
          placeholder="What do you have planned?"
        />
        <button>Add task</button>
      </form>
    </section>
  );
}
