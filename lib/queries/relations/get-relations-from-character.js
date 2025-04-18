const getRelationsFromCharacterQuery = `
  SELECT
    c.id,
    c.firstname,
    c.lastname,
    c.gender,
    c.birthdate,
    i.url as avatar_url,
    r.recipient_id,
    r.id as relation_id,
    r.starts_at,
    r.type_id,
    rt.name as type_name
  FROM relationships r
  INNER JOIN characters c ON c.id = r.recipient_id
  LEFT JOIN images i ON i.id = c.avatar_id
  LEFT JOIN relationships_types rt ON rt.id = r.type_id
  WHERE r.character_id = ?
  ORDER BY c.firstname, r.starts_at
`;

export default getRelationsFromCharacterQuery;
