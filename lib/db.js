import Knex from 'knex';
import config from './config';

const knex = Knex({
  client: 'pg',
  connection: config.db.url,
  ssl: false,
});

export const DB = {
  characters: knex('characters'),
  races: knex('races'),
  klasses: knex('klasses'),
  character_backgrounds: knex('character_backgrounds'),
  events: knex('events'),
  relationships_types: knex('relationships_types'),
  relationships: knex('relationships'),
  groups: knex('groups'),
  character_groups: knex('character_groups'),
  settings: knex('settings'),
  specializations: knex('specializations'),
  character_levels: knex('character_levels'),
  countries: knex('countries'),
  places: knex('places'),
};

export default knex;

