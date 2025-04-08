import knex, { DB } from "@root/lib/db";
import CircularRelation from "@root/components/CircularRelation";
import { getFullname } from "@root/lib/decorators/character.helper";
import getCharacterRelationsQuery from "@root/lib/queries/characters/get-character-relations";

export default async function CharacterPage({ params }) {
  const { id } = await params;
  const result = (await knex.raw(getCharacterRelationsQuery, [id]))?.rows;
  const [character] = result;
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mt-4 mb-8">{getFullname(character)}</h1>
      <CircularRelation character={character} />
    </div>
  );
}

