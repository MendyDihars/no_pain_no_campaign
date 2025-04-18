'use server';

import { getTranslations } from 'next-intl/server';
import { v4 as uuid } from 'uuid';
import knex from '@root/lib/db';
import getRelationsFromCharacterQuery from '@root/lib/queries/relations/get-relations-from-character';
import { handle } from './errors';

export async function getRelations(character_id) {
  const result = await handle(knex.raw(getRelationsFromCharacterQuery, [character_id]));
  return { data: result.data?.rows, error: result.error, success: result.success };
}

export async function getRelationTypes() {
  const result = await handle(knex.select('*').from('relationships_types').orderBy('name', 'asc'));
  return result;
}

export async function updateRelation(relation) {
  const res = await handle(knex.update(relation).where('id', relation.id).from('relationships'));
  return res;
}

export async function createRelation(relation) {
  const id = uuid();
  const res = await handle(knex.insert({ ...relation, id }).into('relationships'));
  return { data: { id, ...relation }, error: res.error, success: res.success };
}

export async function deleteRelation(relation_id) {
  const res = await handle(knex.delete().from('relationships').where('id', relation_id));
  return res;
}

export async function copyRelation(relation_id) {
  const t = await getTranslations();
  const relation = await knex.select('*').from('relationships').where('id', relation_id).first();
  const existing = await knex
    .select('id')
    .from('relationships')
    .where('character_id', relation.recipient_id)
    .andWhere('recipient_id', relation.character_id)
    .andWhere('starts_at', relation.starts_at)
    .first();
  if (existing) return { error: t('Errors.RelationAlreadyExists'), success: false };
  const res = await handle(
    knex.insert({
      ...relation,
      id: uuid(),
      character_id: relation.recipient_id,
      recipient_id: relation.character_id,
      created_at: new Date(),
      updated_at: new Date(),
    }).into('relationships')
  );
  return { data: { ok: true }, error: res.error, success: res.success };
}
