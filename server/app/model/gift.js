'use strict';
module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;
  const Gift = app.model.define('gift', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    money: STRING,
    dis: BOOLEAN,
  });
  return Gift;
};
