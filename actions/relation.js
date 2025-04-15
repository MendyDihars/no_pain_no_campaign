'use server';

import knex from '@root/lib/db';
import getRelationsFromCharacterQuery from '@root/lib/queries/relations/get-relations-from-character';
import { handle } from './errors';

export async function getRelations(character_id) {
  const result = await handle(knex.raw(getRelationsFromCharacterQuery, [character_id]));
  return { data: result.data?.rows, error: result.error, success: result.success };
}

export async function getRelationTypes() {
  const result = await handle(knex.select('*').from('relationships_types'));
  return result;
}
