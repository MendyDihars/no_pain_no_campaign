'use strict';

exports.up = async function(knex) {
  await knex.schema.createTable('characters', (table) => {
    table.uuid('id').primary();
    table.string('firstname', 50).notNullable();
    table.string('lastname', 50);
    table.string('gender', 255);
    table.string('sexual_orientation', 100);
    table.string('origin', 100);
    table.string('avatar', 255);
    table.integer('birthdate');
    table.smallint('size');
    table.smallint('health');
    table.smallint('mana');
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
    table.uuid('character_id').notNullable().references('id').inTable('characters');
    table.uuid('race_id').notNullable().references('id').inTable('races');
    table.uuid('klass_id').notNullable().references('id').inTable('klasses');
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
    table.string('picture', 255);
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
}; 