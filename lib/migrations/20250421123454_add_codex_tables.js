'use strict';

module.exports.up = async (knex) => {
  await knex.raw(`
    CREATE EXTENSION IF NOT EXISTS unaccent;
  `);

  await knex.schema.createTable('codex_categories', (table) => {
    table.uuid('id').primary();
    table.string('name', 255).notNullable().index();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('codex', (table) => {
    table.uuid('id').primary();
    table.string('title', 255).notNullable().index();
    table.uuid('category_id').references('id').inTable('codex_categories').onDelete('SET NULL');
    table.text('content');
    table.uuid('previous_id').references('id').inTable('codex').onDelete('SET NULL');
    table.boolean('active').defaultTo(true);
    table.specificType('search_vector', 'tsvector');
    table.timestamps(true, true);
  });

  await knex.raw(`
    CREATE INDEX search_vector_codex_idx ON codex USING GIN (search_vector);
  `);
  
  await knex.raw(`
    CREATE OR REPLACE FUNCTION codex_search_vector_trigger() RETURNS trigger AS $$
    BEGIN
      NEW.search_vector := to_tsvector('french', unaccent(coalesce(NEW.title, '')));
      RETURN NEW;
    END
    $$ LANGUAGE plpgsql;
  `);

  await knex.raw(`
    UPDATE codex SET search_vector = to_tsvector('french', unaccent(coalesce(title, '')));
  `);

  await knex.raw(`
    CREATE TRIGGER codex_search_vector_trigger
    BEFORE INSERT OR UPDATE ON codex
    FOR EACH ROW EXECUTE PROCEDURE codex_search_vector_trigger();
  `);

  // Create missing indexes

  await knex.schema.alterTable('characters', (table) => {
    table.index('firstname');
    table.index('lastname');
    table.uuid('card_picture_id').references('id').inTable('images').onDelete('SET NULL');
    table.specificType('search_vector', 'tsvector');
  });

  await knex.raw(`
    CREATE INDEX search_vector_characters_idx ON characters USING GIN (search_vector);
  `);
  
  await knex.raw(`
    CREATE OR REPLACE FUNCTION characters_search_vector_trigger() RETURNS trigger AS $$
    BEGIN
      NEW.search_vector := to_tsvector('french', unaccent(coalesce(NEW.firstname, '') || ' ' || coalesce(NEW.lastname, '')));
      RETURN NEW;
    END
    $$ LANGUAGE plpgsql;
  `);

  await knex.raw(`
    UPDATE characters SET search_vector = to_tsvector('french', unaccent(coalesce(firstname, '') || ' ' || coalesce(lastname, '')));
  `);
  
  await knex.raw(`
    CREATE TRIGGER characters_search_vector_trigger
    BEFORE INSERT OR UPDATE ON characters
    FOR EACH ROW EXECUTE PROCEDURE characters_search_vector_trigger();
  `);

  await knex.schema.alterTable('groups', (table) => {
    table.index('name');
    table.specificType('search_vector', 'tsvector');
  });

  await knex.raw(`
    CREATE INDEX search_vector_groups_idx ON groups USING GIN (search_vector);
  `);

  await knex.raw(`
    CREATE OR REPLACE FUNCTION groups_search_vector_trigger() RETURNS trigger AS $$
    BEGIN
      NEW.search_vector := to_tsvector('french', unaccent(coalesce(NEW.name, '')));
      RETURN NEW;
    END
    $$ LANGUAGE plpgsql;
  `);

  await knex.raw(`
    UPDATE groups SET search_vector = to_tsvector('french', unaccent(coalesce(name, '')));
  `);

  await knex.raw(`
    CREATE TRIGGER groups_search_vector_trigger
    BEFORE INSERT OR UPDATE ON groups
    FOR EACH ROW EXECUTE PROCEDURE groups_search_vector_trigger();
  `);

  await knex.schema.alterTable('places', (table) => {
    table.index('name');
    table.specificType('search_vector', 'tsvector');
  });

  await knex.raw(`
    CREATE INDEX search_vector_places_idx ON places USING GIN (search_vector);
  `);

  await knex.raw(`
    CREATE OR REPLACE FUNCTION places_search_vector_trigger() RETURNS trigger AS $$
    BEGIN
      NEW.search_vector := to_tsvector('french', unaccent(coalesce(NEW.name, '')));
      RETURN NEW;
    END
    $$ LANGUAGE plpgsql;
  `);

  await knex.raw(`
    UPDATE places SET search_vector = to_tsvector('french', unaccent(coalesce(name, '')));
  `);

  await knex.raw(`
    CREATE TRIGGER places_search_vector_trigger
    BEFORE INSERT OR UPDATE ON places
    FOR EACH ROW EXECUTE PROCEDURE places_search_vector_trigger();
  `);
  
  await knex.schema.alterTable('races', (table) => {
    table.index('name');
    table.specificType('search_vector', 'tsvector');
  });

  await knex.raw(`
    CREATE INDEX search_vector_races_idx ON races USING GIN (search_vector);
  `);

  await knex.raw(`
    CREATE OR REPLACE FUNCTION races_search_vector_trigger() RETURNS trigger AS $$
    BEGIN
      NEW.search_vector := to_tsvector('french', unaccent(coalesce(NEW.name, '')));
      RETURN NEW;
    END
    $$ LANGUAGE plpgsql;
  `);

  await knex.raw(`
    UPDATE races SET search_vector = to_tsvector('french', unaccent(coalesce(name, '')));
  `);

  await knex.raw(`
    CREATE TRIGGER races_search_vector_trigger
    BEFORE INSERT OR UPDATE ON races
    FOR EACH ROW EXECUTE PROCEDURE races_search_vector_trigger();
  `);
  
  await knex.schema.alterTable('klasses', (table) => {
    table.index('name');
    table.specificType('search_vector', 'tsvector');
  });

  await knex.raw(`
    CREATE INDEX search_vector_klasses_idx ON klasses USING GIN (search_vector);
  `);

  await knex.raw(`
    CREATE OR REPLACE FUNCTION klasses_search_vector_trigger() RETURNS trigger AS $$
    BEGIN
      NEW.search_vector := to_tsvector('french', unaccent(coalesce(NEW.name, '')));
      RETURN NEW;
    END
    $$ LANGUAGE plpgsql;
  `);

  await knex.raw(`
    UPDATE klasses SET search_vector = to_tsvector('french', unaccent(coalesce(name, '')));
  `);

  await knex.raw(`
    CREATE TRIGGER klasses_search_vector_trigger
    BEFORE INSERT OR UPDATE ON klasses
    FOR EACH ROW EXECUTE PROCEDURE klasses_search_vector_trigger();
  `);

  await knex.schema.alterTable('countries', (table) => {
    table.index('name');
    table.specificType('search_vector', 'tsvector');
  });

  await knex.raw(`
    CREATE INDEX search_vector_countries_idx ON countries USING GIN (search_vector);
  `);

  await knex.raw(`
    CREATE OR REPLACE FUNCTION countries_search_vector_trigger() RETURNS trigger AS $$
    BEGIN
      NEW.search_vector := to_tsvector('french', unaccent(coalesce(NEW.name, '')));
      RETURN NEW;
    END
    $$ LANGUAGE plpgsql;
  `);

  await knex.raw(`
    UPDATE countries SET search_vector = to_tsvector('french', unaccent(coalesce(name, '')));
  `);

  await knex.raw(`
    CREATE TRIGGER countries_search_vector_trigger
    BEFORE INSERT OR UPDATE ON countries
    FOR EACH ROW EXECUTE PROCEDURE countries_search_vector_trigger();
  `);

  await knex.schema.alterTable('events', (table) => {
    table.index('name');
    table.specificType('search_vector', 'tsvector');
  });

  await knex.raw(`
    CREATE INDEX search_vector_events_idx ON events USING GIN (search_vector);
  `);

  await knex.raw(`
    CREATE OR REPLACE FUNCTION events_search_vector_trigger() RETURNS trigger AS $$
    BEGIN
      NEW.search_vector := to_tsvector('french', unaccent(coalesce(NEW.name, '')));
      RETURN NEW;
    END
    $$ LANGUAGE plpgsql;
  `);

  await knex.raw(`
    UPDATE events SET search_vector = to_tsvector('french', unaccent(coalesce(name, '')));
  `);

  await knex.raw(`
    CREATE TRIGGER events_search_vector_trigger
    BEFORE INSERT OR UPDATE ON events
    FOR EACH ROW EXECUTE PROCEDURE events_search_vector_trigger();
  `);

  await knex.schema.createTable('codex_has_resources', (table) => {
    table.uuid('id').primary();
    table.uuid('codex_id').index().notNullable();
    table.uuid('resource_id').index().notNullable();
    table.string('type', 255).notNullable();
    table.timestamps(true, true);
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('codex_has_resources');

  await knex.raw(`
    DROP TRIGGER IF EXISTS codex_search_vector_trigger ON codex;
    DROP FUNCTION IF EXISTS codex_search_vector_trigger();
  `);

  await knex.raw(`
    DROP TRIGGER IF EXISTS characters_search_vector_trigger ON characters;
    DROP FUNCTION IF EXISTS characters_search_vector_trigger();
  `);

  await knex.raw(`
    DROP TRIGGER IF EXISTS groups_search_vector_trigger ON groups;
    DROP FUNCTION IF EXISTS groups_search_vector_trigger();
  `);

  await knex.raw(`
    DROP TRIGGER IF EXISTS places_search_vector_trigger ON places;
    DROP FUNCTION IF EXISTS places_search_vector_trigger();
  `);

  await knex.raw(`
    DROP TRIGGER IF EXISTS races_search_vector_trigger ON races;
    DROP FUNCTION IF EXISTS races_search_vector_trigger();
  `);

  await knex.raw(`
    DROP TRIGGER IF EXISTS klasses_search_vector_trigger ON klasses;
    DROP FUNCTION IF EXISTS klasses_search_vector_trigger();
  `);

  await knex.raw(`
    DROP TRIGGER IF EXISTS countries_search_vector_trigger ON countries;
    DROP FUNCTION IF EXISTS countries_search_vector_trigger();
  `);

  await knex.raw(`
    DROP TRIGGER IF EXISTS events_search_vector_trigger ON events;
    DROP FUNCTION IF EXISTS events_search_vector_trigger();
  `);

  await knex.schema.alterTable('characters', (table) => {
    table.dropIndex('firstname');
    table.dropIndex('lastname');
    table.dropColumn('card_picture_id');
    table.dropColumn('search_vector');
  });

  await knex.raw(`
    DROP INDEX IF EXISTS search_vector_characters_idx;
  `);

  await knex.schema.alterTable('groups', (table) => {
    table.dropIndex('name');
    table.dropColumn('search_vector');
  });

  await knex.raw(`
    DROP INDEX IF EXISTS search_vector_groups_idx;
  `);

  await knex.schema.alterTable('places', (table) => {
    table.dropIndex('name');
    table.dropColumn('search_vector');
  });

  await knex.raw(`
    DROP INDEX IF EXISTS search_vector_places_idx;
  `);

  await knex.schema.alterTable('races', (table) => {
    table.dropIndex('name');
    table.dropColumn('search_vector');
  });

  await knex.raw(`
    DROP INDEX IF EXISTS search_vector_races_idx;
  `);

  await knex.schema.alterTable('klasses', (table) => {
    table.dropIndex('name');
    table.dropColumn('search_vector');
  });

  await knex.raw(`
    DROP INDEX IF EXISTS search_vector_klasses_idx;
  `);

  await knex.schema.alterTable('countries', (table) => {
    table.dropIndex('name');
    table.dropColumn('search_vector');
  });

  await knex.raw(`
    DROP INDEX IF EXISTS search_vector_countries_idx;
  `);

  await knex.schema.alterTable('events', (table) => {
    table.dropIndex('name');
    table.dropColumn('search_vector');
  });

  await knex.raw(`
    DROP INDEX IF EXISTS search_vector_events_idx;
  `);

  await knex.schema.dropTable('codex');

  await knex.schema.dropTable('codex_categories');
};
