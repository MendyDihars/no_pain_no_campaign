'use client';

import { LogOutIcon } from "lucide-react";
import { signOut } from "@root/lib/auth-client";
import { useRouter } from "next/navigation";
import { cn } from "@root/lib/utils";
import { useTranslations } from "next-intl";
import Tooltip from "./ui/Tooltip";
export default function Logout({ className }) {
  const router = useRouter();
  const t = useTranslations();

  async function handleLogout() { 
    await signOut();
    router.push('/admin/login');
  }

  return (
    <Tooltip content={t('Sidebar.logout')} side="bottom" align="center">
      <div className={cn("flex gap-2 text-sm items-center cursor-pointer", className)} onClick={handleLogout}>
        <LogOutIcon className="w-5 h-5" />
      </div>
    </Tooltip>
  )
}
