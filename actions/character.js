'use server';

import DATime from "@root/lib/da-time";
import knex from "@root/lib/db";
import getCharacterRelationsQuery from "@root/lib/queries/characters/get-character-relations";
import { getCurrentDate } from "@root/actions/settings";

export async function getCharacterContext(id, date) {
  let contextDate = date;
  if (!date) {
    const date = await getCurrentDate();
    contextDate = date;
  }
  const result = await knex.raw(getCharacterRelationsQuery, [id]);
  const [character] = result?.rows;
  return character;
}
