const {
  getAllTypes,
  getTypeById,
  getAllPokemonByTypeId,
} = require('../services/type');

const { typeDto, pokemonPageDto } = require('./dto');

const { applySprites } = require('./utils');

function typeController(app) {
  app.get('/api/types', async (req, res) => {
    const { page = 1, size = 10 } = req.query;

    const typePage = await getAllTypes(page, size);

    typePage.content = typePage.content.map(typeDto)

    res.json(typePage);
  });

  app.get('/api/types/:id', async (req, res) => {
    const { id } = req.params;

    const type = await getTypeById(id);

    res.json(typeDto(type));
  });

  app.get('/api/types/:id/pokemon', async (req, res) => {
    const { id } = req.params;
    const { page = 1, size = 10 } = req.query;

    const pokemonPage = await getAllPokemonByTypeId(id, page, size);

    await applySprites(pokemonPage.content);

    pokemonPage.content = pokemonPage.content.map(pokemonPageDto);

    res.json(pokemonPage);
  });
}

module.exports = {
  typeController,
};
