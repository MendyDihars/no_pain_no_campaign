import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Button from "@root/components/ui/Button";
export default async function Page() {
  const t = await getTranslations();

  return (
    <div className="m-20">
      <div className="flex gap-4">
        <Link href="/admin/characters">
          <button type="button" className="bg-primary text-foreground cursor-pointer px-4 py-2 rounded-md">
            {t('Admin.Characters.title')}
          </button>
        </Link>
      </div>
    </div>
  );
}
