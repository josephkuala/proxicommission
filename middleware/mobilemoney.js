const axios = require('axios');
const generatePassword = require('generate-password');
const Transaction = require('../models/transaction');
const Solde = require('../models/solde')

exports.retrait = async (req, res) => {
  const {phone, amount, medecinId} = req.body
  const reference = generatePassword.generate({
    length: 12,
    numbers: true,
    symbols: false,
    uppercase: true,
    lowercase: false,
    strict: true
  })
  const type = parseInt(process.env.TYPE)
  const currency = process.env.CURRENCY
  const merchant = process.env.MERCHANT
  const callbackUrl = process.env.CALLBACK_URL
  const etatId = 1

  const solde = await Solde.findOne({ where: { medecinId: medecinId }});

  if(solde){
    if(parseInt(amount) <= solde.dataValues.solde){
      const data = {
        merchant,
        type,
        phone,
        reference,
        amount,
        currency,
        callbackUrl
      }
    
      try{
        const response = await axios.post(
          `${process.env.BASE_URL_PROD}`,
          data,
          {
            headers: {
              'Authorization': `${process.env.TOKEN_PROD}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log('Data:', response.data);
        res.json({ data: response.data });
    
        await Transaction.create({
          phone,
          reference,
          amount,
          etatId,
          medecinId
        }).then(async transaction => {
          const message = `Transaction initié avec succès.`
          res.json({ message, data: transaction })
        }).catch(error => {
          if(error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error });
          }
          if(error instanceof UniqueConstraintError) {
            return res.status(400).json({ message: 'error.message', data: error });
          }
          const message = `La transaction n'a pas pu être ajouté. Réessayez dans quelques instants.`
          res.status(500).json({ message, data: error })
        })
    
        return response.data
    
      }catch(error){
        console.error('Error during the API request:', error.message);
        if (error.response) {
          // La réponse de l'API était hors des plages de statut 2xx
          console.error('API response status:', error.response.status);
          console.error('API response data:', error.response.data);
        }
        return null;
      }
    } else {
      res.status(404).json({error:'Votre solde est insuffisant pour éffectuer cet opération'});
    }

  } else {
    res.status(404).json({error:'Ce medecin n\'a aucun solde'});
  }
  
}