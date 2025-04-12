import { createAuthClient } from "better-auth/react";
import config from "./config";

export const { signIn, signUp, signOut, useSession } = createAuthClient({
    /** the base url of the server (optional if you're using the same domain) */
    baseURL: config.betterAuth.url,
})
