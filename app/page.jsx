import { DB } from '@root/lib/db';
import Link from 'next/link';

export default async function Home() {
  const characters = await DB.characters.select('*').orderBy('firstname', 'asc');

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-4xl font-bold text-center py-4">
        Dragon Age Worldbuilding
      </h1>
      <div className="flex flex-col items-center justify-center flex-1">
        <Link href="/characters">
          <button className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer">
            Voir les personnages
          </button>
        </Link>
      </div>
    </div>
  );
}
