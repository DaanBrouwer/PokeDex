const {
  getEvolutionsOfPokemonById,
  getStatsOfPokemonById,
  getSpritesOfPokemonById,
  getTypesOfPokemonById,
} = require('../../services/pokemon');

function evolutions(pokemon) {
  return getEvolutionsOfPokemonById(pokemon.id);
}

function stats(pokemon) {
  return getStatsOfPokemonById(pokemon.id);
}

function sprites(pokemon) {
  return getSpritesOfPokemonById(pokemon.id);
}

function types(pokemon) {
  return getTypesOfPokemonById(pokemon.id);
}

function height(pokemon, args) {
  if (args.unit === 'METER') {
    return pokemon.height / 10;
  } else {
    return pokemon.height;
  }
}

function weight(pokemon, args) {
  if (args.unit === 'KILOGRAM') {
    return pokemon.weight / 10;
  } else {
    return pokemon.weight;
  }
}

module.exports = {
  Pokemon: {
    evolutions,
    stats,
    sprites,
    types,
    height,
    weight,
  },
};
