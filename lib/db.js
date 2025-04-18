import Knex from 'knex';
import config from './config';

if (!global.knex) {
  global.knex = Knex({
    client: 'pg',
    connection: config.db.url,
    ssl: false,
  });
}

export default global.knex;

