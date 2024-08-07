const Fond = require('../../models/fond');
const Historique = require('../../models/historiquefond');
const { ValidationError, UniqueConstraintError } = require('sequelize')

exports.createHistory= async (req, res) => {

  const { amount, date } = req.body;

  await Historique.create({
      amount: amount, 
      date: date,
    })
    .then(async historique => {
      const message = `Le fond a bien été crée.`
      const fond = await Fond.findOne({
        where: {
          id: 1
        }
      })


      if(fond){
        fond.amount += amount;
        await fond.save();
      }

      
      res.json({ message, data: historique })

    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: 'error.message', data: error });
      }
      const message = `L'historique n'a pas pu être ajouté. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
    
}










