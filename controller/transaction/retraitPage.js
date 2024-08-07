const Transaction = require('../../models/transaction');
const Medecin = require('../../models/medecin');

// Définition de la fonction pour récupérer les données et construire le JSON
async function getRetraitDataPage(req, res) {
  try {
    // Récupérer les paramètres de pagination de la requête
    const page = parseInt(req.params.page) || 1;
    const limit = parseInt(req.params.limit) || 5;
    const offset = (page - 1) * limit;

    // Récupérer les transactions avec les informations sur les médecins associés
    const transactions = await Transaction.findAll({
      include: [{
        model: Medecin,
        attributes: ['nom'] // Récupérer seulement le nom du médecin
      }],
      limit,
      offset
    });

    // Mapper les gains et les transactions dans un format uniforme pour le JSON final

    const mappedTransactions = transactions.map(transaction => ({
      nom: transaction.Medecin.nom,
      montant: transaction.amount,
      date: transaction.createdAt,
      reference: transaction.reference,
      operation: 'retrait'
    }));

    // Fusionner les deux listes en une seule
    const combinedData = [...mappedTransactions];

    // Renvoyer le résultat sous forme de JSON
    res.status(200).json({
      total: transactions.count,
      page,
      limit,
      data: combinedData
    });
    //res.status(200).json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des données combinées." });
  }
}

module.exports = {
  getRetraitDataPage
};