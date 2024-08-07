const Transaction = require('../../models/transaction');
const Gain = require('../../models/gain');
const Medecin = require('../../models/medecin');
const Patient = require('../../models/patient');

// Définition de la fonction pour récupérer les données et construire le JSON
async function getCombinedData(req, res) {
  try {
    // Récupérer les gains avec les informations sur les patients associés
    const gains = await Gain.findAll({
      include: [{
        model: Patient,
        attributes: ['nom'] // Récupérer seulement le nom du patient
      }],
      limit: 3
    });

    // Récupérer les transactions avec les informations sur les médecins associés
    const transactions = await Transaction.findAll({
      include: [{
        model: Medecin,
        attributes: ['nom'] // Récupérer seulement le nom du médecin
      }],
      limit: 3
    });

    // Mapper les gains et les transactions dans un format uniforme pour le JSON final
    const mappedGains = gains.map(gain => ({
      nom: gain.Patient.nom,
      montant: gain.gain,
      date: gain.createdAt,
      reference: gain.reference,
      operation: 'depot'
    }));

    const mappedTransactions = transactions.map(transaction => ({
      nom: transaction.Medecin.nom,
      montant: transaction.amount,
      date: transaction.createdAt,
      reference: transaction.reference,
      operation: 'retrait'
    }));

    // Fusionner les deux listes en une seule
    const combinedData = [...mappedGains, ...mappedTransactions];
    

    // Renvoyer le résultat sous forme de JSON
    res.status(200).json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des données combinées." });
  }
}

module.exports = {
  getCombinedData
};