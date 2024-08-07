const Gain = require('../../models/gain');
const Patient = require('../../models/patient');

// Définition de la fonction pour récupérer les données et construire le JSON
async function getDepotData(req, res) {
  try {
    // Récupérer les gains avec les informations sur les patients associés
    const gains = await Gain.findAll({
      include: [{
        model: Patient,
        attributes: ['nom'] // Récupérer seulement le nom du patient
      }],
      limit: 5
    });

    // Mapper les gains et les transactions dans un format uniforme pour le JSON final
    const mappedGains = gains.map(gain => ({
      nom: gain.Patient.nom,
      montant: gain.gain,
      date: gain.createdAt,
      reference: gain.reference,
      operation: 'depot'
    }));

    // Fusionner les deux listes en une seule
    const combinedData = [...mappedGains];

    // Renvoyer le résultat sous forme de JSON
    res.status(200).json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des données combinées." });
  }
}

module.exports = {
  getDepotData
};