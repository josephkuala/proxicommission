const TestMedical = require('../../models/testMedical');

exports.deleteTestMed = async (req, res) => {
  TestMedical.findByPk(req.params.id)
    .then(testmed => {        
      if(testmed === null) {
        const message = `Le test medical demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      return TestMedical.destroy({ where: { id: testmed.id } })
      .then(_ => {
        const message = `Le test medical avec l'identifiant n°${testmed.id} a bien été supprimé.`
        res.json({message, data: testmed })
      })
    })
    .catch(error => {
      const message = `Le test medicale n'a pas pu être supprimé. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
}