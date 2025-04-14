'use server';

import knex from "@root/lib/db";

export async function getRaces() {
  const result = await knex.select('*').from('races');
  return result;
}

export async function getKlasses() {
  const result = await knex.select('*').from('klasses');
  return result;
}
