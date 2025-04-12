import knex, { DB } from "@root/lib/db";
import CircularRelation from "@root/components/CircularRelation/CircularRelation";
import { getFullname } from "@root/lib/decorators/character.helper";
import { CircularProvider } from "@root/contexts/CircularContext";
import HeadDate from "@root/components/CircularRelation/HeadDate";
import Timeline from "@root/components/CircularRelation/Timeline";
import { getCharacter } from "@root/actions/character";
import { getEvents } from "@root/actions/event";


export default async function CharacterPage({ params }) {
  const { id } = await params;
  const character = await getCharacter(id);
  const events = await getEvents();

  if (!character) {
    return <div>Personnage non trouvé</div>;
  }

  return (
    <CircularProvider>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center mt-4 mb-8">{getFullname(character)}</h1>
        <div className="text-lg font-bold text-center mt-4 mb-8">
          <HeadDate />
        </div>
        <CircularRelation id={id} />
        <div className="mt-16">
          <Timeline events={events} />
        </div>
      </div>
    </CircularProvider>
  );
}

