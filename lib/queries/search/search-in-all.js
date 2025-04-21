export const searchInAll = `
  WITH query AS (
    SELECT to_tsquery('french', unaccent(?)) AS q
  )

  SELECT id, 'codex' AS source, title, ts_rank_cd(search_vector, query.q) AS rank
  FROM codex, query
  WHERE codex.search_vector @@ query.q

  UNION ALL

  SELECT id, 'character' AS source, firstname || ' ' || lastname AS title, ts_rank_cd(search_vector, query.q)
  FROM characters, query
  WHERE characters.search_vector @@ query.q

  UNION ALL

  SELECT id, 'group' AS source, name AS title, ts_rank_cd(search_vector, query.q)
  FROM groups, query
  WHERE groups.search_vector @@ query.q

  UNION ALL

  SELECT id, 'place' AS source, name AS title, ts_rank_cd(search_vector, query.q)
  FROM places, query
  WHERE places.search_vector @@ query.q

  UNION ALL

  SELECT id, 'race' AS source, name AS title, ts_rank_cd(search_vector, query.q)
  FROM races, query
  WHERE races.search_vector @@ query.q

  UNION ALL

  SELECT id, 'klass' AS source, name AS title, ts_rank_cd(search_vector, query.q)
  FROM klasses, query
  WHERE klasses.search_vector @@ query.q

  UNION ALL

  SELECT id, 'country' AS source, name AS title, ts_rank_cd(search_vector, query.q)
  FROM countries, query
  WHERE countries.search_vector @@ query.q

  UNION ALL

  SELECT id, 'event' AS source, name AS title, ts_rank_cd(search_vector, query.q)
  FROM events, query
  WHERE events.search_vector @@ query.q

  ORDER BY rank DESC
  LIMIT 30;
`;
