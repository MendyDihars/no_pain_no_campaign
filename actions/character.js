'use server';

import { v4 as uuid } from 'uuid';
import knex from "@root/lib/db";
import getCharacterRelationsQuery from "@root/lib/queries/characters/get-character-relations";
import { DEFAULT_DATE } from "@root/lib/decorators/character.helper";
import { handle, policy } from "@root/actions/errors";
import { uploadImage } from "./image";

export async function getCharacters() {
  const result = await handle(knex.select('*').from('characters').orderBy('firstname', 'asc'));
  return result;
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
      'images.url as avatar_url'
    )
    .from('characters')
    .where('characters.id', id)
    .leftJoin('images', 'characters.avatar_id', 'images.id')
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


export async function deleteCharacter(id) {
  const res = await handle(policy());
  if (!res.success) return res;
  const result = await handle(knex.delete().where('id', id).from('characters'));
  return result;
}

export async function upsertCharacter({ character }) {
  const res = await handle(policy());
  if (!res.success) return res;

  if (Array.isArray(character.avatar_id)) {
    const [file] = character.avatar_id;
    const avatarRes = await handle(uploadImage(file));
    character.avatar_id = avatarRes.data?.id;
  }

  if (character.id) {
    const result = await handle(knex.update(character).where('id', character.id).from('characters'));
    return result;
  } else {
    const result = await handle(knex.insert({...character, id: uuid()}).into('characters'));
    return result;
  }
}

export async function updateCharacterBackground({ character_id, klass_id, race_id }) {
  const res = await handle(policy());
  if (!res.success) return res;
  const payload = {};
  if (klass_id) payload.klass_id = klass_id;
  if (race_id) payload.race_id = race_id;
  const result = await handle(
    knex.update(payload).where('character_id', character_id).from('character_backgrounds')
  );
  return result;
}

export async function insertCharacterBackground({ klass_id, race_id, character_id }) {
  const res = await handle(policy());
  if (!res.success) return res;
  const result = await handle(
    knex.insert({ id: uuid(), klass_id, race_id, character_id }).into('character_backgrounds')
  );
  return result;
}
