const { getPokemonById } = require('../services/pokemon');
const { getAllStatsAsArray } = require('../services/stats');
const { getAllTypesAsArray } = require('../services/type');

async function validatePokemon(form) {
  const errors = {};

  if (!form.name) {
    pushErrorOnKey(errors, 'name', 'Name is required');
  } else if (form.name.length > 50) {
    pushErrorOnKey(errors, 'name', 'Name cannot be bigger than 50');
  }

  if (!form.weight) {
    pushErrorOnKey(errors, 'weight', 'Weight is required');
  } else if (form.weight <= 0) {
    pushErrorOnKey(errors, 'name', 'Weight must be larger than 0');
  }

  if (!form.height) {
    pushErrorOnKey(errors, 'height', 'Height is required');
  } else if (form.height <= 0) {
    pushErrorOnKey(errors, 'name', 'Height must be larger than 0');
  }

  if (!form.sprites) {
    pushErrorOnKey(errors, 'sprites', 'Sprites are required');
  } else {
    if (!form.sprites.front) {
      pushErrorOnKey(errors, 'sprites', 'Front sprite is required');
    }

    if (!form.sprites.back) {
      pushErrorOnKey(errors, 'sprites', 'Back sprite is required');
    }
  }

  if (!form.types || form.types.length === 0) {
    pushErrorOnKey(errors, 'types', 'Types are required');
  } else {
    const types = await getAllTypesAsArray();

    form.types.forEach((type) => {
      if (!types.some((t) => t.id === type.id)) {
        pushErrorOnKey(
          errors,
          'types',
          `Type with id: ${type.id}, cannot be found`
        );
      }
    });
  }

  if (!form.stats || form.stats.length === 0) {
    pushErrorOnKey(errors, 'stats', 'Stats are required');
  } else {
    const stats = await getAllStatsAsArray();

    stats.forEach((stat) => {
      if (!form.stats.some((s) => s.name === stat.name)) {
        pushErrorOnKey(errors, 'stats', `${capitalize(stat.name)} is required`);
      }
    });

    form.stats.forEach((stat) => {
      if (!stats.some((s) => s.name === stat.name)) {
        pushErrorOnKey(
          errors,
          'stats',
          `Stat "${stat.name}" does not exist in the database`
        );
      } else if (stat.value <= 0) {
        pushErrorOnKey(
          errors,
          'stats',
          `${capitalize(stat.name)} must be larger than 0`
        );
      }
    });
  }

  if (Object.keys(errors).length > 0) {
    return Promise.reject(errors);
  }
}

async function validateEvolution(form) {
  const errors = {};

  if (!form.pokemon || form.pokemon.length === 0) {
    pushErrorOnKey(errors, 'pokemon', 'Pokemon ids are required');
  } else {
    // Set will contain all unique pokemon, used to 
    // check if the same pokemon is not added twice.
    const uniquePokemon = new Set();

    for (const formPokemon of form.pokemon) {
      const pokemon = await getPokemonById(formPokemon.id);
      
      uniquePokemon.add(formPokemon.id);

      if (!pokemon) {
        pushErrorOnKey(
          errors,
          'pokemon',
          `Pokemon with id: ${formPokemon.id}, cannot be found`
        );
      }
    }

    // Allow for an evolution chain of one.
    if (form.pokemon.length !== 1 && uniquePokemon.size !== form.pokemon.length) {
      pushErrorOnKey(
        errors,
        'pokemon',
        'A pokemon cannot be its own evolution'
      );
    }
  }

  if (Object.keys(errors).length > 0) {
    return Promise.reject(errors);
  }
}

function pushErrorOnKey(errors, key, error) {
  if (!errors[key]) {
    errors[key] = [];
  }

  errors[key].push(error);
}

function capitalize(stat) {
  const first = stat[0].toUpperCase();
  return first + stat.substring(1);
}

module.exports = {
  validatePokemon,
  validateEvolution,
};
