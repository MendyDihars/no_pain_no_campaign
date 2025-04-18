import { auth } from "./auth";
import { headers } from "next/headers";

export async function getUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
}

export async function isAdmin(user) {
  return user?.role === 'admin';
}
