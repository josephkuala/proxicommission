const Etat = require('../../models/etat');

exports.createEtat = async (req, res) => {
  await Etat.create(req.body)
    .then(etat => {
      const message = `L' etat a bien été crée.`
      res.json({ message, data: etat })
    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: 'error.message', data: error });
      }
      const message = `L' etat n'a pas pu être ajouté. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
    
}