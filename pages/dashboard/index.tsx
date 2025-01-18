import styles from "./dashboard.module.css";

export default function Dashboard() {
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
