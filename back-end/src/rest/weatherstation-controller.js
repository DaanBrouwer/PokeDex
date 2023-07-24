const {
  getWeatherstationById,
  getAllWeatherstations,
  getLast1000WeatherstationMeasurementsByIdAndType,
  MEASUREMENTS,
  MODES,
} = require('../services/weatherstation');

const { weatherstationDto, measurementsDto } = require('./dto');

function weatherStationController(app) {
  app.get('/api/weatherstation', async (req, res) => {
    const { page = 1, size = 10, query } = req.query;

    const weatherstationsPage = await getAllWeatherstations(page, size, query);

    weatherstationsPage.content =
      weatherstationsPage.content.map(weatherstationDto);

    res.json(weatherstationsPage);
  });

  app.get('/api/weatherstation/:id', async (req, res) => {
    const { id } = req.params;

    const weatherStation = await getWeatherstationById(id);

    if (!weatherStation) {
      res.status(404);
      res.json({ error: 'weatherstation does not exist' });
      return;
    }

    res.json(weatherstationDto(weatherStation));
  });

  app.get('/api/weatherstation/:id/:type/:mode', async (req, res) => {
    const { id, type, mode } = req.params;

    if (!type || !MEASUREMENTS.includes(type.toUpperCase())) {
      res.status(400);
      res.json({ error: 'unknown type' });
      return;
    }

    if (type.toUpperCase() === 'STATUS') {
      res.status(400);
      res.json({ error: 'status does not have history' });
      return;
    }

    if (!mode || !MODES.includes(mode.toUpperCase())) {
      res.status(400);
      res.json({ error: 'unknown mode' });
      return;
    }

    const weatherStation = await getWeatherstationById(id);

    if (!weatherStation) {
      res.status(404);
      res.json({ error: 'weatherstation does not exist' });
      return;
    }

    const measurements = await getLast1000WeatherstationMeasurementsByIdAndType(
      weatherStation.id,
      type.toUpperCase(),
      mode.toUpperCase()
    );

    res.json(measurementsDto(measurements));
  });
}

module.exports = {
  weatherStationController,
};
