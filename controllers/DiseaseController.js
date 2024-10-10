const { Disease } = require('../models');

class DiseaseController {
  static async getDiseases(req, res) {
    try {
      const diseases = await Disease.findAll();
      // res.send(diseases);
      res.render('Diseases', { diseases });
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
