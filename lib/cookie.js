import { cookies } from "next/headers";

export async function getCurrentPathname() {
  const cookieStore = await cookies();
  return cookieStore.get('x-current-pathname')?.value;
}

