import { getUser } from "@root/lib/user";
// import { getTranslations } from "next-intl/server";

export default async function Page() {
  // const t = await getTranslations();
  const user = await getUser();

  return (
    <div>
      <h1>{user?.name}</h1>
    </div>
  );
}
