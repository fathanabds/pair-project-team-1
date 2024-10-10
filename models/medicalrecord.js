'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalRecord extends Model {
    static associate(models) {
      MedicalRecord.belongsTo(models.User, { foreignKey: 'PatientId', as: 'Patient' });
      MedicalRecord.belongsTo(models.User, { foreignKey: 'DoctorId', as: 'Doctor' });
      MedicalRecord.belongsTo(models.Disease);
    }
  }
  MedicalRecord.init(
    {
      PatientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Patient is Required',
          },
          notEmpty: {
            msg: 'Patient is Required',
          },
        },
      },
      DoctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Doctor is Required',
          },
          notEmpty: {
            msg: 'Doctor is Required',
          },
        },
      },
      DiseaseId: DataTypes.INTEGER,
      cost: DataTypes.INTEGER,
      symptom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Symptom is Required',
          },
          notEmpty: {
            msg: 'Symptom is Required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'MedicalRecord',
    }
  );
  return MedicalRecord;
};
