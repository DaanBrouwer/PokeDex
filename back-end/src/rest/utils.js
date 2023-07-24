const { randomUUID } = require('crypto'); 

const { getSpritesOfPokemonById } = require('../services/pokemon');

async function applySprites(pokemonList) {
  const sprites = await Promise.all(
    pokemonList.map((pokemon) => getSpritesOfPokemonById(pokemon.id))
  );

  pokemonList.forEach((pokemon, index) => {
    pokemon.sprites = sprites[index];
  });
}

function moveSprite(file) {
  const name = randomUUID() + '-' + file.name;

  const uploadPath = __dirname + '/../../uploads/' + name;

  return new Promise((resolve, reject) => {
    file.mv(uploadPath, function (err) {
      if (err) {
        reject(err);
      }

      resolve('http://localhost:3000/api/sprite/' + name);
    });
  });
}

module.exports = {
  applySprites,
  moveSprite
};
