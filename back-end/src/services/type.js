const { getDb } = require('../db');
const { getLimit, getOffset, createPage } = require('../utils/page');

async function getTypeById(id) {
  const query = `SELECT * FROM "type" WHERE id = $1`;

  return getDb().get(query, [id]);
}

async function getAllTypes(page, size) {
  const countQuery = `SELECT COUNT(id) AS count FROM "type"`;
  const count = getDb().get(countQuery);

  const limit = getLimit(size);
  const offset = getOffset(page, size);

  const typeQuery = `SELECT * FROM "type" LIMIT $1 OFFSET $2`;
  const types = getDb().all(typeQuery, [limit, offset]);

  const [countResult, content] = await Promise.all([count, types]);

  return createPage({
    totalElements: countResult.count,
    content,
    page,
    limit,
  });
}

async function getAllPokemonByTypeId(id, page, size) {
  const countQuery = `
      SELECT count(t.id) as count FROM "type" AS t
      JOIN pokemon_type AS pt ON (pt.type_id = t.id)
      WHERE t.id = $1
    `;
  const count = getDb().get(countQuery, [id]);

  const limit = getLimit(size);
  const offset = getOffset(page, size);

  const pokemonQuery = `
      SELECT p.* FROM pokemon AS p
      JOIN pokemon_type AS pt ON (pt.pokemon_id = p.id)
      WHERE pt.type_id = $1
      LIMIT $2 OFFSET $3
    `;

  const pokemon = getDb().all(pokemonQuery, [id, limit, offset]);

  const [countResult, content] = await Promise.all([count, pokemon]);

  return createPage({
    totalElements: countResult.count,
    content,
    page,
    limit,
  });
}

async function getAllTypesAsArray() {  
  const query = `SELECT * FROM "type"`;

  return getDb().all(query);
}

module.exports = {
  getAllTypes,
  getAllPokemonByTypeId,
  getTypeById,
  getAllTypesAsArray
}