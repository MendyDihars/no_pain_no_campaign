'use strict';

import Bluebird from 'bluebird';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import basename from path.basename(__filename);
import globalConfig from '@root/lib/config';
const db = {};

let sequelize;
if (globalConfig.db.url) {
  sequelize = new Sequelize(globalConfig.db.url);
}

Bluebird.map(
  fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  }),
  async (file) => {
    const model = await import(path.join(__dirname, file));
    db[model.name] = model;
  }
)
  .then(() => {
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
  })
  .catch(error => {
    console.error(error);
  });


db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
