const express = require('express');
const router = express.Router();
const StatusCompte = require('../models/accountState');
const { getIO } = require('../middleware/socketIo');

router.get('/status', async (req, res) => {
  try {
    const status = await StatusCompte.findOne({ where: { id: 1 } });
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Erreur de récupération du statut du compte' });
  }
});

/*router.post('/status', async (req, res) => {
  try {
    const { isFunded } = req.body;
    const status = await StatusCompte.update({ isFunded }, { where: { id: 1 } });
    console.log('Status:', status)
    onStatusUpdate(status);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Erreur de mise à jour du statut du compte' });
  }
});*/
router.post('/status', async (req, res) => {
  try {
    const { isFunded } = req.body;
    
    // Met à jour le statut
    const [numberOfAffectedRows] = await StatusCompte.update(
      { isFunded },
      { where: { id: 1 } }
    );
    
    if (numberOfAffectedRows > 0) {
      // Récupère le statut mis à jour
      const updatedStatus = await StatusCompte.findOne({ where: { id: 1 } });
      console.log('Status:', updatedStatus);
      onStatusUpdate(updatedStatus);
      res.json(updatedStatus); // Renvoie l'objet de statut mis à jour
    } else {
      res.status(404).json({ error: "Le statut n'a pas été trouvé ou mis à jour" });
    }
  } catch (error) {
    console.error('Erreur de mise à jour du statut du compte:', error);
    res.status(500).json({ error: 'Erreur de mise à jour du statut du compte' });
  }
});

function onStatusUpdate(data) {
  const io = getIO();
  io.emit('statusUpdate', { data });
}

module.exports = router;