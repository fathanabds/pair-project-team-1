'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    static associate(models) {
      UserProfile.belongsTo(models.User);
    }

    get age() {
      const year = new Date().getFullYear();
      return year - this.dateOfBirth.getFullYear();
    }
  }
  UserProfile.init(
    {
      name: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      dateOfBirth: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'UserProfile',
    }
  );
  return UserProfile;
};
