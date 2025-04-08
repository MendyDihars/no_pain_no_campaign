const { v4: uuidv4 } = require('uuid');
const { default: XDate } = require('../date');

module.exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('character_levels').del();
  await knex('specializations').del();
  await knex('settings').del();
  await knex('character_groups').del();
  await knex('groups').del();
  await knex('relationships').del();
  await knex('relationships_types').del();
  await knex('events').del();
  await knex('places').del();
  await knex('countries').del();
  await knex('character_backgrounds').del();
  await knex('klasses').del();
  await knex('races').del();
  await knex('characters').del();

  const races = [
    { id: uuidv4(), name: 'Humain' },
    { id: uuidv4(), name: 'Kossith' },
    { id: uuidv4(), name: 'Elfe' },
    { id: uuidv4(), name: 'Demi-Elfe' },
    { id: uuidv4(), name: 'Nain' },
    { id: uuidv4(), name: 'Demi-Kossith' },
  ];
  const racesMap = new Map(races.map((race) => [race.name, race.id]));
  await knex('races').insert(races);

  const countries = [
    { id: uuidv4(), name: 'Orlaïs' },
    { id: uuidv4(), name: 'Ferelden' },
    { id: uuidv4(), name: 'Tévinter' },
    { id: uuidv4(), name: 'Riveïn' },
    { id: uuidv4(), name: 'Par Vollen' },
    { id: uuidv4(), name: 'Marches Libres' },
    { id: uuidv4(), name: 'Anderfels' },
    { id: uuidv4(), name: 'Tréfonds' },
    { id: uuidv4(), name: 'Séhéron' },
    { id: uuidv4(), name: 'Névarra' },
    { id: uuidv4(), name: 'Antiva' },
  ]
  const countriesMap = new Map(countries.map((country) => [country.name, country.id]));

  await knex('countries').insert(countries);

  const places = [
    { id: uuidv4(), name: 'Val Royeaux', country_id: countriesMap.get('Orlaïs') },
    { id: uuidv4(), name: 'Val Foret', country_id: countriesMap.get('Orlaïs') },
    { id: uuidv4(), name: 'Val Chevin', country_id: countriesMap.get('Orlaïs') },
    { id: uuidv4(), name: 'Val Firmin', country_id: countriesMap.get('Orlaïs') },
    { id: uuidv4(), name: 'Halamshiral', country_id: countriesMap.get('Orlaïs') },
    { id: uuidv4(), name: 'Montsimmard', country_id: countriesMap.get('Orlaïs') },
    { id: uuidv4(), name: 'La Dalatie', country_id: countriesMap.get('Orlaïs') },
    { id: uuidv4(), name: 'Dénérim', country_id: countriesMap.get('Ferelden') },
    { id: uuidv4(), name: 'Lothering', country_id: countriesMap.get('Ferelden') },
    { id: uuidv4(), name: 'Forêt de Bréciliane', country_id: countriesMap.get('Ferelden') },
    { id: uuidv4(), name: 'Terres sauvages de Korcari', country_id: countriesMap.get('Ferelden') },
    { id: uuidv4(), name: 'Lac Calenhad', country_id: countriesMap.get('Ferelden') },
    { id: uuidv4(), name: 'Ostagar', country_id: countriesMap.get('Ferelden') },
    { id: uuidv4(), name: 'Orzammar', country_id: countriesMap.get('Ferelden') },
    { id: uuidv4(), name: 'Golefalois', country_id: countriesMap.get('Ferelden') },
    { id: uuidv4(), name: 'Gwaren', country_id: countriesMap.get('Ferelden') },
    { id: uuidv4(), name: 'Darse', country_id: countriesMap.get('Ferelden') },
    { id: uuidv4(), name: 'Amaranthine', country_id: countriesMap.get('Ferelden') },
    { id: uuidv4(), name: 'Kirkwall', country_id: countriesMap.get('Marches Libres') },
    { id: uuidv4(), name: 'Ostwick', country_id: countriesMap.get('Marches Libres') },
    { id: uuidv4(), name: 'Markham', country_id: countriesMap.get('Marches Libres') },
    { id: uuidv4(), name: 'Minrathie', country_id: countriesMap.get('Tévinter') },
    { id: uuidv4(), name: 'Val Dorma', country_id: countriesMap.get('Tévinter') },
    { id: uuidv4(), name: 'The High Reaches', country_id: countriesMap.get('Tévinter') },
    { id: uuidv4(), name: 'Dairsmuid', country_id: countriesMap.get('Riveïn') },
    { id: uuidv4(), name: 'Kont-Arr', country_id: countriesMap.get('Riveïn') },
    { id: uuidv4(), name: 'Llomerynn', country_id: countriesMap.get('Riveïn') },
    { id: uuidv4(), name: 'Clan dalatien Rivénien', country_id: countriesMap.get('Riveïn') },
    { id: uuidv4(), name: 'Tréviso', country_id: countriesMap.get('Antiva') },
    { id: uuidv4(), name: 'Forêt d\'Arlathan', country_id: countriesMap.get('Antiva') },
    { id: uuidv4(), name: 'Hossberg', country_id: countriesMap.get('Anderfels') },
    { id: uuidv4(), name: 'Névarra', country_id: countriesMap.get('Névarra') },
    { id: uuidv4(), name: 'Nécropole', country_id: countriesMap.get('Névarra') },
  ];
  const placesMap = new Map(places.map((place) => [place.name, place.id]));

  await knex('places').insert(places);

  const klasses = [
    { id: uuidv4(), name: 'Mage' },
    { id: uuidv4(), name: 'Voleur' },
    { id: uuidv4(), name: 'Guerrier' },
    { id: uuidv4(), name: 'Citoyen' },
  ];
  const klassesMap = new Map(klasses.map((klass) => [klass.name, klass.id]));
  await knex('klasses').insert(klasses);

  const characters = [
    {
      id: uuidv4(),
      firstname: 'Maël',
      lastname: 'Klein',
      gender: 'Homme',
      size: 170,
      sexual_orientation: 'Hétéroromantique & Bisexuel',
      health: 72,
      mana: 69,
      birthdate: new XDate('19/11/9:05').timestamp,
    },
    {
      id: uuidv4(),
      firstname: 'Tendaji',
      lastname: 'Maathaï',
      size: 185,
      gender: 'Homme',
      sexual_orientation: 'Inconnu',
      health: 37,
      birthdate: new XDate('10/02/9:07').timestamp,
    },
    {
      id: uuidv4(),
      firstname: 'Gurhok',
      size: 200,
      gender: 'Homme',
      sexual_orientation: 'Bisexuel',
      health: 82,
      birthdate: new XDate('20/02/8:92').timestamp,
    },
    {
      id: uuidv4(),
      firstname: 'Exilwyn',
      lastname: 'Agatar',
      size: 148,
      gender: 'Homme',
      sexual_orientation: 'Homosexuel',
      health: 39,
      mana: 42,
      birthdate: new XDate('16/07/9:15').timestamp,
    },
    {
      id: uuidv4(),
      firstname: 'Eris',
      size: 160,
      gender: 'Femme',
      sexual_orientation: 'Bisexuelle',
      health: 34,
      birthdate: new XDate('10/01/9:07').timestamp,
    },
    {
      id: uuidv4(),
      firstname: 'Alriel',
      lastname: 'Virtoris',
      size: 165,
      gender: 'Homme',
      sexual_orientation: 'Hétérosexuelle & Bicurieux',
      health: 44,
      birthdate: new XDate('31/06/9:01').timestamp,
    },
    {
      id: uuidv4(),
      firstname: 'Kléo',
      size: 160,
      gender: 'Femme',
      sexual_orientation: 'Bisexuelle',
      health: 50,
      mana: 50,
      birthdate: new XDate('12/11/8:10').timestamp,
    },
    {
      id: uuidv4(),
      firstname: 'Essek',
      size: 160,
      gender: 'Homme',
      sexual_orientation: 'Hétérosexuel',
      health: 50,
      birthdate: new XDate('29/05/9:03').timestamp,
    },
    {
      id: uuidv4(),
      firstname: 'Orana',
      size: 140,
      gender: 'Femme',
      sexual_orientation: 'Hétérosexuelle',
      health: 10,
      birthdate: new XDate('10/02/9:10').timestamp,
    }
  ];
  const charactersMap = new Map(characters.map((character) => [character.firstname, character.id]));

  await knex('characters').insert(characters);

  const character_backgrounds = [
    {
      id: uuidv4(),
      character_id: charactersMap.get('Maël'),
      race_id: racesMap.get('Humain'),
      klass_id: klassesMap.get('Mage'),
    },
    {
      id: uuidv4(),
      character_id: charactersMap.get('Tendaji'),
      race_id: racesMap.get('Humain'),
      klass_id: klassesMap.get('Voleur'),
    },
    {
      id: uuidv4(),
      character_id: charactersMap.get('Gurhok'),
      race_id: racesMap.get('Kossith'),
      klass_id: klassesMap.get('Guerrier'),
    },
    {
      id: uuidv4(),
      character_id: charactersMap.get('Exilwyn'),
      race_id: racesMap.get('Elfe'),
      klass_id: klassesMap.get('Mage'),
    },
    {
      id: uuidv4(),
      character_id: charactersMap.get('Eris'),
      race_id: racesMap.get('Demi-Elfe'),
      klass_id: klassesMap.get('Voleur'),
    },
    {
      id: uuidv4(),
      character_id: charactersMap.get('Alriel'),
      race_id: racesMap.get('Elfe'),
      klass_id: klassesMap.get('Voleur'),
    },
    {
      id: uuidv4(),
      character_id: charactersMap.get('Kléo'),
      race_id: racesMap.get('Humain'),
      klass_id: klassesMap.get('Mage'),
    },
    {
      id: uuidv4(),
      character_id: charactersMap.get('Essek'),
      race_id: racesMap.get('Elfe'),
      klass_id: klassesMap.get('Voleur'),
    },
    {
      id: uuidv4(),
      character_id: charactersMap.get('Orana'),
      race_id: racesMap.get('Elfe'),
      klass_id: klassesMap.get('Citoyen'),
    },
  ];

  await knex('character_backgrounds').insert(character_backgrounds);

  const relationships_types = [
    { id: uuidv4(), code: 'friend', name: 'Ami/e', color: '#4CAF50', icon: '🤝' },
    { id: uuidv4(), code: 'close_friend', name: 'Ami/e proche', color: '#2E7D32', icon: '😊' },
    { id: uuidv4(), code: 'one_night_stand', name: 'Coup d\'un soir', color: '#E91E63', icon: '🍆' },
    { id: uuidv4(), code: 'sexual_friend', name: 'Sexuellement ami/e', color: '#9C27B0', icon: '❤️‍🔥' },
    { id: uuidv4(), code: 'acquaintance', name: 'Connaissance', color: '#9E9E9E', icon: '👋' },
    { id: uuidv4(), code: 'lover', name: 'Amoureux/se', color: '#F44336', icon: '❤️' },
    { id: uuidv4(), code: 'couple', name: 'Couple', color: '#D32F2F', icon: '💏' },
    { id: uuidv4(), code: 'soulmate', name: 'Âme soeur', color: '#2196F3', icon: '💕' },
    { id: uuidv4(), code: 'sibling', name: 'Frère/Soeur', color: '#3F51B5', icon: '👨‍👩‍👧‍👦' },
    { id: uuidv4(), code: 'parent', name: 'Père/Mère', color: '#673AB7', icon: '👨‍👩‍👧‍👦' },
    { id: uuidv4(), code: 'uncle', name: 'Oncle/Tante', color: '#673AB7', icon: '👨‍👩‍👧‍👦' },
    { id: uuidv4(), code: 'niece', name: 'Neveu/Nièce', color: '#673AB7', icon: '👨‍👩‍👧‍👦' },
    { id: uuidv4(), code: 'cousin', name: 'Cousin/e', color: '#5C6BC0', icon: '👨‍👩‍👧‍👦' },
    { id: uuidv4(), code: 'faction_brother', name: 'Frère/Soeur de faction', color: '#1E88E5', icon: '🤝' },
    { id: uuidv4(), code: 'faction_colleague', name: 'Collègue de faction', color: '#42A5F5', icon: '💼' },
    { id: uuidv4(), code: 'rival', name: 'Rival/e', color: '#FF9800', icon: '🤼' },
    { id: uuidv4(), code: 'enemy', name: 'Ennemi/e', color: '#F57C00', icon: '🤬' },
    { id: uuidv4(), code: 'worst_enemy', name: 'Ennemi/e juré/e', color: '#E65100', icon: '🤬' },
  ];
  const relationships_typesMap = new Map(relationships_types.map((relationship_type) => [relationship_type.code, relationship_type.id]));

  await knex('relationships_types').insert(relationships_types);

  const relationships = [
    ['Maël', 'Tendaji', 'close_friend'],
    ['Maël', 'Gurhok', 'close_friend'],
    ['Maël', 'Exilwyn', 'close_friend'],
    ['Maël', 'Essek', 'friend'],
    ['Maël', 'Eris', 'close_friend'],
    ['Maël', 'Orana', 'lover'],
    ['Alriel', 'Kléo', 'soulmate'],
    ['Alriel', 'Essek', 'acquaintance'],
    ['Eris', 'Essek', 'lover'],
    ['Eris', 'Orana', 'friend'],
    ['Eris', 'Tendaji', 'close_friend'],
    ['Eris', 'Gurhok', 'close_friend'],
    ['Eris', 'Exilwyn', 'close_friend'],
    ['Tendaji', 'Gurhok', 'close_friend'],
    ['Tendaji', 'Exilwyn', 'close_friend'],
    ['Tendaji', 'Essek', 'friend'],
    ['Tendaji', 'Orana', 'acquaintance'],
    ['Gurhok', 'Exilwyn', 'close_friend'],
    ['Gurhok', 'Orana', 'acquaintance'],
    ['Exilwyn', 'Essek', 'friend'],
    ['Exilwyn', 'Orana', 'acquaintance'],
  ].map(([char1, char2, code]) => ([
    {
      id: uuidv4(),
      character_id: charactersMap.get(char1),
      recipient_id: charactersMap.get(char2),
      type_id: relationships_typesMap.get(code),
    },
    {
      id: uuidv4(),
      character_id: charactersMap.get(char2),
      recipient_id: charactersMap.get(char1),
      type_id: relationships_typesMap.get(code),
    }
  ])).flat();


  await knex('relationships').insert(relationships);

  const groups = [
    { id: uuidv4(), name: 'Cercle de Mage Féréldien', place_id: placesMap.get('Lac de Calenhad') },
    { id: uuidv4(), name: 'Cercle de Mage de Val Royeaux', place_id: placesMap.get('Val Royeaux') },
    { id: uuidv4(), name: 'Cercle de Mage de Montsimmard', place_id: placesMap.get('Montsimmard') },
    { id: uuidv4(), name: 'Cercle de Mage Névarrien', place_id: placesMap.get('Nécropole') },
    { id: uuidv4(), name: 'Cercle de Mage de Kirkwall', place_id: placesMap.get('Kirkwall') },
    { id: uuidv4(), name: 'Les Oubliés', place_id: placesMap.get('The High Reaches') },
    { id: uuidv4(), name: 'Clan Dalatien de Brécilianne', place_id: placesMap.get('Forêt de Bréciliane') },
    { id: uuidv4(), name: 'Chasinds de Korcari', place_id: placesMap.get('Terres sauvages de Korcari') },
    { id: uuidv4(), name: 'Clan Dalatien d\'Arlathan', place_id: placesMap.get('Forêt d\'Arlathan') },
    { id: uuidv4(), name: 'Clan Dalatien de Riveïn', place_id: placesMap.get('Clan dalatien Rivénien') },
    { id: uuidv4(), name: 'La Côterie', place_id: placesMap.get('Kirkwall') },
    { id: uuidv4(), name: 'Le Cartha', place_id: placesMap.get('Orzammar') },
    { id: uuidv4(), name: 'Les Briseurs de chaines', place_id: placesMap.get('Kirkwall') },
    { id: uuidv4(), name: 'Esclave Tévintide', place_id: placesMap.get('Minrathie') },
    { id: uuidv4(), name: 'Qunari', place_id: placesMap.get('Minrathie') },
    { id: uuidv4(), name: 'Tal Vashoth', place_id: placesMap.get('Minrathie') },
    { id: uuidv4(), name: 'Les Ecumeurs', place_id: placesMap.get('Llomerynn') },
    { id: uuidv4(), name: 'La Sirène Silencieuse', place_id: placesMap.get('Llomerynn') },
  ];
  const groupsMap = new Map(groups.map((group) => [group.name, group.id]));

  await knex('groups').insert(groups);

  const character_groups = [
    { id: uuidv4(), character_id: charactersMap.get('Maël'), group_id: groupsMap.get('Cercle de Mage Féréldien') },
    { id: uuidv4(), character_id: charactersMap.get('Maël'), group_id: groupsMap.get('Les Briseurs de chaines') },
    { id: uuidv4(), character_id: charactersMap.get('Tendaji'), group_id: groupsMap.get('Chasinds de Korcari') },
    { id: uuidv4(), character_id: charactersMap.get('Tendaji'), group_id: groupsMap.get('Les Briseurs de chaines') },
    { id: uuidv4(), character_id: charactersMap.get('Gurhok'), group_id: groupsMap.get('Qunari') },
    { id: uuidv4(), character_id: charactersMap.get('Gurhok'), group_id: groupsMap.get('Tal Vashoth') },
    { id: uuidv4(), character_id: charactersMap.get('Gurhok'), group_id: groupsMap.get('Les Briseurs de chaines') },
    { id: uuidv4(), character_id: charactersMap.get('Eris'), group_id: groupsMap.get('Les Oubliés') },
    { id: uuidv4(), character_id: charactersMap.get('Eris'), group_id: groupsMap.get('Esclave Tévintide') },
    { id: uuidv4(), character_id: charactersMap.get('Eris'), group_id: groupsMap.get('Les Briseurs de chaines') },
    { id: uuidv4(), character_id: charactersMap.get('Exilwyn'), group_id: groupsMap.get('Clan Dalatien de Brécilianne') },
    { id: uuidv4(), character_id: charactersMap.get('Exilwyn'), group_id: groupsMap.get('Esclave Tévintide') },
    { id: uuidv4(), character_id: charactersMap.get('Exilwyn'), group_id: groupsMap.get('Les Briseurs de chaines') },
    { id: uuidv4(), character_id: charactersMap.get('Essek'), group_id: groupsMap.get('Les Oubliés') },
    { id: uuidv4(), character_id: charactersMap.get('Essek'), group_id: groupsMap.get('Esclave Tévintide') },
    { id: uuidv4(), character_id: charactersMap.get('Alriel'), group_id: groupsMap.get('La Sirène Silencieuse') },
    { id: uuidv4(), character_id: charactersMap.get('Kléo'), group_id: groupsMap.get('Cercle de Mage Névarrien') },
  ];

  await knex('character_groups').insert(character_groups);
};
