'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    static associate(models) {
      Disease.belongsToMany(models.User, { through: 'MedicalRecords', as: 'PatientDiseases', foreignKey: 'DiseaseId', otherKey: 'PatientId' });
      Disease.belongsToMany(models.User, { through: 'MedicalRecords', as: 'DoctorDiseases', foreignKey: 'DiseaseId', otherKey: 'DoctorId' });
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
