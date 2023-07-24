const {
  getAllStatsAsArray
} = require('../services/stats');

const { statDto } = require('./dto');

function statsController(app) {
  app.get('/api/stats', async (req, res) => {
    const stats = await getAllStatsAsArray();
    res.json(stats.map(statDto));
  });
}

module.exports = {
  statsController,
};
