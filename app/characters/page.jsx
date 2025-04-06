import Character from '@root/lib/models/character';
import CharacterCard from '@root/components/CharacterCard';

export default async function CharactersPage() {
  const characters = await Character.select('*').orderBy('firstname', 'asc');

  return (
    <div>


      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}
