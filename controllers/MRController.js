const { Disease, MedicalRecord } = require('../models');
const nodemailer = require('nodemailer');

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
    const { DiseaseId, cost } = req.body;
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
      res.redirect(`/medicalRecord/doctors/`);
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
    const { symptom } = req.body;
    try {
      await MedicalRecord.update(
        { symptom },
        {
          where: {
            id: recordId,
          },
        }
      );
      res.redirect(`/medicalRecord/patients/`);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async sendEmail(req, res) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: 'tomasa.lynch57@ethereal.email',
        pass: 'UjQE1uAeDpzS15Nvms',
      },
    });
    const { recordId } = req.params;
    try {
      const medicalRecord = await MedicalRecord.findOne({
        where: { id: recordId },
        include: 'Disease',
      });
      // console.log(req.session.user.email);
      // res.send(medicalRecord);
      const info = await transporter.sendMail({
        from: '"Ola, Doc!" <tomasa.lynch57@ethereal.email>', // sender address
        to: `${req.session.user.email}`, // list of receivers
        subject: `This is Your Medical Record #${medicalRecord.id} Summary`, // Subject line
        text: `Disease Name: ${medicalRecord.Disease.name} | Total Cost: ${medicalRecord.cost}`, // plain text body
      });
      console.log('Message sent: %s', info.messageId);
      res.redirect('/medicalRecord/patients/');
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = MRController;
