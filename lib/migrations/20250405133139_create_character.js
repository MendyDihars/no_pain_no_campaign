'use strict';

exports.up = async function(knex) {
  await knex.schema.createTable('images', (table) => {
    table.uuid('id').primary();
    table.text('url').notNullable();
    table.text('checksum').notNullable();
    table.timestamps(true, true);
  });

  // BETTER AUTH TABLES

  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('email', 100).notNullable();
    table.string('name', 100).notNullable();
    table.boolean('email_verified', 255).default(false);
    table.string('image', 255);
    table.string('role', 100).default('user');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('sessions', (table) => {
    table.uuid('id').primary();
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('token', 100).notNullable();
    table.timestamp('expires_at').notNullable();
    table.string('ip_address', 50).notNullable();
    table.string('user_agent', 255).notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('accounts', (table) => {
    table.uuid('id').primary();
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('account_id', 255).notNullable();
    table.string('provider_id', 255).notNullable();
    table.string('access_token', 255);
    table.string('refresh_token', 255);
    table.timestamp('access_token_expires_at');
    table.timestamp('refresh_token_expires_at');
    table.string('scope', 255);
    table.string('id_token', 255);
    table.string('password', 255);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('verifications', (table) => {
    table.uuid('id').primary();
    table.string('identifier', 255).notNullable();
    table.string('value', 255).notNullable();
    table.timestamp('expires_at').notNullable();
    table.timestamps(true, true);
  });
  

  // CHARACTERS

  await knex.schema.createTable('characters', (table) => {
    table.uuid('id').primary();
    table.string('firstname', 50).notNullable();
    table.string('lastname', 50);
    table.string('gender', 255);
    table.string('sexual_orientation', 100);
    table.string('origin', 100);
    table.uuid('avatar_id').references('id').inTable('images').onDelete('SET NULL');
    table.uuid('card_id').references('id').inTable('images').onDelete('SET NULL');
    table.integer('birthdate');
    table.smallint('size');
    table.smallint('health');
    table.smallint('mana');
    table.boolean('main').default(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('races', (table) => {
    table.uuid('id').primary();
    table.string('name', 75).notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('klasses', (table) => {
    table.uuid('id').primary();
    table.string('name', 75);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('character_backgrounds', (table) => {
    table.uuid('id').primary();
    table.uuid('character_id').unique().notNullable().references('id').inTable('characters').onDelete('CASCADE');
    table.uuid('race_id').notNullable().references('id').inTable('races').onDelete('CASCADE');
    table.uuid('klass_id').notNullable().references('id').inTable('klasses').onDelete('CASCADE');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('countries', (table) => {
    table.uuid('id').primary();
    table.string('name', 75).notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('places', (table) => {
    table.uuid('id').primary();
    table.string('name', 75).notNullable();
    table.uuid('country_id').references('id').inTable('countries').onDelete('SET NULL');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('events', (table) => {
    table.uuid('id').primary();
    table.string('name', 255).notNullable();
    table.text('description');
    table.integer('date').notNullable();
    table.uuid('picture_id').references('id').inTable('images').onDelete('SET NULL');
    table.uuid('place_id').references('id').inTable('places').onDelete('SET NULL');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('relationships_types', (table) => {
    table.uuid('id').primary();
    table.string('color', 25).notNullable();
    table.string('name', 100).notNullable();
    table.string('code', 100).notNullable();
    table.string('icon', 50).notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('relationships', (table) => {
    table.uuid('id').primary();
    table.uuid('type_id').references('id').inTable('relationships_types').onDelete('SET NULL');
    table.integer('starts_at');
    table.uuid('character_id').references('id').inTable('characters').onDelete('CASCADE');
    table.uuid('recipient_id').references('id').inTable('characters').onDelete('CASCADE');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('groups', (table) => {
    table.uuid('id').primary();
    table.string('name', 100).notNullable();
    table.string('logo', 255);
    table.text('description');
    table.uuid('place_id').references('id').inTable('places').onDelete('SET NULL');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('character_groups', (table) => {
    table.uuid('id').primary();
    table.uuid('character_id').references('id').inTable('characters').onDelete('CASCADE');
    table.uuid('group_id').references('id').inTable('groups').onDelete('CASCADE');
    table.integer('starts_at');
    table.integer('ends_at');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('settings', (table) => {
    table.uuid('id').primary();
    table.integer('context_date');
    table.string('section', 50);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('specializations', (table) => {
    table.uuid('id').primary();
    table.uuid('klass_id').references('id').inTable('klasses').onDelete('CASCADE');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('character_levels', (table) => {
    table.uuid('id').primary();
    table.smallint('level').notNullable();
    table.uuid('character_id').references('id').inTable('characters').onDelete('CASCADE');
    table.integer('starts_at');
    table.uuid('specialization_id').references('id').inTable('specializations').onDelete('SET NULL');
    table.timestamps(true, true);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('character_levels');
  await knex.schema.dropTable('specializations');
  await knex.schema.dropTable('settings');
  await knex.schema.dropTable('character_groups');
  await knex.schema.dropTable('groups');
  await knex.schema.dropTable('relationships');
  await knex.schema.dropTable('relationships_types');
  await knex.schema.dropTable('events');
  await knex.schema.dropTable('places');
  await knex.schema.dropTable('countries');
  await knex.schema.dropTable('character_backgrounds');
  await knex.schema.dropTable('klasses');
  await knex.schema.dropTable('races');
  await knex.schema.dropTable('characters');
  await knex.schema.dropTable('verifications');
  await knex.schema.dropTable('accounts');
  await knex.schema.dropTable('sessions');
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('images');
}; 