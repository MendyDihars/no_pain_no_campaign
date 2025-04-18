const getCharacterRelationsQuery = `
  WITH relation_date AS (
    SELECT
      r.character_id,
      r.recipient_id,
      MAX(r.starts_at) AS starts_at
    FROM relationships r
    WHERE r.character_id = ?
    AND r.starts_at <= ?
    GROUP BY r.character_id, recipient_id
  ), relations AS (
    SELECT
      r.character_id,
      ARRAY_AGG(
        JSON_BUILD_OBJECT(
          'id', c.id,
          'firstname', c.firstname,
          'lastname', c.lastname,
          'gender', c.gender,
          'avatar_url', i.url,
          'birthdate', c.birthdate,
          'relation_name', rt.name,
          'relation_code', rt.code,
          'relation_color', rt.color,
          'relation_icon', rt.icon
        ) ORDER BY c.firstname
      ) AS relations
    FROM relation_date rd
    INNER JOIN relationships r
      ON r.character_id = rd.character_id
      AND r.recipient_id = rd.recipient_id
      AND r.starts_at = rd.starts_at
    LEFT JOIN characters c ON c.id = r.recipient_id
    LEFT JOIN images i ON i.id = c.avatar_id
    LEFT JOIN relationships_types rt ON rt.id = r.type_id
    GROUP BY r.character_id
  )
  SELECT
    c.id,
    c.firstname,
    c.lastname,
    c.gender,
    c.birthdate,
    i.url as avatar_url,
	r.relations
  FROM "characters" c
  LEFT JOIN images i ON c.avatar_id = i.id
  LEFT JOIN relations r ON c.id = r.character_id
  WHERE c.id = ?;
`;

export default getCharacterRelationsQuery;
