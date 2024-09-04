const TestMedical = require('../../models/testMedical');
const { ValidationError, UniqueConstraintError } = require('sequelize');

exports.updateTestMed = async (req, res) => {
  const testMedicals = req.body; // Supposons que req.body est un tableau d'objets avec 'id' pour chaque test

  try {
    const updatePromises = testMedicals.map(async test => {
      const { id, nom, montant } = test; // Extraire les champs à mettre à jour

      // Trouver l'enregistrement à mettre à jour
      const testMed = await TestMedical.findByPk(id);
      if (!testMed) {
        throw new Error(`Le test médical avec l'id ${id} n'existe pas.`);
      }

      // Mettre à jour l'enregistrement
      await testMed.update({ nom, montant });
      return testMed;
    });

    const updatedTests = await Promise.all(updatePromises);

    const message = `${updatedTests.length} tests médicaux ont bien été mis à jour.`;
    res.json({ message, data: updatedTests });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    const message = `Les tests médicaux n'ont pas pu être mis à jour. Réessayez dans quelques instants.`;
    res.status(500).json({ message, data: error.message });
  }
};


/*const TestMedical = require('../../models/testMedical');
const { ValidationError, UniqueConstraintError } = require('sequelize')

exports.updateTestMed = async (req, res) => {
  const id = req.params.id
  await TestMedical.update(req.body, {
    where: { id: id }
  })
  .then(_ => {
    return TestMedical.findByPk(id).then(testmed => {
      if(testmed === null) {
        const message = `Le test medical demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const message = `Le test medical ${testmed.nom} a bien été modifié.`
      res.json({message, data: testmed })
    })
  })
  .catch(error => {
    if(error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    if(error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: error.message, data: error });
    }
    const message = `Le test medical n'a pas pu être modifié. Réessayez dans quelques instants.`
    res.status(500).json({ message, data: error })
  })
}*/