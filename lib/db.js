import Knex from 'knex';
import config from './config';

const knex = Knex({
  client: 'pg',
  connection: config.db.url,
  ssl: false,
});

export default knex;

