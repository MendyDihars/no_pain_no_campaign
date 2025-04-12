import { DB } from '@root/lib/db';
import Link from 'next/link';
import { getFullname } from '@root/lib/decorators/character.helper';

export default async function CharactersPage() {
  const characters = await DB.characters.select('*').orderBy('firstname', 'asc');

  return (
    <div className="p-4 flex flex-col gap-4"  >
      {characters.map((character) => (
        <div key={character.id}>
          <Link href={`/links/${character.id}`}>
            {getFullname(character)}
          </Link>
        </div>
      ))}
    </div>
  );
}
