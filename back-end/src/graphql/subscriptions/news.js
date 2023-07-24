const { PubSub } = require('graphql-subscriptions');
const { sample } = require('../../utils/page');

const pubsub = new PubSub();

let intervalId;
function startNews() {
  // Show a sighting of a legendary pokemon in a region every second.
  intervalId = setInterval(() => {
    const pokemon = sample(LEGENDARY);
    const region = sample(REGIONS);

    const news = `${pokemon} sighted in: ${region}!`;

    pubsub.publish('news', { news });
  }, 5000);
}

function stopNews() {
  clearInterval(intervalId);
}

const news = {
  subscribe: () => pubsub.asyncIterator('news'),
};

module.exports = { news, startNews, stopNews };

// Helpers

const REGIONS = [
  'Kanto',
  'Johto',
  'Hoenn',
  'Sinnoh',
  'Unova',
  'Kalos',
  'Alola',
];

const LEGENDARY = ['Mewto', 'Articuno', 'Zapdos', 'Moltres'];

