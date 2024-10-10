'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    static associate(models) {
      Disease.belongsToMany(models.User, { through: 'MedicalRecords', as: 'PatientRecords', foreignKey: 'DiseaseId', otherKey: 'PatientId' });
      Disease.belongsToMany(models.User, { through: 'MedicalRecords', as: 'DoctorRecords', foreignKey: 'DiseaseId', otherKey: 'DoctorId' });
      // Disease.belongsToMany(models.User, { through: 'MedicalRecords', as: 'PatientRecords', foreignKey: 'PatientId' });
      // Disease.belongsToMany(models.User, { through: 'MedicalRecords', as: 'DoctorRecords', foreignKey: 'DoctorId' });
    }
  }
  Disease.init(
    {
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Disease',
    }
  );
  return Disease;
};
