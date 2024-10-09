const { User, UserProfile } = require('../models');
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
          // return res.send('berhasil login');
          return res.redirect('/');
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
    try {
      res.render('MedicalRecords');
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = UserController;
