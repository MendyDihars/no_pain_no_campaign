import { getRaces, getKlasses } from "@root/actions/background";
import { roxborough } from "@root/lib/fonts";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import CharacterForm from "@root/components/forms/CharacterForm";

export default async function AdminCharacterPage() {
  const [races, klasses, t] = await Promise.all([
    getRaces(),
    getKlasses(),
    getTranslations()
  ]);
  return (
    <div className="h-full w-full p-20 bg-gradient-to-br from-black to-secondary">
      <Link href="/admin/characters" className="text-foreground flex items-center gap-1 text-lg">
        <ChevronLeftIcon className="w-5 h-5" />
        {t('General.back')}
      </Link>
      <div className={`${roxborough.className} text-secondary text-4xl mt-12`}>
        {t('Admin.Characters.new')}
      </div>

      <CharacterForm races={races} klasses={klasses} />
    </div>
  );
}
