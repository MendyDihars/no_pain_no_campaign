import knex, { DB } from "@root/lib/db";
import CircularRelation from "@root/components/CircularRelation/CircularRelation";
import { getFullname } from "@root/lib/decorators/character.helper";
import { CircularProvider } from "@root/contexts/CircularContext";
import HeadDate from "@root/components/CircularRelation/HeadDate";
import Timeline from "@root/components/CircularRelation/Timeline";
import { getCharacter } from "@root/actions/character";
import { getEvents } from "@root/actions/event";
import { getTranslations } from "next-intl/server";

export default async function CharacterPage({ params }) {
  const [{ id }, character, events, t] = await Promise.all([
    params,
    getCharacter(id),
    getEvents(),
    getTranslations(),
  ]);

  if (!character) {
    return <div>{t('CharacterPage.noCharacter')}</div>;
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

