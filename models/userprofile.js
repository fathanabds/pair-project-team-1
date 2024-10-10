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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Name is Required',
          },
          notEmpty: {
            msg: 'Name is Required',
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'User Id is Required',
          },
          notEmpty: {
            msg: 'User Id is Required',
          },
        },
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Date of Birth is Required',
          },
          notEmpty: {
            msg: 'Date of Birth is Required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'UserProfile',
    }
  );
  return UserProfile;
};
