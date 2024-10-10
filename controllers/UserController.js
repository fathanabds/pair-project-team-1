const { User, UserProfile, Disease } = require('../models');
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
          req.session.user = { email: user.email, role: user.role };
          return res.redirect(`/showMedicalRecords/${user.id}`);
        } else {
          const error = 'Invalid Password';
          return res.redirect(`/login?error=${error}`);
        }
      } else {
        const error = 'Invalid Email';
        return res.redirect(`/login?error=${error}`);
      }
      // res.send(user);
      // res.send(req.body);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getAllMR(req, res) {
    const { userId } = req.params;
    try {
      const data = await User.findByPk(userId, {
        include: {
          association: 'PatientRecords',
          attribute: [],
          include: {
            association: 'DoctorRecords',
            include: {
              model: UserProfile,
            },
          },
        },
      });
      res.send(data);
      // res.render('MedicalRecords', { userId });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getAddMR(req, res) {
    const { userId } = req.params;
    try {
      res.render('AddMRForm');
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = UserController;
