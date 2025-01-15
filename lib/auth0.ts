import { createAuth0Client, Auth0Client } from "@auth0/auth0-spa-js";

let auth0: Auth0Client | null = null;

export async function getAuth0Client() {
  if (!auth0) {
    auth0 = await createAuth0Client({
      domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string,
      clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENTID as string,
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    });
  }
  return auth0;
}
