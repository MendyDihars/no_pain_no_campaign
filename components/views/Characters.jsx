import CircleCharacter from "@root/components/CircleCharacter";
import { getFullname } from "@root/lib/decorators/character.helper";

export default function Characters({ characters, prefixTo }) {
  return (
    <div className="flex justify-start lg:justify-center">
      <div className="flex flex-wrap gap-12">
        {characters.map((character) => (
          <CircleCharacter prefixTo={prefixTo} key={character.id} name={getFullname(character)} id={character.id} />
        ))}
      </div>
    </div>
  );
}

