'use strict';
module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(20),
    password: STRING(64),
    title: STRING(20),
    avatar: TEXT('long'),
    phone: STRING(20),
    sign: STRING(300),
    createTime: DATE,
    updateTime: DATE,
  });

  // 一个用户可以发布多个房子， hasMany
  User.associate = () => {
    app.model.User.hasMany(app.model.House, { foreignKey: 'userId' });
  };
  return User;
};
