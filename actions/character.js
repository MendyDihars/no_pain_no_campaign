'use server';

import DATime from "@root/lib/da-time";
import knex from "@root/lib/db";
import getCharacterRelationsQuery from "@root/lib/queries/characters/get-character-relations";
import { DEFAULT_DATE } from "@root/lib/decorators/character.helper";

export async function getCharacter(id) {
  const result = await knex.select('*').from('characters').where('id', id).first();
  return result;
}

export async function getCharacterContext(id, date) {
  let contextDate = date;
  if (!date) {
    contextDate = DEFAULT_DATE;
  }
  const result = await knex.raw(getCharacterRelationsQuery, [id, contextDate, id]);
  const [character] = result?.rows;
  return character;
}
