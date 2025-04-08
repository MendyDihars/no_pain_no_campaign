const getCharacterRelationsQuery = `
  WITH relations AS (
    SELECT
      r.character_id,
      ARRAY_AGG(
        JSON_BUILD_OBJECT(
          'id', c.id,
          'firstname', c.firstname,
          'lastname', c.lastname,
          'gender', c.gender,
          'birthdate', c.birthdate,
          'relation_name', rt.name,
          'relation_code', rt.code,
          'relation_color', rt.color,
          'relation_icon', rt.icon
        ) ORDER BY c.firstname
      ) AS relations
    FROM relationships r
    LEFT JOIN characters c ON c.id = r.recipient_id
    LEFT JOIN relationships_types rt ON rt.id = r.type_id
    WHERE r.character_id = ?
    GROUP BY r.character_id
  )
  SELECT
    c.id,
    c.firstname,
    c.lastname,
    c.gender,
    c.birthdate,
    r.relations
  FROM relations r
  INNER JOIN characters c ON c.id = r.character_id
`;

export default getCharacterRelationsQuery;
