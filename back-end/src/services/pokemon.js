const { getDb } = require('../db');
const { deleteEvolution, insertEvolution, getEvolutionNextSeq } = require('./evolution');
const { getLimit, getOffset, createPage } = require('../utils/page');

function getPokemonById(id) {
  const query = `SELECT * FROM pokemon WHERE id = $1`;

  return getDb().get(query, [id]);
}

async function getAllPokemon(page, size, query) {
  const escapedQuery = `%${query}%`;

  const countQuery = query
    ? `SELECT COUNT(id) AS count FROM pokemon WHERE name LIKE $1`
    : `SELECT COUNT(id) AS count FROM pokemon`;
  const count = getDb().get(countQuery, query ? [escapedQuery] : []);

  const limit = getLimit(size);
  const offset = getOffset(page, size);
  const pokemonQuery = query
    ? `SELECT * FROM pokemon WHERE name LIKE $1 LIMIT $2 OFFSET $3`
    : `SELECT * FROM pokemon LIMIT $1 OFFSET $2`;

  const pokemon = getDb().all(
    pokemonQuery,
    query ? [escapedQuery, limit, offset] : [limit, offset]
  );

  const [countResult, content] = await Promise.all([count, pokemon]);

  return createPage({
    totalElements: countResult.count,
    content,
    page,
    limit,
  });
}

function getEvolutionsOfPokemonById(id) {
  const query = `
      SELECT p.*, e.seq FROM pokemon AS p
      JOIN pokemon_evolution AS e ON e.pokemon_id = p.id
      WHERE e.seq = (SELECT seq FROM pokemon_evolution WHERE pokemon_id = $1)
      ORDER by e.seq
    `;

  return getDb().all(query, [id]);
}

function getStatsOfPokemonById(id) {
  const query = `
    SELECT ps.value, s.id, s.name FROM pokemon_stat AS ps
    JOIN stat AS s ON s.id = ps.stat_id
    WHERE ps.pokemon_id = $1`;

  return getDb().all(query, [id]);
}

function getSpritesOfPokemonById(id) {
  const query = `SELECT * FROM sprite WHERE pokemon_id = $1`;

  return getDb().get(query, [id]);
}

function getTypesOfPokemonById(id) {
  const query = `
      SELECT t.* FROM "type" AS t
      JOIN pokemon_type AS pt ON (pt.type_id = t.id)
      WHERE pt.pokemon_id = $1
    `;

  return getDb().all(query, [id]);
}

async function savePokemon(form) {
  // Insert pokemon
  const pokemon = await getDb().run(
    `INSERT INTO pokemon ( name, height, weight) VALUES (:name, :height, :weight)`,
    {
      ':name': form.name,
      ':height': form.height,
      ':weight': form.weight,
    }
  );

  const seq = await getEvolutionNextSeq();
  await insertEvolution(pokemon.lastID, seq);

  // Insert pokemon_type
  for (const type of form.types) {
    const index = form.types.indexOf(type);
    await getDb().run(
      `INSERT INTO pokemon_type (pokemon_id, type_id, seq) VALUES (:pokemon, :type, :seq)`,
      {
        ':pokemon': pokemon.lastID,
        ':type': type.id,
        ':seq': index,
      }
    );
  }

  // Insert sprites
  await getDb().run(
    `INSERT INTO sprite (pokemon_id, front, back) VALUES (:pokemon, :front, :back);`,
    {
      ':pokemon': pokemon.lastID,
      ':front': form.sprites.front,
      ':back': form.sprites.back,
    }
  );

  // Insert stats
  for (const stat of form.stats) {
    await getDb().run(
      `INSERT INTO pokemon_stat (pokemon_id, stat_id, value) VALUES (:pokemon, :stat, :value)`,
      {
        ':pokemon': pokemon.lastID,
        ':stat': stat.id,
        ':value': stat.value,
      }
    );
  }

  return pokemon.lastID;
}

async function updatePokemon(id, form) {
  // update pokemon
  await getDb().run(
    `UPDATE pokemon SET 
       name = :name, 
       height = :height, 
       weight = :weight 
     WHERE id = :id`,
    {
      ':id': id,
      ':name': form.name,
      ':height': form.height,
      ':weight': form.weight,
    }
  );

  // update pokemon_type
  await getDb().run(`DELETE FROM pokemon_type WHERE pokemon_id = :id`, {
    ':id': id,
  });
  for (const type of form.types) {
    const index = form.types.indexOf(type);
    await getDb().run(
      `INSERT INTO pokemon_type (pokemon_id, type_id, seq) VALUES (:pokemon, :type, :seq)`,
      {
        ':pokemon': id,
        ':type': type.id,
        ':seq': index,
      }
    );
  }

  // update sprites
  await getDb().run(
    `UPDATE sprite SET
      front = :front,
      back = :back
    WHERE pokemon_id = :id;`,
    {
      ':id': id,
      ':front': form.sprites.front,
      ':back': form.sprites.back,
    }
  );

  // update stats
  await getDb().run(`DELETE FROM pokemon_stat WHERE pokemon_id = :id`, {
    ':id': id,
  });
  for (const stat of form.stats) {
    await getDb().run(
      `INSERT INTO pokemon_stat (pokemon_id, stat_id, value) VALUES (:pokemon, :stat, :value)`,
      {
        ':pokemon': id,
        ':stat': stat.id,
        ':value': stat.value,
      }
    );
  }

  return form.id;
}

async function deletePokemon(pokemon) {
  // delete pokemon
  await getDb().run(`DELETE FROM pokemon WHERE id = :id`, {
    ':id': pokemon.id,
  });

  // delete pokemon_type
  await getDb().run(`DELETE FROM pokemon_type WHERE pokemon_id = :id`, {
    ':id': pokemon.id,
  });

  // delete sprites
  await getDb().run(`DELETE FROM sprite WHERE pokemon_id = :id`, {
    ':id': pokemon.id,
  });

  // delete stats
  await getDb().run(`DELETE FROM pokemon_stat WHERE pokemon_id = :id`, {
    ':id': pokemon.id,
  });

  await deleteEvolution(pokemon.id);
}

module.exports = {
  getPokemonById,
  getAllPokemon,
  getEvolutionsOfPokemonById,
  getStatsOfPokemonById,
  getSpritesOfPokemonById,
  getTypesOfPokemonById,
  savePokemon,
  updatePokemon,
  deletePokemon,
};
