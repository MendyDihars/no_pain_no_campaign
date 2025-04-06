import CharacterCard from '@root/components/CharacterCard';
import { DB } from '@root/lib/db';

export default async function CharactersPage() {
  const characters = await DB.characters.select('*').orderBy('firstname', 'asc');

  return (
    <div>
    </div>
  );
}
