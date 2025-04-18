import { getFullCharacter, getCharacters } from "@root/actions/character";
import { getRaces, getKlasses } from "@root/actions/background";
import { roxborough } from "@root/lib/fonts";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import CharacterForm from "@root/components/forms/CharacterForm";
import { getRelations, getRelationTypes } from "@root/actions/relation";
import CharacterRelationsForm from "@root/components/forms/CharacterRelationsForm";

export default async function AdminCharacterPage({ params }) {
  const { id } = await params;
  const [
    character,
    races,
    klasses,
    t,
  ] = await Promise.all([
    getFullCharacter(id),
    getRaces(),
    getKlasses(),
    getTranslations(),
  ]);

  return (
    <div className="h-full w-full p-20 bg-gradient-to-br from-black to-secondary">
      <Link href="/admin/characters" className="text-foreground flex items-center gap-1 text-lg">
        <ChevronLeftIcon className="w-5 h-5" />
        {t('General.back')}
      </Link>
      <div className="flex justify-between items-center">
        <div className={`${roxborough.className} text-secondary text-4xl mt-12`}>
          {character.firstname} {character.lastname}
        </div>
        {character.avatar_url ? (
          <img
            src={character.avatar_url}
            alt={`${character.firstname} ${character.lastname}`}
            className="w-50 h-50 border-3 border-background rounded-full object-cover"
          />
        ) : (
          <div className="w-50 h-50 border-3 border-background bg-gradient-to-br from-foreground to-secondary rounded-full flex items-center justify-center" />
        )}
      </div>
      <CharacterForm character={character} races={races} klasses={klasses} />
      <div className={`text-secondary text-lg mt-20 mb-6 ${roxborough.className}`}>
        {t('Admin.Characters.relationships')}
      </div>
      <CharacterRelationsForm id={id} />
    </div>
  );
}
