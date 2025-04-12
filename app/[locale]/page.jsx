import Button from '@root/components/ui/Button';
import { roxborough, roxboroughItalic } from '@root/lib/fonts';
import knex from '@root/lib/db';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function Home() {
  const t = await getTranslations();
  const characters = await knex
    .select('id', 'firstname', 'lastname')
    .from('characters')
    .where('main', true)
    .orderBy('firstname', 'asc');
  return (
    <>
      <div className="flex flex-col bg-cover bg-center h-screen" style={{ backgroundImage: 'url(https://images6.alphacoders.com/534/thumb-1920-534435.jpg)' }}>
        <h1 className={`${roxborough.className} text-4xl text-center py-4 mt-20`}>
          No Pain / No Campaign
        </h1>
        <h2 className={`${roxborough.className} text-[4rem] ms-40 mt-20`}>
          {t.rich('Home.slogan', {
            i: (chunks) => <span className={roxboroughItalic.className}>{chunks}</span>,
            br: () => <br />,
          })}
        </h2>
        <div className="flex justify-center items-center mt-100">
          <button className="text-uppercase text-foreground bg-primary px-10 py-6 rounded-full text-4xl cursor-pointer hover:bg-secondary hover:text-background transition-colors duration-300">
            {t('Home.readAdventure')}
          </button>
        </div>
      </div>
      <div className="m-20">
        <h2 className={`${roxborough.className} text-secondary text-[4rem] mb-4`}>
          {t('Home.chainsBreakers')}
        </h2>
        <p className="text-forground text-2xl mb-10">
          {t('Home.chainsBreakersDescription')}
        </p>
        <div className="flex justify-between items-center">
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/links/${character.id}`}
              className={`${roxborough.className} cursor-pointer flex items-end py-6 justify-center h-140 w-70 bg-gradient-to-r from-foreground to-secondary text-background text-4xl`}
            >
              <span className="w-1/2 text-center">
                {character.firstname} {character.lastname}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
