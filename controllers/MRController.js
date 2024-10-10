const { User, UserProfile, Disease, MedicalRecord } = require('../models');

class MRController {
  static async getResolve(req, res) {
    const { recordId } = req.params;
    try {
      const diseases = await Disease.findAll();
      const patientSymptoms = await MedicalRecord.findByPk(recordId);
      // res.send(patientSymptoms);
      res.render('ResolveMR', { diseases, patientSymptoms });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async postResolve(req, res) {
    const { DiseaseId, cost, userId } = req.body;
    const { recordId } = req.params;
    try {
      await MedicalRecord.update(
        { DiseaseId, cost },
        {
          where: {
            id: recordId,
          },
        }
      );
      res.redirect(`/medicalRecord/doctors/${userId}`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async getEditSymptom(req, res) {
    const { recordId } = req.params;
    try {
      const patientSymptoms = await MedicalRecord.findByPk(recordId);
      // res.send(patientSymptoms);
      res.render('EditSymptom', { patientSymptoms });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async postEditSymptom(req, res) {
    const { recordId } = req.params;
    const { symptom, userId } = req.body;
    try {
      await MedicalRecord.update(
        { symptom },
        {
          where: {
            id: recordId,
          },
        }
      );
      res.redirect(`/medicalRecord/patients/${userId}`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = MRController;
