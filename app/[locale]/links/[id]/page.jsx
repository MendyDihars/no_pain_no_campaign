import Link from "next/link";
import { PenToolIcon } from "lucide-react";
import CircularRelation from "@root/components/CircularRelation/CircularRelation";
import { getFullname } from "@root/lib/decorators/character.helper";
import { StoredDateContextProvider } from "@root/contexts/StoredDateContext";
import HeadDate from "@root/components/CircularRelation/HeadDate";
import Timeline from "@root/components/CircularRelation/Timeline";
import { getCharacter } from "@root/actions/character";
import { getEvents } from "@root/actions/event";
import { getTranslations } from "next-intl/server";
import { getUser, isAdmin } from "@root/lib/user";

export default async function CharacterPage({ params }) {
  const { id } = await params;
  const user = await getUser();
  const [character, events, t] = await Promise.all([
    getCharacter(id),
    getEvents(),
    getTranslations(),  
  ]);

  if (!character.data) {
    return <div>{t('CharacterPage.noCharacter')}</div>;
  }

  return (
    <StoredDateContextProvider>
      <div className="p-4">
        <h1 className="flex gap-4 justify-center items-center mt-4 mb-8">
          <div className="text-2xl font-bold">
            {getFullname(character.data)}
          </div>
          {isAdmin(user) ? (
            <Link href={`/admin/characters/${id}`}>
              <PenToolIcon className="w-6 h-6 hover:text-primary transition-colors duration-300" />
            </Link>
          ) : null}
        </h1>
        <div className="text-lg font-bold text-center mt-4 mb-8">
          <HeadDate />
        </div>
        <CircularRelation id={id} />
        <div className="mt-16">
          <Timeline events={events} />
        </div>
      </div>
    </StoredDateContextProvider>
  );
}

