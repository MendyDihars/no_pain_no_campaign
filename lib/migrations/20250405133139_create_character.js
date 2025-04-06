'use strict';

exports.up = async function(knex) {
  await knex.schema.createTable('characters', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('firstname').notNullable();
    table.string('lastname');
    table.string('race').notNullable();
    table.string('klass').notNullable();
    table.string('height');
    table.string('gender').notNullable();
    table.string('avatar');
    table.string('sexual_orientation').notNullable();
    table.integer('health').notNullable();
    table.integer('mana');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('character_progresses', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('character_id').notNullable()
      .references('id')
      .inTable('characters')
      .onDelete('CASCADE');
    table.integer('level').defaultTo(1);
    table.integer('age');
    table.string('status');
    table.timestamps(true, true);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('character_progresses');
  await knex.schema.dropTable('characters');
}; 