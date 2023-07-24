const axios = require('axios');
const { getEvolutionsOfPokemonById } = require('../../src/services/pokemon');

const { withServer } = require('../utils');

describe('REST API: evolution-controller', () => {
  describe('POST /evolution', () => {
    it(
      'should set the evolution chain for given pokemon',
      withServer(async () => {
        expect.assertions(6);

        // Make the starter pokemon evolutions of each other.
        const form = {
          pokemon: [
            {
              id: 1,
            },
            {
              id: 4,
            },
            {
              id: 7,
            },
          ],
        };

        const response = await axios.post(
          'http://localhost:4000/api/evolution',
          form
        );

        expect(response.status).toEqual(204);

        const bulbasaur = await getEvolutionsOfPokemonById(1);
        const charmander = await getEvolutionsOfPokemonById(4);
        const squirtle = await getEvolutionsOfPokemonById(7);

        // They should now all be part of the same evolutions chain.
        expect(bulbasaur).toEqual(squirtle);
        expect(squirtle).toEqual(charmander);

        const ivysaur = await getEvolutionsOfPokemonById(2);
        const charmeleon = await getEvolutionsOfPokemonById(5);
        const wartortle = await getEvolutionsOfPokemonById(8);

        // They should be removed from their original chains.
        expect(ivysaur.map((p) => p.name)).toEqual(['ivysaur', 'venusaur']);
        expect(charmeleon.map((p) => p.name)).toEqual([
          'charmeleon',
          'charizard',
        ]);
        expect(wartortle.map((p) => p.name)).toEqual([
          'wartortle',
          'blastoise',
        ]);
      })
    );

    it(
      'should when only one pokemon is provided delete evolution chain',
      withServer(async () => {
        expect.assertions(3);

        // Make the starter pokemon evolutions of each other.
        const form = {
          pokemon: [
            {
              id: 1,
            }
          ],
        };

        const response = await axios.post(
          'http://localhost:4000/api/evolution',
          form
        );

        expect(response.status).toEqual(204);

        const bulbasaur = await getEvolutionsOfPokemonById(1);
        const ivysaur = await getEvolutionsOfPokemonById(2);
        const venusaur = await getEvolutionsOfPokemonById(3);

        // Bulbasaur should be disconnected.
        expect(bulbasaur).not.toEqual(ivysaur);

        // Ivysaur and venusaur should still be a pair.
        expect(ivysaur).toEqual(venusaur);
      })
    );

    it(
      'should return errors when the form is empty',
      withServer(async () => {
        expect.assertions(2);

        const form = {};

        try {
          await axios.post('http://localhost:4000/api/evolution', form);
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "pokemon": [
                "Pokemon ids are required",
              ],
            }
          `);
        }
      })
    );

    it(
      'should return errors when pokemon is an empty array',
      withServer(async () => {
        expect.assertions(2);

        const form = {
          pokemon: [],
        };

        try {
          await axios.post('http://localhost:4000/api/evolution', form);
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "pokemon": [
                "Pokemon ids are required",
              ],
            }
          `);
        }
      })
    );

    it(
      'should return errors when provided pokemon do not exist',
      withServer(async () => {
        expect.assertions(2);

        const form = {
          pokemon: [
            {
              id: 4242,
            },
            {
              id: 1337,
              name: 'saiyan',
            },
          ],
        };

        try {
          await axios.post('http://localhost:4000/api/evolution', form);
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "pokemon": [
                "Pokemon with id: 4242, cannot be found",
                "Pokemon with id: 1337, cannot be found",
              ],
            }
          `);
        }
      })
    );

    it(
      'should return errors when a pokemon is set twice',
      withServer(async () => {
        expect.assertions(2);

        const form = {
          pokemon: [
            {
              id: 1,
            },
            {
              id: 2,
            },
            {
              id: 1,
            },
          ],
        };

        try {
          await axios.post('http://localhost:4000/api/evolution', form);
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "pokemon": [
                "A pokemon cannot be its own evolution",
              ],
            }
          `);
        }
      })
    );
  });
});
