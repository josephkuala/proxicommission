const Patient = require('../../models/patient');

exports.findPatientById = async (req, res) => {
  await Patient.findByPk(req.params.id)
    .then(patient => {
      if(patient === null) {
        const message = `Le patient demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const message = 'Un patient a bien été trouvé.'
      res.json({ message, data: patient })
    })
    .catch(error => {
      const message = `Le patient n'a pas pu être récupéré. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    });
    
}