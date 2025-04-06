// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  client: 'postgresql',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
  },
  migrations: {
    directory: './lib/migrations',
  },
  seeds: {
    directory: './lib/seeders',
  },
};
