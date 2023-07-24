const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { ApolloServer } = require('apollo-server-express');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');

const { setupDatabase } = require('./db');

const { typeDefs } = require('./graphql/types.graphqls');
const { resolvers, startNews } = require('./graphql/resolvers');

const { controllers } = require('./rest/controllers');

const {
  generateWeatherstationData,
  generateHistoricalWeatherstationData,
} = require('./services/weatherstation');

async function start() {
  await setupDatabase();

  const app = express();

  // Handle file uploads
  app.use(fileUpload({ debug: false }));

  // parse application/json
  app.use(bodyParser.json());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: '/api/' + server.graphqlPath }
  );

  await server.start();
  server.applyMiddleware({ app, path: '/api/graphql' });

  controllers(app);

  const PORT = 4000;
  httpServer.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(`REST API is now running on http://localhost:${PORT}/api`);
      console.log(
        `GraphQL is now running on http://localhost:${PORT}/api/graphql`
      );
    }
  });

  // Remove previous uploads
  const files = await fs.readdir(__dirname + '/../uploads/');
  const unlinks = files.map((e) => fs.unlink(path.join('uploads', e)));
  await Promise.all(unlinks);

  startNews();

  if (process.env.NODE_ENV !== 'test') {
    await generateHistoricalWeatherstationData();
  } else {
    // For the test only generate one data point
    await generateWeatherstationData();
  }

  return httpServer;
}

if (process.env.NODE_ENV !== 'test') {
  start();
}

module.exports = { start };
