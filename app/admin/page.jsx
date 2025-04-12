import { getUser } from "@root/lib/user";

export default async function Page() {
  const user = await getUser();

  return (
    <div>
      <h1>Hello {user?.name}</h1>
    </div>
  );
}
