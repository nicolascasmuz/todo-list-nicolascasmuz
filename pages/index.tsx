import Layout from "components/layout";
import Login from "./login";
import { useData } from "lib/hooks";
import Dashboard from "./dashboard";

export default function Home() {
  const userData = useData();

  return <Layout>{userData ? <Dashboard /> : <Login />}</Layout>;
}
