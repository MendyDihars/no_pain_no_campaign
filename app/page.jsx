import Link from 'next/link';
import Character from '@root/lib/models/character';

export default async function Home() {
  const characters = await Character.select('*').orderBy('firstname', 'asc');

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
