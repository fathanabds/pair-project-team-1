'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Disease.belongsToMany(models.User, { through: 'MedicalRecords', as: 'PatientRecords', foreignKey: 'PatientId' });
      Disease.belongsToMany(models.User, { through: 'MedicalRecords', as: 'DoctorRecords', foreignKey: 'DoctorId' });
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
