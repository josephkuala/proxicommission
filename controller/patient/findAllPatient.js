const Patient = require('../../models/patient');

exports.findAllPatient = async (req, res) => {
   await Patient.findAll(
      { order: ['nom'] }
    )
    .then(patients => {
      const message = 'La liste des patients a bien été récupéré.'
      res.json({ message, data: patients })
    })
    .catch(error => {
      const message = `La liste des patients n'a pas pu être récupéré. 
                        Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    });
    
}