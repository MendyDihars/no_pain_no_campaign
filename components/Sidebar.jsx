'use client';

import { useMemo } from "react";
import { compact } from "lodash";
import Link from "next/link";
import { GlobeIcon, HomeIcon } from "lucide-react";
import { useSession } from "@root/lib/auth-client";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { cn } from "@root/lib/utils";
import Logout from "@root/components/Logout";
import Dropdown from "@root/components/ui/Dropdown";

export default function Sidebar() {
  const t = useTranslations();
  const { data } = useSession();
  const pathname = usePathname();

  function isActive(path) {
    const [, ...parts] = compact(pathname.split('/'));
    const newPath = `/${compact(parts).join('/')}`;
    return newPath === path;
  }

  const items = useMemo(() => ([
    {
      id: 'fr',
      render: () => (
        <Link href="/fr" className="h-full w-full">
          {t('Sidebar.french')}
        </Link>
      )
    },
    {
      id: 'en',
      render: () => (
        <Link href="/en" className="h-full w-full">
          {t('Sidebar.english')}
        </Link>
      )
    }
  ]), []);

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
          <Link href="/codex" className={
            cn(
              'text-secondary hover:text-primary transition-all duration-300 px-2',
              isActive('/codex') ? 'text-primary' : ''
            )
          }>
            {t("Sidebar.codex")}
          </Link>
        </section>
        <section>
          <Link href="/calendar" className={
            cn(
              'text-secondary hover:text-primary transition-all duration-300 px-2',
              isActive('/calendar') ? 'text-primary' : ''
            )
          }>
            {t("Sidebar.calendar")}
          </Link>
        </section>
        <section>
          <Link href="/links" className={
            cn(
              'text-secondary hover:text-primary transition-all duration-300 px-2',
              isActive('/links') ? 'text-primary' : ''
            )
          }>
            {t("Sidebar.links")}
          </Link>
        </section>
        <section>
          <Link href="/gallery" className={
            cn(
              'text-secondary hover:text-primary transition-all duration-300 px-2',
              isActive('/gallery') ? 'text-primary' : ''
            )
          }>
            {t("Sidebar.gallery")}
          </Link>
        </section>
        <section>
          <Link href="/rules" className={
            cn(
              'text-secondary hover:text-primary transition-all duration-300 px-2',
              isActive('/rules') ? 'text-primary' : ''
            )
          }>
            {t("Sidebar.rules")}
          </Link>
        </section>
      </div>
      <Dropdown items={items} align="end">
        <div className="text-secondary hover:text-primary transition-all duration-300 px-2 flex items-center cursor-pointer">
          <GlobeIcon className="w-5 h-5 p-0 m-0" />
        </div>
      </Dropdown>
      {data?.user ? (
        <Logout className="text-secondary hover:text-primary transition-all duration-300 px-2" />
      ) : null}
    </nav>
  );
}
