import styles from "./layout.module.css";

export default function Layout({ children }: any) {
  return (
    <div className={styles.div}>
      <div>{children}</div>
    </div>
  );
}
