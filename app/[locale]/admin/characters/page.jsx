import { DB } from '@root/lib/db';
import { getTranslations } from 'next-intl/server';
import { roxborough } from '@root/lib/fonts';
import Characters from '@root/components/views/Characters';

export default async function AdminCharactersPage() {
  const t = await getTranslations();

  const characters = await DB.characters.select('*').orderBy('firstname', 'asc');

  return (
    <div className="m-20">
      <h1 className={`${roxborough.className} text-secondary text-4xl py-4 mb-20`}>
        {t('Admin.Characters.title')}
      </h1>
      <Characters prefixTo='/admin/characters' characters={characters} />
    </div>
  );
}