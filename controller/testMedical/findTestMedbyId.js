const TestMedical = require('../../models/testMedical');

exports.findTestMedById = async (req, res) => {
  await TestMedical.findByPk(req.params.id)
    .then(testmed => {
      if(testmed === null) {
        const message = `Le test medical demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const message = 'Un test medical a bien été trouvé.'
      res.json({ message, data: testmed })
    })
    .catch(error => {
      const message = `Le test medical n'a pas pu être récupéré. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    });
    
}