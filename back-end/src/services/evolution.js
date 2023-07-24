const { getDb } = require('../db');

async function saveEvolution(form) {
  const seq = await getEvolutionNextSeq();
  
  for (const pokemon of form.pokemon) {
    // Remove the current evolutions for this pokemon.
    await deleteEvolution(pokemon.id);

    // Now insert the new evolution.
    await insertEvolution(pokemon.id, seq);
  }
}

async function deleteEvolution(pokemonID) {
  await getDb().run(`DELETE FROM pokemon_evolution WHERE pokemon_id = :id`, {
    ':id': pokemonID,
  });
}

async function insertEvolution(pokemonId, seq) {
  await getDb().run(
    `INSERT INTO pokemon_evolution (pokemon_id, seq) VALUES (:pokemon, :seq)`,
    { ':seq': seq, ':pokemon': pokemonId }
  );
}

async function getEvolutionNextSeq() {
  // Get last seq so we can increase it by one to create a new evolution chain.
  const { seq } = await getDb().get(
    `SELECT MAX(seq) AS seq FROM pokemon_evolution`
  );

  return seq + 1;
}

module.exports = {
  saveEvolution,
  deleteEvolution,
  insertEvolution,
  getEvolutionNextSeq,
};
