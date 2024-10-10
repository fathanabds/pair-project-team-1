const { Disease } = require('../models');

class DiseaseController {
  static async getDiseases(req, res) {
    const { search } = req.query;
    try {
      const diseases = await Disease.findByName(search);
      res.render('Diseases', { diseases });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getAddDisease(req, res) {
    try {
      res.render('AddDiseaseForm');
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getPostDisease(req, res) {
    const { name, desc } = req.body;
    try {
      await Disease.create({ name, desc });
      res.redirect('/diseases');
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async deleteDisease(req, res) {
    const { diseaseId } = req.params;
    try {
      await Disease.destroy({
        where: {
          id: diseaseId,
        },
      });
      res.redirect('/diseases');
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = DiseaseController;
