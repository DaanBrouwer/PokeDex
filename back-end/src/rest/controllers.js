const { pokemonController } = require('./pokemon-controller');
const { typeController } = require('./type-controller');
const { spriteController } = require('./sprite-controller');
const { statsController } = require('./stats-controller');
const { weatherStationController } = require('./weatherstation-controller');
const { publicContoller } = require('./public-controller');
const { evolutionController } = require('./evolution-controller');

function controllers(app) {
  pokemonController(app);
  typeController(app);
  spriteController(app);
  statsController(app);
  weatherStationController(app);
  publicContoller(app);
  evolutionController(app);
}

module.exports = {
  controllers,
};
