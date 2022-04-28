'use strict';
module.exports = app => {
  const { TEXT, STRING, INTEGER, DATE } = app.Sequelize;

  const Imgs = app.model.define('imgs', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: TEXT('long'),
    houseId: STRING,
    createTime: DATE,
  });

  return Imgs;
};
