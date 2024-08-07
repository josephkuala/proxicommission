const TestMedical = require('../../models/testMedical');
const { ValidationError, UniqueConstraintError } = require('sequelize')

exports.createTestMed = async (req, res) => {
  await TestMedical.create(req.body)
    .then(testmed => {
      const message = `Le test medical a bien été crée.`
      res.json({ message, data: testmed })
    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = `Le test medical n'a pas pu être ajouté. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
    
}