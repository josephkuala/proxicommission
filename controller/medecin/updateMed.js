const Medecin = require('../../models/medecin');

exports.updateMed = async (req, res) => {
  const id = req.params.id
  await Medecin.update(req.body, {
    where: { id: id }
  })
  .then(_ => {
    return Medecin.findByPk(id).then(medecin => {
      if(medecin === null) {
        const message = `Le medecin demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const message = `Le medecin ${medecin.designation} a bien été modifié.`
      res.json({message, data: medecin })
    })
  })
  .catch(error => {
    if(error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    if(error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: 'error.message', data: error });
    }
    const message = `Le medecin n'a pas pu être modifié. Réessayez dans quelques instants.`
    res.status(500).json({ message, data: error })
  })
}