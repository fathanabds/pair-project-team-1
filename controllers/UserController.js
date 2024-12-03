const rupiahFormatter = require('../helpers/rupiahFormatter');
const { User, UserProfile, MedicalRecord } = require('../models');
const bcrypt = require('bcrypt');

class UserController {
  static async getRegister(req, res) {
    const { error } = req.query;
    try {
      res.render('RegisterForm', { roles: User.roles, error });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async postRegister(req, res) {
    let { name, email, password, role, dateOfBirth } = req.body;
    try {
      if (!name || !dateOfBirth) {
        throw new Error('Name and Date of Birth is Required');
      }
      const newUser = await User.create({ email, password, role });
      await UserProfile.create({ UserId: newUser.id, name, dateOfBirth });
      res.redirect('/user/login');
    } catch (error) {
      console.log(error);
      if ((error.name = 'SequelizeValidationError')) {
        const errors = error.errors.map((e) => {
          return ` ${e.message}`;
        });
        return res.redirect(`/user/register?error=${errors}`);
      }
      return res.send(error.message);
    }
  }

  static async getLogin(req, res) {
    const { error } = req.query;
    try {
      res.render('LoginForm', { error });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async postLogin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (isValidPassword) {
          req.session.user = { id: user.id, email: user.email, role: user.role };
          if (user.role == 'Patient') {
            return res.redirect(`/medicalRecord/patients/`);
          }
          return res.redirect(`/medicalRecord/doctors/`);
        } else {
          const error = 'Invalid Password';
          return res.redirect(`/user/login?error=${error}`);
        }
      } else {
        const error = 'Invalid Email';
        return res.redirect(`/user/login?error=${error}`);
      }
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getLogout(req, res) {
    try {
      req.session.destroy(function (err) {
        if (err) {
          return res.send(err.message);
        }
        return res.redirect('/user/login');
      });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.session.user.id, {
        attributes: { exclude: ['password'] },
        include: {
          model: UserProfile,
        },
      });
      res.render('Profile', { user });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getPatientMR(req, res) {
    const { error } = req.query;
    try {
      const user = await User.findByPk(req.session.user.id, {
        attributes: { exclude: ['password'] },
        include: {
          association: 'PatientRecord',
          include: [
            {
              association: 'Doctor',
              include: 'UserProfile',
            },
            'Disease',
          ],
        },
      });
      // res.send(user);
      res.render('PatientRecords', { user, error, rupiahFormatter });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getDoctorMR(req, res) {
    const { error } = req.query;
    try {
      const user = await User.findByPk(req.session.user.id, {
        attributes: { exclude: ['password'] },
        include: {
          association: 'DoctorRecord',
          include: [
            {
              association: 'Patient',
              include: 'UserProfile',
            },
            'Disease',
          ],
        },
      });
      // res.send(user);
      res.render('DoctorRecords', { user, error, rupiahFormatter });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getAddMR(req, res) {
    try {
      const doctors = await User.findAll({
        where: {
          role: 'Doctor',
        },
        include: {
          model: UserProfile,
        },
      });
      res.render('AddMRForm', { doctors });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async postAddMR(req, res) {
    const { DoctorId, symptom } = req.body;
    try {
      await MedicalRecord.create({ PatientId: req.session.user.id, DoctorId, symptom });
      res.redirect(`/medicalRecord/patients/`);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = UserController;
