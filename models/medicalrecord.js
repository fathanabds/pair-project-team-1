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
      PatientId: DataTypes.INTEGER,
      DoctorId: DataTypes.INTEGER,
      DiseaseId: DataTypes.INTEGER,
      cost: DataTypes.INTEGER,
      symptom: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'MedicalRecord',
    }
  );
  return MedicalRecord;
};
