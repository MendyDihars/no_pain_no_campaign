import { getTranslations } from "next-intl/server";
import LinkButton from "@root/components/ui/LinkButton";

export default async function Page() {
  const t = await getTranslations();

  return (
    <div className="m-20">
      <div className="flex gap-4">
        <LinkButton href="/admin/characters">
          {t('Admin.Characters.title')}
        </LinkButton>
      </div>
    </div>
  );
}
