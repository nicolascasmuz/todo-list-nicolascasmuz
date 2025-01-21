import type { NextPage } from "next";
import { useEffect } from "react";
import { getAuth0Client } from "lib/auth0";
import { createTask, login } from "lib/api";
import { useUserData } from "lib/hooks";
import styles from "./dashboard.module.css";
import Layout from "components/layout";
import { MyTasksLogo } from "ui/logo";
import { LoginButton } from "ui/buttons";
import { v4 as uuidv4 } from "uuid";

const Dashboard: NextPage = () => {
  const userData = useUserData();

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

          const userDataObj = {
            email: user.email,
            nickname: user.nickname,
            picture: user.picture,
            updated_at: user.updated_at,
          };

          await login(userDataObj);

          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
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

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const task = e.target.task.value;

    if (task) {
      const taskData = {
        email: userData.email,
        tasks: [{ id: uuidv4().slice(32), task }],
      };

      await createTask(taskData);
    }
  };

  return (
    <Layout>
      <section className={styles["dashboard__general-container"]}>
        <MyTasksLogo height={"150px"} />
        <form className="dashboard__form" onSubmit={HandleSubmit}>
          <input
            className={styles["dashboard__input"]}
            type="text"
            name="task"
            placeholder="What do you have planned?"
          />
          <LoginButton variant="text" color="secondary" type="submit">
            Add task
          </LoginButton>
        </form>
        <h3 className="dashboard__subtitle">Tasks</h3>
        <div className={styles["dashboard__task-container"]}>
          <div className={styles["dashboard__task-div"]}>
            <p className="dashboard__task-p">Do the laundry</p>
            <div className="dashboard__task-button-container">
              <LoginButton variant="outlined" color="primary" size="small">
                Edit
              </LoginButton>
              <LoginButton variant="outlined" color="primary" size="small">
                Delete
              </LoginButton>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
