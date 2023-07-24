const { start } = require('../src/index');

const { stopNews } = require('../src/graphql/resolvers');

function withServer(tests) {
  return async () => {
    const server = await start();

    try {
      await tests();
    } finally {
      stopNews();
      server.close();
    }
  };
}

module.exports = {
  withServer,
};
