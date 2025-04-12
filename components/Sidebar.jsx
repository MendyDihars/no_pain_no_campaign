'use client';

import { compact } from "lodash";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { useSession } from "@root/lib/auth-client";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { cn } from "@root/lib/utils";
import Logout from "@root/components/Logout";

export default function Sidebar() {
  const t = useTranslations();
  const { data } = useSession();
  const pathname = usePathname();

  function isActive(path) {
    const [, ...parts] = compact(pathname.split('/'));
    const newPath = `/${compact(parts).join('/')}`;
    return newPath === path;
  }

  return (
    <nav className="w-full bg-background-light h-12 px-8 text-white flex">
      <div className="flex gap-6 flex-1 items-center">
        <section>
          <Link href="/" className={
            cn(
              'text-secondary hover:text-primary transition-all duration-300 px-2',
              isActive('/') ? 'text-primary' : ''
            )
          }>
            <HomeIcon className="w-5 h-5 p-0 m-0" />
          </Link>
        </section>
        <section>
          <Link href="/wiki" className={
            cn(
              'text-secondary hover:text-primary transition-all duration-300 px-2',
              isActive('/wiki') ? 'text-primary' : ''
            )
          }>
            {t("Sidebar.Wiki")}
          </Link>
        </section>
        <section>
          <Link href="/calendar" className={
            cn(
              'text-secondary hover:text-primary transition-all duration-300 px-2',
              isActive('/calendar') ? 'text-primary' : ''
            )
          }>
            {t("Sidebar.Calendar")}
          </Link>
        </section>
        <section>
          <Link href="/links" className={
            cn(
              'text-secondary hover:text-primary transition-all duration-300 px-2',
              isActive('/links') ? 'text-primary' : ''
            )
          }>
            {t("Sidebar.Links")}
          </Link>
        </section>
      </div>
      {data?.user ? (
        <Logout className="text-secondary hover:text-primary transition-all duration-300 px-2" />
      ) : null}
    </nav>
  );
}
