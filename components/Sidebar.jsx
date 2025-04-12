import Link from "next/link";
import { getUser } from "@root/lib/user";
import Logout from "./Logout";

export default async function Sidebar() {
  const user = await getUser();

  return (
    <nav className="w-full bg-gradient-to-r from-secondary to-background ps-8 text-white flex">
      <div className="flex gap-4 flex-1">
        <section className="hover:bg-white hover:text-black transition-all duration-300 p-2">
            <Link href="/wiki">
              Wiki
            </Link>
          </section>
        <section className="hover:bg-white hover:text-black transition-all duration-300 p-2">
          <Link href="/calendar">
            Calendar
          </Link>
        </section>
        <section className="hover:bg-white hover:text-black transition-all duration-300 p-2">
          <Link href="/characters">
            Liens
          </Link>
        </section>
      </div>
      {user ? (
        <Logout className="hover:bg-white hover:text-black transition-all duration-300 p-2" />
      ) : null}
    </nav>
  );
}
