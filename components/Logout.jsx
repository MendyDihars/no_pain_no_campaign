'use client';

import { LogOutIcon } from "lucide-react";
import { signOut } from "@root/lib/auth-client";
import { useRouter } from "next/navigation";
import { cn } from "@root/lib/utils";

export default function Logout({ className }) {
  const router = useRouter();

  async function handleLogout() { 
    await signOut();
    router.push('/admin/login');
  }

  return (
    <div className={cn("flex gap-2 text-sm items-center cursor-pointer", className)} onClick={handleLogout}>
      <LogOutIcon className="w-4 h-4" />
      <div>
        Déconnexion
      </div>
    </div>
  )
}
