const Transaction = require('../../models/transaction');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const Solde = require('../../models/solde')

exports.createTransact = async (req, res) => {
  const {code, reference, provider_reference, orderNumber } = req.body
  const etatId = 2
  const trans = await Transaction.findOne({ where: { reference: reference }});

  const solde = await Solde.findOne({ where: { medecinId: trans.dataValues.medecinId }});
  
  if(trans){
    await trans.update({
      code,
      provider_reference,
      orderNumber,
      etatId
    }).then(transact => {
      const message = `La transaction a bien été modifié.`
      res.json({message, data: transact })

      if(solde){
        const currentSolde = solde.dataValues.solde
        solde.update({
          solde: currentSolde - transact.dataValues.amount
        })
      }
    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: 'error.message', data: error });
      }
      const message = `La transaction n'a pas pu être modifié. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  } else {
    res.status(404).json({error:'Transaction not found'});
  }
    
}