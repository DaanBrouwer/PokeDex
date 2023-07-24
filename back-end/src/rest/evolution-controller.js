const { saveEvolution } = require('../services/evolution');

const { validateEvolution } = require('./validators');

function evolutionController(app) {
  app.post('/api/evolution', async (req, res) => {
    const form = req.body;

    try {
      await validateEvolution(form);

      await saveEvolution(form);

      res.status(204);
      res.json(null);
    } catch (errors) {
      res.status(422);
      res.json(errors);
    }
  });
}

module.exports = {
  evolutionController,
};
