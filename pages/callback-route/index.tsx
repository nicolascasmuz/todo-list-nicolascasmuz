import { useEffect } from "react";
import { getAuth0Client } from "lib/auth0";

export default function CallbackRoute() {
  useEffect(() => {
    const handleRedirect = async () => {
      const auth0 = await getAuth0Client();

      await auth0.handleRedirectCallback();
      const user = await auth0.getUser();
      console.log(user);
    };

    handleRedirect();
  }, []);

  return <div>Callback route</div>;
}
