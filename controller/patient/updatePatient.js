const Patient = require('../../models/patient');

exports.updatePatient = async (req, res) => {
  const id = req.params.id
  await Patient.update(req.body, {
    where: { id: id }
  })
  .then(_ => {
    return Patient.findByPk(id).then(patient => {
      if(patient === null) {
        const message = `Le patient demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const message = `Le patient ${patient.designation} a bien été modifié.`
      res.json({message, data: patient })
    })
  })
  .catch(error => {
    if(error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    if(error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: 'error.message', data: error });
    }
    const message = `Le patient n'a pas pu être modifié. Réessayez dans quelques instants.`
    res.status(500).json({ message, data: error })
  })
}