function getOffset(page, size) {
  return (page - 1) * size;
}

function getLimit(size) {
  return Math.min(size, 100);
}

function createPage({ totalElements, content, page, limit }) {
  const pageAsNumber = parseInt(page, 10);

  const totalPages = Math.ceil(totalElements / limit);

  return {
    content,
    last: totalPages === pageAsNumber || totalPages === 0,
    first: pageAsNumber === 1,
    totalElements,
    totalPages,
    size: limit,
    number: pageAsNumber,
  };
}

function makeRandomNumberGenerator(min, max) {
  return function () {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

module.exports = {
  getOffset,
  getLimit,
  createPage,
  makeRandomNumberGenerator,
  sample,
};
