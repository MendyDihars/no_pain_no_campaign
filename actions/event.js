'use server';

import knex from '@root/lib/db';

export async function getEvents() {
  const events = await knex.select('*').from('events').orderBy('date', 'asc');
  return events ?? [];
}



