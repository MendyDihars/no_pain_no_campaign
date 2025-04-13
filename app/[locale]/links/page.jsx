import { DB } from '@root/lib/db';
import { getTranslations } from 'next-intl/server';
import { roxborough } from '@root/lib/fonts';
import { getFullname } from '@root/lib/decorators/character.helper';
import CircleCharacter from '@root/components/CircleCharacter';

export default async function CharactersPage() {
  const t = await getTranslations();

  const characters = await DB.characters.select('*').orderBy('firstname', 'asc');

  return (
    <div className="m-20">
      <h1 className={`${roxborough.className} text-secondary text-4xl py-4`}>{t('Links.title')}</h1>
      <div className="flex justify-start lg:justify-center gap-12 flex-wrap">
        {characters.map((character) => (
          <CircleCharacter key={character.id} name={getFullname(character)} />
        ))}
      </div>
    </div>
  );
}
