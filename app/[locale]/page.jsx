import { roxborough } from '@root/lib/fonts';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('Home');
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold text-center py-4">
        No Pain No Campaign
      </h1>
      <div className={`${roxborough.className} text-4xl`}>
        {t.rich('slogan', {
          i: (chunks) => <span className="italic">{chunks}</span>,
        })}
      </div>
    </div>
  );
}
