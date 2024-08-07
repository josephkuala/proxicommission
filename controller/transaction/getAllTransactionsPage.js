const Transaction = require('../../models/transaction');
const Gain = require('../../models/gain');
const Medecin = require('../../models/medecin');
const Patient = require('../../models/patient');

// Définition de la fonction pour récupérer les données et construire le JSON
async function getCombinedDataPage(req, res) {
  try {
    // Récupérer les paramètres de pagination de la requête
    const page = parseInt(req.params.page) || 1;
    const limit = parseInt(req.params.limit) || 5;
    const offset = (page - 1) * limit;


    // Récupérer les gains avec les informations sur les patients associés (pagination)
    const gains = await Gain.findAndCountAll({
      include: [{
        model: Patient,
        attributes: ['nom'] // Récupérer seulement le nom du patient
      }],
      limit,
      offset
    });

    // Récupérer les transactions avec les informations sur les médecins associés (pagination)
    const transactions = await Transaction.findAndCountAll({
      include: [{
        model: Medecin,
        attributes: ['nom'] // Récupérer seulement le nom du médecin
      }],
      limit,
      offset
    });

    // Mapper les gains et les transactions dans un format uniforme pour le JSON final
    const mappedGains = gains.rows.map(gain => ({
      nom: gain.Patient.nom,
      montant: gain.gain,
      date: gain.createdAt,
      reference: gain.reference,
      operation: 'depot'
    }));

    const mappedTransactions = transactions.rows.map(transaction => ({
      nom: transaction.Medecin.nom,
      montant: transaction.amount,
      date: transaction.createdAt,
      reference: transaction.reference,
      operation: 'retrait'
    }));

    // Fusionner les deux listes en une seule
    const combinedData = [...mappedGains, ...mappedTransactions];

    // Renvoyer le résultat sous forme de JSON avec les informations de pagination
    res.status(200).json({
      total: gains.count + transactions.count,
      page,
      limit,
      data: combinedData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des données combinées." });
  }
}

module.exports = {
  getCombinedDataPage
};
