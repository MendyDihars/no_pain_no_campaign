const getRelationsFromCharacterQuery = `
  SELECT
    c.id,
    c.firstname,
    c.lastname,
    c.gender,
    c.birthdate,
    r.recipient_id,
    ARRAY_AGG(
      JSON_BUILD_OBJECT(
        'starts_at', r.starts_at,
        'type', rt.name,
        'type_id', rt.id
      ) ORDER BY r.starts_at ASC
    ) AS relations
  FROM relationships r
  INNER JOIN characters c ON c.id = r.recipient_id
  INNER JOIN relationships_types rt ON rt.id = r.type_id
  WHERE r.character_id = ?
  GROUP BY c.id, c.firstname, c.lastname, c.gender, c.birthdate, r.recipient_id
  ORDER BY c.firstname
`;

export default getRelationsFromCharacterQuery;
