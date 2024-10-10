'use strict';
const { Op } = require('sequelize');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    static associate(models) {
      Disease.belongsToMany(models.User, { through: 'MedicalRecords', as: 'PatientDiseases', foreignKey: 'DiseaseId', otherKey: 'PatientId' });
      Disease.belongsToMany(models.User, { through: 'MedicalRecords', as: 'DoctorDiseases', foreignKey: 'DiseaseId', otherKey: 'DoctorId' });
    }

    static findByName(search) {
      const condition = { where: {} };
      if (search) {
        condition.where.name = { [Op.iLike]: `%${search}%` };
      }
      return Disease.findAll(condition);
    }
  }
  Disease.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Name is Required',
          },
          notNull: {
            msg: 'Name is Required',
          },
        },
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Description is Required',
          },
          notNull: {
            msg: 'Description is Required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Disease',
    }
  );
  return Disease;
};
