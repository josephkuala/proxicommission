const Solde = require('../../models/solde');

exports.updateMed = async (req, res) => {
  const id = req.params.id
  await Solde.update(req.body, {
    where: { id: id }
  })
  .then(_ => {
    return Solde.findByPk(id).then(solde => {
      if(solde === null) {
        const message = `Le solde demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const message = `Le solde ${solde.designation} a bien été modifié.`
      res.json({message, data: solde })
    })
  })
  .catch(error => {
    if(error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    if(error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: 'error.message', data: error });
    }
    const message = `Le solde n'a pas pu être modifié. Réessayez dans quelques instants.`
    res.status(500).json({ message, data: error })
  })
}