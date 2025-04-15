'use client';

import CircleCharacter from "@root/components/CircleCharacter";
import { getFullname } from "@root/lib/decorators/character.helper";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";

export default function Characters({ characters, prefixTo }) {
  const t = useTranslations();

  function handleClick(id) {
    redirect(`${prefixTo ?? '/links'}/${id}`);
  }

  return (
    <div className="flex justify-start lg:justify-center">
      <div className="flex flex-wrap gap-12">
        {characters.map((character) => (
          <CircleCharacter
            prefixTo={prefixTo}
            key={character.id}
            name={getFullname(character)}
            id={character.id}
            avatar_url={character.avatar_url}
          />
        ))}
        <CircleCharacter isNew name={t('Admin.Characters.new')} id="new" onClick={handleClick} />
      </div>
    </div>
  );
}

