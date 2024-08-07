const TestMedical = require('../../models/testMedical');
const { ValidationError, UniqueConstraintError } = require('sequelize')

exports.updateTestMed = async (req, res) => {
  const id = req.params.id
  await TestMedical.update(req.body, {
    where: { id: id }
  })
  .then(_ => {
    return TestMedical.findByPk(id).then(testmed => {
      if(testmed === null) {
        const message = `Le test medical demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const message = `Le test medical ${testmed.nom} a bien été modifié.`
      res.json({message, data: testmed })
    })
  })
  .catch(error => {
    if(error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    if(error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    const message = `Le test medical n'a pas pu être modifié. Réessayez dans quelques instants.`
    res.status(500).json({ message, data: error })
  })
}