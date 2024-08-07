const TestMedical = require('../../models/testMedical');

exports.findAllTestMed = async (req, res) => {
   await TestMedical.findAll(
      { order: ['nom'] }
    )
    .then(testmedials => {
      const message = 'La liste des tests medical a bien été récupéré.'
      res.json({ message, data: testmedials })
    })
    .catch(error => {
      const message = `La liste des tests medical n'a pas pu être récupéré. 
                        Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    });
    
}