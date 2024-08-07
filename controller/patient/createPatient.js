const Patient = require('../../models/patient');
const { ValidationError, UniqueConstraintError } = require('sequelize');

exports.createPatient = async (req, res) => {
  const {nom, postnom, prenom} = req.body;

    await Patient.create({
      nom,
      postnom,
      prenom,
    })
    .then(async patient => {
      const message = `Le patient a bien été crée et le mail envoyé.`
      res.json({ message, data: patient })
    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: 'error.message', data: error });
      }
      const message = `Le patient n'a pas pu être ajouté. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  
    
    
}