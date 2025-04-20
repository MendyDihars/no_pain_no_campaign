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
  ), _groups AS (
    SELECT
      rd.character_id,
      rd.recipient_id,
      rd.starts_at,
      ARRAY_AGG(
        JSON_BUILD_OBJECT(
          'id', g.id,
          'name', g.name,
          'logo', g.logo
        ) ORDER BY g.name
      ) AS groups
    FROM relation_date rd
    LEFT JOIN character_groups cg ON cg.character_id = rd.recipient_id
    LEFT JOIN groups g ON g.id = cg.group_id
    GROUP BY rd.character_id, rd.recipient_id, rd.starts_at
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
          'relation_icon', rt.icon,
          'groups', g.groups
        ) ORDER BY c.firstname
      ) AS relations
    FROM _groups g
    INNER JOIN relationships r
      ON r.character_id = g.character_id
      AND r.recipient_id = g.recipient_id
      AND r.starts_at = g.starts_at
    LEFT JOIN characters c ON c.id = r.recipient_id
    LEFT JOIN images i ON i.id = c.avatar_id
    LEFT JOIN relationships_types rt ON rt.id = r.type_id
    GROUP BY r.character_id
  ), main_character_groups AS (
    SELECT
      cg.character_id,
      ARRAY_AGG(
        JSON_BUILD_OBJECT(
          'id', g.id,
          'name', g.name,
          'logo', g.logo
        ) ORDER BY g.name
      ) AS "groups"
    FROM groups g
    INNER JOIN character_groups cg ON cg.group_id = g.id
      AND cg.character_id = ?
    GROUP BY cg.character_id
  )
  SELECT
    c.id,
    c.firstname,
    c.lastname,
    c.gender,
    c.birthdate,
    i.url as avatar_url,
	  r.relations,
    mcg.groups as groups
  FROM "characters" c
  LEFT JOIN images i ON c.avatar_id = i.id
  LEFT JOIN relations r ON c.id = r.character_id
  LEFT JOIN main_character_groups mcg ON mcg.character_id = c.id  
  WHERE c.id = ?;
`;

export default getCharacterRelationsQuery;
