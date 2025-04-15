import knex from '@root/lib/db';
import { getTranslations } from 'next-intl/server';
import { roxborough } from '@root/lib/fonts';
import Characters from '@root/components/views/Characters';

export default async function CharactersPage() {
  const t = await getTranslations();

  const characters = await knex.select('*').from('characters').orderBy('firstname', 'asc');

  return (
    <div className="m-20">
      <h1 className={`${roxborough.className} text-secondary text-4xl py-4`}>
        {t('Links.title')}
      </h1>
      <Characters characters={characters} />
    </div>
  );
}
