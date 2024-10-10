const { User, UserProfile, Disease, MedicalRecord } = require('../models');
const bcrypt = require('bcrypt');

class UserController {
  static async getRegister(req, res) {
    try {
      res.render('RegisterForm', { roles: User.roles });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async postRegister(req, res) {
    let { name, email, password, role, dateOfBirth } = req.body;
    try {
      const newUser = await User.create({ email, password, role });
      await UserProfile.create({ UserId: newUser.id, name, dateOfBirth });
      res.redirect('/login');
    } catch (error) {
      console.log(error);
      res.send(error.message);
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
          return res.redirect(`/showMedicalRecords/${user.id}`);
        } else {
          const error = 'Invalid Password';
          return res.redirect(`/login?error=${error}`);
        }
      } else {
        const error = 'Invalid Email';
        return res.redirect(`/login?error=${error}`);
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
        return res.redirect('/login');
      });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getProfile(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findByPk(userId, {
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

  static async getAllMR(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] },
        include: {
          association: 'DoctorRecords',
          include: {
            association: 'PatientRecords',
            include: {
              model: UserProfile,
            },
          },
        },
      });
      const histories = await MedicalRecord.findAll({ where: { PatientId: userId } });
      const userProfile = await User.findByPk(userId, {
        include: {
          model: UserProfile,
        },
      });
      res.send(user);
      // res.render('MedicalRecords', { user });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getAddMR(req, res) {
    const { userId } = req.params;
    try {
      const doctors = await User.findAll({
        where: {
          role: 'Doctor',
        },
        include: {
          model: UserProfile,
        },
      });
      res.render('AddMRForm', { doctors, userId });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async postAddMR(req, res) {
    const { userId } = req.params;
    const { DoctorId, symptom } = req.body;
    try {
      await MedicalRecord.create({ PatientId: userId, DoctorId, symptom });
      res.redirect(`/showMedicalRecords/${userId}`);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = UserController;
