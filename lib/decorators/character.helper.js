import DATime from "@root/lib/da-time";

export function getFullname(character) {
  if (!character) return '';
  if (!character.lastname) return character.firstname;
  return `${character.firstname} ${character.lastname}`;
}

export function getInitials(character) {
  if (!character) return '';
  if (!character.lastname) return character.firstname[0];
  return `${character.firstname[0]}${character.lastname[0]}`;
}

export const DEFAULT_DATE = new DATime('18/08/9:31').timestamp;
