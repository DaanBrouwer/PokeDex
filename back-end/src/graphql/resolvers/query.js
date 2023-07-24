const { getPokemonById, getAllPokemon } = require('../../services/pokemon');

const { getAllTypes, getTypeById } = require('../../services/type');
const { getAllWeatherstations, getWeatherstationById } = require('../../services/weatherstation');

function pokemon(obj, args) {
  return getPokemonById(args.id);
}

function allPokemon(obj, args) {
  const { page, size, query } = args;

  return getAllPokemon(page, size, query);
}

function type(obj, args) {
  return getTypeById(args.id);
}

function allTypes(obj, args) {
  const { page, size } = args;

  return getAllTypes(page, size);
}

function allWeatherstations(obj, args) {
  const { page, size, query } = args;

  return getAllWeatherstations(page, size, query);
}

function weatherstation(obj, args) {
  return getWeatherstationById(args.id);
}

module.exports = {
  Query: {
    pokemon,
    allPokemon,
    allTypes,
    type,
    allWeatherstations,
    weatherstation
  },
};
