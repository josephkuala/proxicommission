const Patient = require('../../models/patient');

exports.deletePatient = async (req, res) => {
  Patient.findByPk(req.params.id)
    .then(patient => {        
      if(patient === null) {
        const message = `Le patient demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      return Patient.destroy({ where: { id: patient.id } })
      .then(_ => {
        const message = `Le patient avec l'identifiant n°${patient.id} a bien été supprimé.`
        res.json({message, data: patient })
      })
    })
    .catch(error => {
      const message = `Le patient n'a pas pu être supprimé. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
}