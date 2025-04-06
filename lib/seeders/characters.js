const { v4: uuidv4 } = require('uuid');

module.exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('character_progresses').del();
  await knex('characters').del();
  
  const characters = [
    {
      character: {
        id: uuidv4(),
        firstname: 'Maël',
        lastname: 'Klein',
        race: 'Humain',
        klass: 'Mage',
        height: '1m70',
        gender: 'Homme',
        sexual_orientation: 'Hétéroromantique & Bisexuel',
        health: 72,
        mana: 69,
      },
      progresses: [
        {
          level: 9,
          age: 25,
          status: 'Vivant',
        }
      ]
    },
    {
      character: {
        id: uuidv4(),
        firstname: 'Tendaji',
        lastname: 'Maathaï',
        race: 'Humain',
        klass: 'Voleur',
        height: '1m85',
        gender: 'Homme',
        sexual_orientation: 'Inconnu',
        health: 37,
      },
      progresses: [
        {
          level: 9,
          age: 23,
          status: 'Vivant',
        }
      ]
    },
    {
      character: {
        id: uuidv4(),
        firstname: 'Gurhok',
        race: 'Qunari',
        klass: 'Guerrier',
        height: '2m',
        gender: 'Homme',
        sexual_orientation: 'Bisexuel',
        health: 82,
      },
      progresses: [
        {
          level: 9,
          age: 3,
          status: 'Vivant',
        }
      ]
    },
    {
      character: {
        id: uuidv4(),
        firstname: 'Exilwyn',
        lastname: 'Agatar',
        race: 'Elfe',
        klass: 'Mage',
        height: '1m48',
        gender: 'Homme',
        sexual_orientation: 'Homosexuel',
        health: 39,
        mana: 42,
      },
      progresses: [
        {
          level: 9,
          age: 15,
          status: 'Vivant',
        }
      ]
    },
    {
      character: {
        id: uuidv4(),
        firstname: 'Eris',
        race: 'Demi-Elfe',
        klass: 'Voleur',
        height: '1m60',
        gender: 'Femme',
        sexual_orientation: 'Bisexuelle',
        health: 34,
      },
      progresses: [
        {
          level: 9,
          age: 23,
          status: 'Vivante',
        }
      ]
    },
    {
      character: {
        id: uuidv4(),
        firstname: 'Alriel',
        lastname: 'Virtoris',
        race: 'Elfe',
        klass: 'Voleur',
        height: '1m65',
        gender: 'Homme',
        sexual_orientation: 'Hétérosexuelle & Bicurieux',
        health: 44,
      },
      progresses: [
        {
          level: 3,
          age: 20,
          status: 'Vivant',
        }
      ]
    }
  ];

  // Inserts seed entries
  console.log('Inserting characters...');
  await knex('characters').insert(characters.map((character) => character.character));
  await knex('character_progresses').insert(characters.flatMap((character) => {
    return character.progresses.map((progress) => ({
      ...progress,
      character_id: character.character.id,
    }));
  }));
  console.log('Characters inserted successfully');
};
