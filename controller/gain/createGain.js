const Gain = require('../../models/gain');
const TestMedical = require('../../models/testMedical');
const GainTest = require('../../models/gainTest');
const Solde = require('../../models/solde');
const Medecin = require('../../models/medecin'); // Assurez-vous que ce chemin est correct
const TypeUser = require('../../models/typeuser');
const { ValidationError, UniqueConstraintError } = require('sequelize')
const { getIO } = require('../../middleware/socketIo');
const generatePassword = require('generate-password');


exports.createGain = async (req, res) => {
  const { medecinId, tests, patientId } = req.body;
  const ids = tests;
  const reference = generatePassword.generate({
    length: 12,
    numbers: true,
    symbols: false,
    uppercase: true,
    lowercase: true,
    strict: true
  });

  try {
    // Récupérer la somme des montants des tests
    const somme = await TestMedical.sum('montant', {
      where: {
        id: ids
      }
    });

    // Récupérer le médecin avec son type d'utilisateur
    const medecin = await Medecin.findByPk(medecinId, {
      include: [{
        model: TypeUser,
        attributes: ['pourcentage']
      }]
    });

    if (!medecin || !medecin.TypeUser) {
      return res.status(404).json({ message: 'Médecin ou type utilisateur non trouvé.' });
    }

    // Utiliser le pourcentage associé au type d'utilisateur
    const pourcentage = (somme * medecin.TypeUser.pourcentage) / 100;

    const gain = await Gain.create({
      gain: pourcentage,
      medecinId: medecinId,
      patientId: patientId,
      reference: reference
    });

    const message = `Le gain a bien été créé.`;

    const solde = await Solde.findOne({
      where: {
        medecinId: medecinId
      }
    });

    if (tests && tests.length > 0) {
      await Promise.all(tests.map(testId =>
        GainTest.create({
          GainId: gain.id,
          TestMedicalId: testId
        })
      ));
    }

    if (solde) {
      solde.solde += pourcentage;
      await solde.save();
      const data = solde.dataValues;
      onBalanceUpdate(message, data);
    }

    res.json({ message, data: gain });

  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    const message = `Le gain n'a pas pu être ajouté. Réessayez dans quelques instants.`;
    res.status(500).json({ message, data: error });
  }
}
/*exports.createGain = async (req, res) => {
  const {medecinId, tests, patientId} = req.body
  const ids = tests
  const reference =  generatePassword.generate({
    length: 12,
    numbers: true,
    symbols: false,
    uppercase: true,
    lowercase: true,
    strict: true
  })

  const somme = await TestMedical.sum('montant', {
    where: {
      id: ids
    }
  })

  const pourcentage = somme * 3 / 100

  await Gain.create({
      gain: pourcentage, 
      medecinId: medecinId,
      patientId: patientId,
      reference: reference
    })
    .then(async gain => {
      const message = `Le gain a bien été crée.`
      const solde = await Solde.findOne({
        where: {
          medecinId: medecinId
        }
      })

      if(tests && tests.length > 0){
        await Promise.all(tests.map(testId => 
          GainTest.create({
            GainId: gain.id,
            TestMedicalId: testId
          })
        ))
      }

      if(solde){
        solde.solde += pourcentage;
        await solde.save();
        const data = solde.dataValues
        onBalanceUpdate(message, data);
      }

      

      res.json({ message, data: gain })

    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: 'error.message', data: error });
      }
      const message = `Le gain n'a pas pu être ajouté. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
    
}*/

function onBalanceUpdate(message, data) {
  const io = getIO();
  io.emit('balance', { message, data });
}