const Medecin = require('../../models/medecin');
const Solde = require('../../models/solde');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const generatePassword = require('generate-password');
const { sendEmail } = require('../../middleware/mailer')
const bcrypt = require('bcrypt')


exports.createMed = async (req, res) => {
  const {nom, postnom, prenom, email, typeuser} = req.body;
  const random =  generatePassword.generate({
    length: 4,
    numbers: true,
    symbols: false,
    uppercase: false,
    lowercase: false,
    strict: true
  })
  const username = `${prenom}${nom}`.toLowerCase()+random;
  const password =  generatePassword.generate({
    length: 10,
    numbers: true,
    symbols: false,
    uppercase: true,
    lowercase: true,
    strict: true
  })

  const passwordclear = password
  
  const user = await Medecin.findOne({
    where: {
      username: username
    }
  })

  bcrypt.hash(password, 10).then(async password => {
    if(user){
      return res.status(400).json({ message: 'Ce nom d\'utilisateur existe déjà' })
    } else {
      await Medecin.create({
        nom,
        postnom,
        prenom,
        email,
        typeuser,
        username,
        password
      })
      .then(async medecin => {
        await sendEmail(
          email, 
          'Vos informations de connexion', 
          `Bonjour ${prenom}, voici vos informations de connexion: Nom d'utilisateur: ${username}, Mot de passe: ${passwordclear}`
        );
  
        const message = `Le medecin a bien été crée et le mail envoyé.`
  
        res.json({ message, data: medecin })
        return Solde.create({
          solde: 0,
          medecinId: medecin.id
        })
      })
      .catch(error => {
        if(error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `Le medecin n'a pas pu être ajouté. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
    }
    
  })
    
    
}