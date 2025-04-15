'use server';

import knex from '@root/lib/db';
import { handle, policy } from './errors';

export async function getRelations(character_id) {
  const result = await handle(
    knex
      .select('relationships.*', 'characters.firstname', 'characters.lastname', 'relationships_types.name as type')
      .from('relationships')
      .leftJoin('characters', 'relationships.recipient_id', 'characters.id')
      .leftJoin('relationships_types', 'relationships.type_id', 'relationships_types.id')
      .where('character_id', character_id)
  );
  return result;
}










