'use server';

import knex from "@root/lib/db";
import getCharacterRelationsQuery from "@root/lib/queries/characters/get-character-relations";
import { DEFAULT_DATE } from "@root/lib/decorators/character.helper";
import { getUser } from "@root/lib/user";
import ActionError from "@root/lib/ActionError";

async function policy() {
  const user = await getUser();
  if (!user || !user.role !== 'admin') throw new ActionError('Unauthorized', 'Unauthorized');
}

export async function getCharacter(id) {
  const result = await knex.select('*').from('characters').where('id', id).first();
  return result;
}

export async function getFullCharacter(id) {
  const result = await knex
    .select(
      'characters.*',
      'races.name as race',
      'klasses.name as klass',
      'races.id as race_id',
      'klasses.id as klass_id',
    )
    .from('characters')
    .where('characters.id', id)
    .leftJoin('character_backgrounds', 'characters.id', 'character_backgrounds.character_id')
    .leftJoin('races', 'character_backgrounds.race_id', 'races.id')
    .leftJoin('klasses', 'character_backgrounds.klass_id', 'klasses.id')
    .first();
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


// CRUD

export async function createCharacter(character) {
  const res = await handle(policy());
  if (!res.success) return res;
  const result = await handle(knex.insert(character).into('characters'));
  return result;
}

export async function updateCharacter(id, character) {
  const res = await handle(policy());
  if (!res.success) return res;
  const result = await handle(knex.update(character).where('id', id).from('characters'));
  return result;
}

export async function deleteCharacter(id) {
  const res = await handle(policy());
  if (!res.success) return res;
  const result = await handle(knex.delete().where('id', id).from('characters'));
  return result;
}