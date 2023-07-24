const {
  getAllPokemonByTypeId
} = require('../../services/type');

function pokemon(type, args) {
  const { page, size } = args;

  return getAllPokemonByTypeId(type.id, page, size);
}

module.exports = {
  Type: {
    pokemon,
  },
};
