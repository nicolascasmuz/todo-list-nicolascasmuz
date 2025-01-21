import Layout from "components/layout";
import Dashboard from "./dashboard";
import Login from "./login";
import { useUserData } from "lib/hooks";

export default function Home() {
  const userData = useUserData();

  return <Layout>{userData ? <Dashboard /> : <Login />}</Layout>;
}
