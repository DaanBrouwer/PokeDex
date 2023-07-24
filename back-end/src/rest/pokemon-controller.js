const {
  getAllPokemon,
  getPokemonById,
  getEvolutionsOfPokemonById,
  getTypesOfPokemonById,
  getSpritesOfPokemonById,
  getStatsOfPokemonById,
  savePokemon,
  updatePokemon,
  deletePokemon,
} = require('../services/pokemon');

const { pokemonDto, pokemonPageDto } = require('./dto');
const { applySprites, moveSprite } = require('./utils');
const { validatePokemon } = require('./validators');

function pokemonController(app) {
  app.get('/api/pokemon', async (req, res) => {
    const { page = 1, size = 10, query } = req.query;

    const pokemonPage = await getAllPokemon(page, size, query);

    await applySprites(pokemonPage.content);

    pokemonPage.content = pokemonPage.content.map(pokemonPageDto);

    res.json(pokemonPage);
  });

  async function getFullPokemonById(id, fetchedPokemon = undefined) {
    const [pokemon, types, stats, sprites] = await Promise.all([
      fetchedPokemon ? fetchedPokemon : getPokemonById(id),
      getTypesOfPokemonById(id),
      getStatsOfPokemonById(id),
      getSpritesOfPokemonById(id),
    ]);

    return pokemonDto({ ...pokemon, types, sprites, stats });
  }

  app.get('/api/pokemon/:id', async (req, res) => {
    const { id } = req.params;

    const pokemon = await getPokemonById(id);

    if (!pokemon) {
      res.status(404);
      res.json({ error: 'pokemon does not exist' });
      return;
    }

    const fullPokemon = await getFullPokemonById(id, pokemon);

    res.json(fullPokemon);
  });

  app.get('/api/pokemon/:id/evolutions', async (req, res) => {
    const { id } = req.params;

    const evolutions = await getEvolutionsOfPokemonById(id);

    await applySprites(evolutions);

    res.json(evolutions.map(pokemonPageDto));
  });

  app.post('/api/pokemon', async (req, res) => {
    const form = JSON.parse(req.body.form);

    try {
      form.sprites = undefined;

      if (req.files) {
        form.sprites = {};

        if (req.files.front) {
          const front = await moveSprite(req.files.front);
          form.sprites.front = front;
        }

        if (req.files.back) {
          const back = await moveSprite(req.files.back);
          form.sprites.back = back;
        }
      }

      await validatePokemon(form);

      const id = await savePokemon(form);

      const fullPokemon = await getFullPokemonById(id);

      res.status(201);
      res.json(fullPokemon);
    } catch (errors) {
      res.status(422);
      res.json(errors);
    }
  });

  app.put('/api/pokemon/:id', async (req, res) => {
    const { id } = req.params;

    const pokemon = await getPokemonById(id);

    if (!pokemon) {
      res.status(404);
      res.json({ error: 'pokemon does not exist' });
      return;
    }

    const form = JSON.parse(req.body.form);

    try {
      if (req.files) {
        if (req.files.front) {
          const front = await moveSprite(req.files.front);
          form.sprites.front = front;
        }

        if (req.files.back) {
          const back = await moveSprite(req.files.back);
          form.sprites.back = back;
        }
      }

      await validatePokemon(form);

      await updatePokemon(id, form);

      const fullPokemon = await getFullPokemonById(id);

      res.status(200);
      res.json(fullPokemon);
    } catch (errors) {
      res.status(422);
      res.json(errors);
    }
  });

  app.delete('/api/pokemon/:id', async (req, res) => {
    const { id } = req.params;

    const pokemon = await getPokemonById(id);

    if (!pokemon) {
      res.status(404);
      res.json({ error: 'pokemon does not exist' });
      return;
    }

    await deletePokemon(pokemon);

    res.status(204);
    res.json(null);
  });
}

module.exports = {
  pokemonController,
};
