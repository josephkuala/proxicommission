const TypeUser = require('../../models/typeuser');

exports.createTypeUser = async (req, res) => {
  await TypeUser.create(req.body)
    .then(typeuser => {
      const message = `Le type user a bien été crée.`
      res.json({ message, data: typeuser })
    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: 'error.message', data: error });
      }
      const message = `Le type user n'a pas pu être ajouté. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
    
}