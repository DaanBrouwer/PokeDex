const { db } = require('../db');

const { Query } = require('./resolvers/query');
const { Pokemon } = require('./resolvers/pokemon');
const { Type } = require('./resolvers/type');
const { Weatherstation } = require('./resolvers/weatherstation');

const { news, startNews, stopNews } = require('./subscriptions/news');

const resolvers = {
  Query,
  Pokemon,
  Type,
  Weatherstation,
  Subscription: {
    news
  }
};

module.exports = { resolvers, startNews, stopNews };