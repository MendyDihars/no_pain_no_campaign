'use server';

import DATime from "@root/lib/da-time";
import knex from "@root/lib/db";
import getCharacterRelationsQuery from "@root/lib/queries/characters/get-character-relations";

export async function getCurrentDate() {
  const date = await knex.select('context_date').from('settings').where('section', 'general').first();
  return date?.context_date ?? new DATime('9/11/9:31').timestamp;
}

export async function setCurrentDate(date) {
  await knex.update('context_date', date).from('settings').where('section', 'general');
}
