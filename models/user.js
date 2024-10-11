'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static roles = ['Patient', 'Doctor'];

    static associate(models) {
      User.hasOne(models.UserProfile);
      User.hasMany(models.MedicalRecord, { as: 'PatientRecord', foreignKey: 'PatientId' });
      User.hasMany(models.MedicalRecord, { as: 'DoctorRecord', foreignKey: 'DoctorId' });
      User.belongsToMany(models.Disease, { through: 'MedicalRecords', as: 'PatientRecords', foreignKey: 'PatientId' });
      User.belongsToMany(models.Disease, { through: 'MedicalRecords', as: 'DoctorRecords', foreignKey: 'DoctorId' });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Invalid Email Format',
          },
          notNull: {
            msg: 'Email is Required',
          },
          notEmpty: {
            msg: 'Email is Required',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 12],
            msg: 'Password Must Be 8--12 Characters',
          },
          notNull: {
            msg: 'Password is Required',
          },
          notEmpty: {
            msg: 'Password is Required',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Role is Required',
          },
          notEmpty: {
            msg: 'Role is Required',
          },
          isIn: {
            args: [['Doctor', 'Patient']],
            msg: 'Role Must be Doctor or Patient',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  });

  return User;
};
