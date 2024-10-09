'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MedicalRecord.init({
    PatientId: DataTypes.INTEGER,
    DoctorId: DataTypes.INTEGER,
    DiseaseId: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    symptom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MedicalRecord',
  });
  return MedicalRecord;
};