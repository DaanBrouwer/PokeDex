const axios = require("axios");

const { withServer } = require("./utils");

describe("GraphQL API", () => {
  it(
    "the api should work",
    withServer(async () => {
      const query = `{
        allPokemon(page: 1, size: 10, query: "saur") {
          first
          last
          totalElements
          totalPages
          content {
            id
            name
            height
            weight
            sprites {
              front
              back
            }
            stats {
              id
              name
              value
            }
            types {
              id
              name
            }
            evolutions {
              id
              name
              stats {
                id,
                name
              }
            }
          }
        }
      }      
    `;

      const response = await axios.post("http://localhost:4000/api/graphql", {
        query,
      });

      expect(response.status).toBe(200);
      expect(response.data).toMatchInlineSnapshot(`
        {
          "data": {
            "allPokemon": {
              "content": [
                {
                  "evolutions": [
                    {
                      "id": "1",
                      "name": "bulbasaur",
                      "stats": [
                        {
                          "id": "1",
                          "name": "hp",
                        },
                        {
                          "id": "2",
                          "name": "attack",
                        },
                        {
                          "id": "3",
                          "name": "defense",
                        },
                        {
                          "id": "4",
                          "name": "special-attack",
                        },
                        {
                          "id": "5",
                          "name": "special-defense",
                        },
                        {
                          "id": "6",
                          "name": "speed",
                        },
                      ],
                    },
                    {
                      "id": "2",
                      "name": "ivysaur",
                      "stats": [
                        {
                          "id": "1",
                          "name": "hp",
                        },
                        {
                          "id": "2",
                          "name": "attack",
                        },
                        {
                          "id": "3",
                          "name": "defense",
                        },
                        {
                          "id": "4",
                          "name": "special-attack",
                        },
                        {
                          "id": "5",
                          "name": "special-defense",
                        },
                        {
                          "id": "6",
                          "name": "speed",
                        },
                      ],
                    },
                    {
                      "id": "3",
                      "name": "venusaur",
                      "stats": [
                        {
                          "id": "1",
                          "name": "hp",
                        },
                        {
                          "id": "2",
                          "name": "attack",
                        },
                        {
                          "id": "3",
                          "name": "defense",
                        },
                        {
                          "id": "4",
                          "name": "special-attack",
                        },
                        {
                          "id": "5",
                          "name": "special-defense",
                        },
                        {
                          "id": "6",
                          "name": "speed",
                        },
                      ],
                    },
                  ],
                  "height": 0.7,
                  "id": "1",
                  "name": "bulbasaur",
                  "sprites": {
                    "back": "http://localhost:4000/api/public/sprites/1-back.png",
                    "front": "http://localhost:4000/api/public/sprites/1-front.png",
                  },
                  "stats": [
                    {
                      "id": "1",
                      "name": "hp",
                      "value": 45,
                    },
                    {
                      "id": "2",
                      "name": "attack",
                      "value": 49,
                    },
                    {
                      "id": "3",
                      "name": "defense",
                      "value": 49,
                    },
                    {
                      "id": "4",
                      "name": "special-attack",
                      "value": 65,
                    },
                    {
                      "id": "5",
                      "name": "special-defense",
                      "value": 65,
                    },
                    {
                      "id": "6",
                      "name": "speed",
                      "value": 45,
                    },
                  ],
                  "types": [
                    {
                      "id": "12",
                      "name": "grass",
                    },
                    {
                      "id": "4",
                      "name": "poison",
                    },
                  ],
                  "weight": 6.9,
                },
                {
                  "evolutions": [
                    {
                      "id": "1",
                      "name": "bulbasaur",
                      "stats": [
                        {
                          "id": "1",
                          "name": "hp",
                        },
                        {
                          "id": "2",
                          "name": "attack",
                        },
                        {
                          "id": "3",
                          "name": "defense",
                        },
                        {
                          "id": "4",
                          "name": "special-attack",
                        },
                        {
                          "id": "5",
                          "name": "special-defense",
                        },
                        {
                          "id": "6",
                          "name": "speed",
                        },
                      ],
                    },
                    {
                      "id": "2",
                      "name": "ivysaur",
                      "stats": [
                        {
                          "id": "1",
                          "name": "hp",
                        },
                        {
                          "id": "2",
                          "name": "attack",
                        },
                        {
                          "id": "3",
                          "name": "defense",
                        },
                        {
                          "id": "4",
                          "name": "special-attack",
                        },
                        {
                          "id": "5",
                          "name": "special-defense",
                        },
                        {
                          "id": "6",
                          "name": "speed",
                        },
                      ],
                    },
                    {
                      "id": "3",
                      "name": "venusaur",
                      "stats": [
                        {
                          "id": "1",
                          "name": "hp",
                        },
                        {
                          "id": "2",
                          "name": "attack",
                        },
                        {
                          "id": "3",
                          "name": "defense",
                        },
                        {
                          "id": "4",
                          "name": "special-attack",
                        },
                        {
                          "id": "5",
                          "name": "special-defense",
                        },
                        {
                          "id": "6",
                          "name": "speed",
                        },
                      ],
                    },
                  ],
                  "height": 1,
                  "id": "2",
                  "name": "ivysaur",
                  "sprites": {
                    "back": "http://localhost:4000/api/public/sprites/2-back.png",
                    "front": "http://localhost:4000/api/public/sprites/2-front.png",
                  },
                  "stats": [
                    {
                      "id": "1",
                      "name": "hp",
                      "value": 60,
                    },
                    {
                      "id": "2",
                      "name": "attack",
                      "value": 62,
                    },
                    {
                      "id": "3",
                      "name": "defense",
                      "value": 63,
                    },
                    {
                      "id": "4",
                      "name": "special-attack",
                      "value": 80,
                    },
                    {
                      "id": "5",
                      "name": "special-defense",
                      "value": 80,
                    },
                    {
                      "id": "6",
                      "name": "speed",
                      "value": 60,
                    },
                  ],
                  "types": [
                    {
                      "id": "12",
                      "name": "grass",
                    },
                    {
                      "id": "4",
                      "name": "poison",
                    },
                  ],
                  "weight": 13,
                },
                {
                  "evolutions": [
                    {
                      "id": "1",
                      "name": "bulbasaur",
                      "stats": [
                        {
                          "id": "1",
                          "name": "hp",
                        },
                        {
                          "id": "2",
                          "name": "attack",
                        },
                        {
                          "id": "3",
                          "name": "defense",
                        },
                        {
                          "id": "4",
                          "name": "special-attack",
                        },
                        {
                          "id": "5",
                          "name": "special-defense",
                        },
                        {
                          "id": "6",
                          "name": "speed",
                        },
                      ],
                    },
                    {
                      "id": "2",
                      "name": "ivysaur",
                      "stats": [
                        {
                          "id": "1",
                          "name": "hp",
                        },
                        {
                          "id": "2",
                          "name": "attack",
                        },
                        {
                          "id": "3",
                          "name": "defense",
                        },
                        {
                          "id": "4",
                          "name": "special-attack",
                        },
                        {
                          "id": "5",
                          "name": "special-defense",
                        },
                        {
                          "id": "6",
                          "name": "speed",
                        },
                      ],
                    },
                    {
                      "id": "3",
                      "name": "venusaur",
                      "stats": [
                        {
                          "id": "1",
                          "name": "hp",
                        },
                        {
                          "id": "2",
                          "name": "attack",
                        },
                        {
                          "id": "3",
                          "name": "defense",
                        },
                        {
                          "id": "4",
                          "name": "special-attack",
                        },
                        {
                          "id": "5",
                          "name": "special-defense",
                        },
                        {
                          "id": "6",
                          "name": "speed",
                        },
                      ],
                    },
                  ],
                  "height": 2,
                  "id": "3",
                  "name": "venusaur",
                  "sprites": {
                    "back": "http://localhost:4000/api/public/sprites/3-back.png",
                    "front": "http://localhost:4000/api/public/sprites/3-front.png",
                  },
                  "stats": [
                    {
                      "id": "1",
                      "name": "hp",
                      "value": 80,
                    },
                    {
                      "id": "2",
                      "name": "attack",
                      "value": 82,
                    },
                    {
                      "id": "3",
                      "name": "defense",
                      "value": 83,
                    },
                    {
                      "id": "4",
                      "name": "special-attack",
                      "value": 100,
                    },
                    {
                      "id": "5",
                      "name": "special-defense",
                      "value": 100,
                    },
                    {
                      "id": "6",
                      "name": "speed",
                      "value": 80,
                    },
                  ],
                  "types": [
                    {
                      "id": "12",
                      "name": "grass",
                    },
                    {
                      "id": "4",
                      "name": "poison",
                    },
                  ],
                  "weight": 100,
                },
              ],
              "first": true,
              "last": true,
              "totalElements": 3,
              "totalPages": 1,
            },
          },
        }
      `);
    })
  );
});
