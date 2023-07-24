const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const { withServer } = require("../utils");

describe("REST API: pokemon-controller", () => {
  describe("GET /pokemon", () => {
    it(
      "should know how to fetch all pokemon in a page.",
      withServer(async () => {
        expect.assertions(2);

        const response = await axios.get("http://localhost:4000/api/pokemon", {
          params: { page: 1, size: 10, query: undefined },
        });

        expect(response.status).toBe(200);
        expect(response.data).toMatchInlineSnapshot(`
          {
            "content": [
              {
                "id": 1,
                "name": "bulbasaur",
                "sprite": "http://localhost:4000/api/public/sprites/1-front.png",
              },
              {
                "id": 2,
                "name": "ivysaur",
                "sprite": "http://localhost:4000/api/public/sprites/2-front.png",
              },
              {
                "id": 3,
                "name": "venusaur",
                "sprite": "http://localhost:4000/api/public/sprites/3-front.png",
              },
              {
                "id": 4,
                "name": "charmander",
                "sprite": "http://localhost:4000/api/public/sprites/4-front.png",
              },
              {
                "id": 5,
                "name": "charmeleon",
                "sprite": "http://localhost:4000/api/public/sprites/5-front.png",
              },
              {
                "id": 6,
                "name": "charizard",
                "sprite": "http://localhost:4000/api/public/sprites/6-front.png",
              },
              {
                "id": 7,
                "name": "squirtle",
                "sprite": "http://localhost:4000/api/public/sprites/7-front.png",
              },
              {
                "id": 8,
                "name": "wartortle",
                "sprite": "http://localhost:4000/api/public/sprites/8-front.png",
              },
              {
                "id": 9,
                "name": "blastoise",
                "sprite": "http://localhost:4000/api/public/sprites/9-front.png",
              },
              {
                "id": 10,
                "name": "caterpie",
                "sprite": "http://localhost:4000/api/public/sprites/10-front.png",
              },
            ],
            "first": true,
            "last": false,
            "number": 1,
            "size": 10,
            "totalElements": 150,
            "totalPages": 15,
          }
        `);
      })
    );

    it(
      "should limit the number of pokemon per page to 100",
      withServer(async () => {
        expect.assertions(4);

        const response = await axios.get("http://localhost:4000/api/pokemon", {
          params: { page: 1, size: 101, query: undefined },
        });

        expect(response.status).toBe(200);
        expect(response.data.content.length).toBe(100);
        expect(response.data.totalPages).toBe(2);
        expect(response.data.totalElements).toBe(150);
      })
    );

    it(
      "should know how to get the first page",
      withServer(async () => {
        expect.assertions(2);

        const response = await axios.get("http://localhost:4000/api/pokemon", {
          params: { page: 1, size: 10, query: undefined },
        });

        expect(response.status).toBe(200);
        expect(response.data.first).toBe(true);
      })
    );

    it(
      "should know how to get the last page",
      withServer(async () => {
        expect.assertions(2);

        const response = await axios.get("http://localhost:4000/api/pokemon", {
          params: { page: 15, size: 10, query: undefined },
        });

        expect(response.status).toBe(200);
        expect(response.data.last).toBe(true);
      })
    );

    it(
      "should use default values for when page and size are missing",
      withServer(async () => {
        expect.assertions(4);

        const response = await axios.get("http://localhost:4000/api/pokemon", {
          params: {},
        });

        expect(response.status).toBe(200);
        expect(response.data.first).toBe(true);
        expect(response.data.number).toBe(1);
        expect(response.data.content.length).toBe(10);
      })
    );

    it(
      "should when query is provided filter results based on pokemon name",
      withServer(async () => {
        expect.assertions(5);

        const response = await axios.get("http://localhost:4000/api/pokemon", {
          params: { page: 1, size: 10, query: "saur" },
        });

        expect(response.status).toBe(200);
        expect(response.data.totalPages).toBe(1);
        expect(response.data.totalElements).toBe(3);
        expect(response.data.content.length).toBe(3);
        expect(response.data.content.map((pokemon) => pokemon.name)).toEqual([
          "bulbasaur",
          "ivysaur",
          "venusaur",
        ]);
      })
    );

    it(
      "should even paginate when query filter provides to many results",
      withServer(async () => {
        expect.assertions(4);

        const response = await axios.get("http://localhost:4000/api/pokemon", {
          params: { page: 1, size: 10, query: "a" },
        });

        expect(response.status).toBe(200);
        expect(response.data.totalPages).toBe(9);
        expect(response.data.totalElements).toBe(85);
        expect(response.data.content.length).toBe(10);
      })
    );
  });

  describe("GET /pokemon/:id", () => {
    it(
      "show know how to fetch a pokemon by id",
      withServer(async () => {
        expect.assertions(2);

        const response = await axios.get("http://localhost:4000/api/pokemon/1");

        expect(response.status).toBe(200);
        expect(response.data).toMatchInlineSnapshot(`
          {
            "height": 7,
            "id": 1,
            "name": "bulbasaur",
            "sprites": {
              "back": "http://localhost:4000/api/public/sprites/1-back.png",
              "front": "http://localhost:4000/api/public/sprites/1-front.png",
            },
            "stats": [
              {
                "id": 1,
                "name": "hp",
                "value": 45,
              },
              {
                "id": 2,
                "name": "attack",
                "value": 49,
              },
              {
                "id": 3,
                "name": "defense",
                "value": 49,
              },
              {
                "id": 4,
                "name": "special-attack",
                "value": 65,
              },
              {
                "id": 5,
                "name": "special-defense",
                "value": 65,
              },
              {
                "id": 6,
                "name": "speed",
                "value": 45,
              },
            ],
            "types": [
              {
                "icon": "http://localhost:4000/api/public/types/grass.png",
                "id": 12,
                "name": "grass",
              },
              {
                "icon": "http://localhost:4000/api/public/types/poison.png",
                "id": 4,
                "name": "poison",
              },
            ],
            "weight": 69,
          }
        `);
      })
    );

    it(
      "should return a 404 when pokemon does not exist",
      withServer(async () => {
        expect.assertions(2);

        try {
          await axios.get("http://localhost:4000/api/pokemon/1337");
        } catch ({ response }) {
          expect(response.status).toBe(404);
          expect(response.data).toEqual({ error: "pokemon does not exist" });
        }
      })
    );
  });

  describe("GET /pokemon/:id/evolution", () => {
    it(
      "show know how to fetch a pokemon by id",
      withServer(async () => {
        expect.assertions(2);

        const response = await axios.get(
          "http://localhost:4000/api/pokemon/1/evolutions"
        );

        expect(response.status).toBe(200);
        expect(response.data).toMatchInlineSnapshot(`
          [
            {
              "id": 1,
              "name": "bulbasaur",
              "sprite": "http://localhost:4000/api/public/sprites/1-front.png",
            },
            {
              "id": 2,
              "name": "ivysaur",
              "sprite": "http://localhost:4000/api/public/sprites/2-front.png",
            },
            {
              "id": 3,
              "name": "venusaur",
              "sprite": "http://localhost:4000/api/public/sprites/3-front.png",
            },
          ]
        `);
      })
    );
  });

  describe("POST /pokemon", () => {
    it(
      "should add a pokemon when the pokemon is valid",
      withServer(async () => {
        expect.assertions(9);

        const form = {
          name: "mew",
          sprites: {
            back: "",
            front: "",
          },
          stats: [
            {
              id: 1,
              name: "hp",
              value: 10,
            },
            {
              id: 2,
              name: "attack",
              value: 20,
            },
            {
              id: 3,
              name: "defense",
              value: 30,
            },
            {
              id: 4,
              name: "special-attack",
              value: 40,
            },
            {
              id: 5,
              name: "special-defense",
              value: 50,
            },
            {
              id: 6,
              name: "speed",
              value: 60,
            },
          ],
          types: [
            {
              id: 12,
              name: "grass",
            },
            {
              id: 4,
              name: "poison",
            },
          ],
          weight: 42,
          height: 1337,
        };

        const formData = new FormData();
        formData.append("form", JSON.stringify(form));

        formData.append(
          "front",
          fs.createReadStream(__dirname + "/../sprites/mew-front.png")
        );

        formData.append(
          "back",
          fs.createReadStream(__dirname + "/../sprites/mew-back.png")
        );

        const response = await axios.post(
          "http://localhost:4000/api/pokemon",
          formData,
          {
            headers: {
              ...formData.getHeaders(),
            },
          }
        );

        expect(response.status).toEqual(201);

        const data = response.data;

        expect(data.id).toBe(151);
        expect(data.name).toBe("mew");

        expect(data.weight).toBe(42);
        expect(data.height).toBe(1337);

        expect(typeof data.sprites.front).toBe("string");
        expect(typeof data.sprites.back).toBe("string");

        expect(data.stats).toEqual([
          {
            id: 1,
            name: "hp",
            value: 10,
          },
          {
            id: 2,
            name: "attack",
            value: 20,
          },
          {
            id: 3,
            name: "defense",
            value: 30,
          },
          {
            id: 4,
            name: "special-attack",
            value: 40,
          },
          {
            id: 5,
            name: "special-defense",
            value: 50,
          },
          {
            id: 6,
            name: "speed",
            value: 60,
          },
        ]);

        expect(data.types).toEqual([
          {
            id: 12,
            name: "grass",
            icon: "http://localhost:4000/api/public/types/grass.png",
          },
          {
            id: 4,
            name: "poison",
            icon: "http://localhost:4000/api/public/types/poison.png",
          },
        ]);
      })
    );

    it(
      "should return errors when the form is empty",
      withServer(async () => {
        expect.assertions(2);

        const form = {};

        try {
          const formData = new FormData();
          formData.append("form", JSON.stringify(form));

          await axios.post("http://localhost:4000/api/pokemon", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "height": [
                "Height is required",
              ],
              "name": [
                "Name is required",
              ],
              "sprites": [
                "Sprites are required",
              ],
              "stats": [
                "Stats are required",
              ],
              "types": [
                "Types are required",
              ],
              "weight": [
                "Weight is required",
              ],
            }
          `);
        }
      })
    );

    it(
      "should return error when sprites misses a front",
      withServer(async () => {
        expect.assertions(2);

        const form = {
          id: 1,
          name: "mew",
          sprites: {},
          stats: [
            {
              id: 1,
              name: "hp",
              value: 10,
            },
            {
              id: 2,
              name: "attack",
              value: 20,
            },
            {
              id: 3,
              name: "defense",
              value: 30,
            },
            {
              id: 4,
              name: "special-attack",
              value: 40,
            },
            {
              id: 5,
              name: "special-defense",
              value: 50,
            },
            {
              id: 6,
              name: "speed",
              value: 60,
            },
          ],
          types: [
            {
              id: 12,
              name: "grass",
            },
            {
              id: 4,
              name: "poison",
            },
          ],
          weight: 42,
          height: 1337,
        };

        try {
          const formData = new FormData();
          formData.append("form", JSON.stringify(form));

          formData.append(
            "back",
            fs.createReadStream(__dirname + "/../sprites/mew-back.png")
          );

          await axios.post("http://localhost:4000/api/pokemon", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "sprites": [
                "Front sprite is required",
              ],
            }
          `);
        }
      })
    );

    it(
      "should return error when sprites misses a back",
      withServer(async () => {
        expect.assertions(2);

        const form = {
          id: 1,
          name: "mew",
          sprites: {},
          stats: [
            {
              id: 1,
              name: "hp",
              value: 10,
            },
            {
              id: 2,
              name: "attack",
              value: 20,
            },
            {
              id: 3,
              name: "defense",
              value: 30,
            },
            {
              id: 4,
              name: "special-attack",
              value: 40,
            },
            {
              id: 5,
              name: "special-defense",
              value: 50,
            },
            {
              id: 6,
              name: "speed",
              value: 60,
            },
          ],
          types: [
            {
              id: 12,
              name: "grass",
            },
            {
              id: 4,
              name: "poison",
            },
          ],
          weight: 42,
          height: 1337,
        };

        try {
          const formData = new FormData();
          formData.append("form", JSON.stringify(form));

          formData.append(
            "front",
            fs.createReadStream(__dirname + "/../sprites/mew-front.png")
          );

          await axios.post("http://localhost:4000/api/pokemon", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "sprites": [
                "Back sprite is required",
              ],
            }
          `);
        }
      })
    );

    it(
      "should return errors when types is an empty array",
      withServer(async () => {
        expect.assertions(2);

        const form = {
          name: "mew",
          sprites: {},
          stats: [
            {
              id: 1,
              name: "hp",
              value: 10,
            },
            {
              id: 2,
              name: "attack",
              value: 20,
            },
            {
              id: 3,
              name: "defense",
              value: 30,
            },
            {
              id: 4,
              name: "special-attack",
              value: 40,
            },
            {
              id: 5,
              name: "special-defense",
              value: 50,
            },
            {
              id: 6,
              name: "speed",
              value: 60,
            },
          ],
          types: [],
          weight: 42,
          height: 1337,
        };

        try {
          const formData = new FormData();
          formData.append("form", JSON.stringify(form));

          formData.append(
            "front",
            fs.createReadStream(__dirname + "/../sprites/mew-front.png")
          );

          formData.append(
            "back",
            fs.createReadStream(__dirname + "/../sprites/mew-back.png")
          );

          await axios.post("http://localhost:4000/api/pokemon", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "types": [
                "Types are required",
              ],
            }
          `);
        }
      })
    );

    it(
      "should return errors when provided types do not exist",
      withServer(async () => {
        expect.assertions(2);

        const form = {
          name: "mew",
          sprites: {},
          stats: [
            {
              id: 1,
              name: "hp",
              value: 10,
            },
            {
              id: 2,
              name: "attack",
              value: 20,
            },
            {
              id: 3,
              name: "defense",
              value: 30,
            },
            {
              id: 4,
              name: "special-attack",
              value: 40,
            },
            {
              id: 5,
              name: "special-defense",
              value: 50,
            },
            {
              id: 6,
              name: "speed",
              value: 60,
            },
          ],
          types: [
            {
              id: 42,
              name: "super",
            },
            {
              id: 1337,
              name: "saiyan",
            },
          ],
          weight: 42,
          height: 1337,
        };

        try {
          const formData = new FormData();
          formData.append("form", JSON.stringify(form));

          formData.append(
            "front",
            fs.createReadStream(__dirname + "/../sprites/mew-front.png")
          );

          formData.append(
            "back",
            fs.createReadStream(__dirname + "/../sprites/mew-back.png")
          );

          await axios.post("http://localhost:4000/api/pokemon", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "types": [
                "Type with id: 42, cannot be found",
                "Type with id: 1337, cannot be found",
              ],
            }
          `);
        }
      })
    );

    it(
      "should return errors when stats is an empty array",
      withServer(async () => {
        expect.assertions(2);

        const form = {
          name: "mew",
          sprites: {},
          stats: [],
          types: [
            {
              id: 12,
              name: "grass",
            },
          ],
          weight: 42,
          height: 1337,
        };

        try {
          const formData = new FormData();
          formData.append("form", JSON.stringify(form));

          formData.append(
            "front",
            fs.createReadStream(__dirname + "/../sprites/mew-front.png")
          );

          formData.append(
            "back",
            fs.createReadStream(__dirname + "/../sprites/mew-back.png")
          );

          await axios.post("http://localhost:4000/api/pokemon", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "stats": [
                "Stats are required",
              ],
            }
          `);
        }
      })
    );

    it(
      "should return errors when stats has missing items",
      withServer(async () => {
        expect.assertions(2);

        const form = {
          name: "mew",
          sprites: {},
          stats: [
            {
              id: 1,
              name: "hp",
              value: 10,
            },
          ],
          types: [
            {
              id: 12,
              name: "grass",
            },
          ],
          weight: 42,
          height: 1337,
        };

        try {
          const formData = new FormData();
          formData.append("form", JSON.stringify(form));

          formData.append(
            "front",
            fs.createReadStream(__dirname + "/../sprites/mew-front.png")
          );

          formData.append(
            "back",
            fs.createReadStream(__dirname + "/../sprites/mew-back.png")
          );

          await axios.post("http://localhost:4000/api/pokemon", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "stats": [
                "Attack is required",
                "Defense is required",
                "Special-attack is required",
                "Special-defense is required",
                "Speed is required",
              ],
            }
          `);
        }
      })
    );

    it(
      "should return errors when provided stats do not exist",
      withServer(async () => {
        expect.assertions(2);

        const form = {
          name: "mew",
          sprites: {},
          stats: [
            {
              id: 1,
              name: "hp",
              value: 10,
            },
            {
              id: 2,
              name: "attack",
              value: 20,
            },
            {
              id: 3,
              name: "defense",
              value: 30,
            },
            {
              id: 4,
              name: "special-attack",
              value: 40,
            },
            {
              id: 5,
              name: "special-defense",
              value: 50,
            },
            {
              id: 6,
              name: "speed",
              value: 60,
            },
            {
              id: 9999,
              name: "blaat",
              value: 10,
            },
          ],
          types: [
            {
              id: 12,
              name: "grass",
            },
          ],
          weight: 42,
          height: 1337,
        };

        try {
          const formData = new FormData();
          formData.append("form", JSON.stringify(form));

          formData.append(
            "front",
            fs.createReadStream(__dirname + "/../sprites/mew-front.png")
          );

          formData.append(
            "back",
            fs.createReadStream(__dirname + "/../sprites/mew-back.png")
          );

          await axios.post("http://localhost:4000/api/pokemon", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "stats": [
                "Stat "blaat" does not exist in the database",
              ],
            }
          `);
        }
      })
    );

    it(
      "should return errors when fields are invalid",
      withServer(async () => {
        expect.assertions(2);

        const form = {
          name: "thisisaverylongstringwhichisnotavalidnameforthepokemonatall",
          sprites: {},
          stats: [
            {
              id: 1,
              name: "hp",
              value: -10,
            },
            {
              id: 2,
              name: "attack",
              value: 0,
            },
            {
              id: 3,
              name: "defense",
              value: 1,
            },
            {
              id: 4,
              name: "special-attack",
              value: 40,
            },
            {
              id: 5,
              name: "special-defense",
              value: 50,
            },
            {
              id: 6,
              name: "speed",
              value: 60,
            },
          ],
          types: [
            {
              id: 12,
              name: "grass",
            },
          ],
          weight: -1,
          height: -50,
        };

        try {
          const formData = new FormData();
          formData.append("form", JSON.stringify(form));

          formData.append(
            "front",
            fs.createReadStream(__dirname + "/../sprites/mew-front.png")
          );

          formData.append(
            "back",
            fs.createReadStream(__dirname + "/../sprites/mew-back.png")
          );

          await axios.post("http://localhost:4000/api/pokemon", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "name": [
                "Name cannot be bigger than 50",
                "Weight must be larger than 0",
                "Height must be larger than 0",
              ],
              "stats": [
                "Hp must be larger than 0",
                "Attack must be larger than 0",
              ],
            }
          `);
        }
      })
    );
  });

  describe("PUT /pokemon/:id", () => {
    it(
      "should update the pokemon when the pokemon is valid",
      withServer(async () => {
        expect.assertions(2);

        const form = {
          id: 1,
          name: "mew",
          sprites: {
            back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/151.png",
            front:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
          },
          stats: [
            {
              id: 1,
              name: "hp",
              value: 10,
            },
            {
              id: 2,
              name: "attack",
              value: 20,
            },
            {
              id: 3,
              name: "defense",
              value: 30,
            },
            {
              id: 4,
              name: "special-attack",
              value: 40,
            },
            {
              id: 5,
              name: "special-defense",
              value: 50,
            },
            {
              id: 6,
              name: "speed",
              value: 60,
            },
          ],
          types: [
            {
              id: 12,
              name: "grass",
            },
            {
              id: 4,
              name: "poison",
            },
          ],
          weight: 42,
          height: 1337,
        };

        const formData = new FormData();
        formData.append("form", JSON.stringify(form));

        const response = await axios.put(
          "http://localhost:4000/api/pokemon/1",
          formData,
          {
            headers: {
              ...formData.getHeaders(),
            },
          }
        );

        expect(response.status).toEqual(200);
        expect(response.data).toMatchInlineSnapshot(`
          {
            "height": 1337,
            "id": 1,
            "name": "mew",
            "sprites": {
              "back": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/151.png",
              "front": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
            },
            "stats": [
              {
                "id": 1,
                "name": "hp",
                "value": 10,
              },
              {
                "id": 2,
                "name": "attack",
                "value": 20,
              },
              {
                "id": 3,
                "name": "defense",
                "value": 30,
              },
              {
                "id": 4,
                "name": "special-attack",
                "value": 40,
              },
              {
                "id": 5,
                "name": "special-defense",
                "value": 50,
              },
              {
                "id": 6,
                "name": "speed",
                "value": 60,
              },
            ],
            "types": [
              {
                "icon": "http://localhost:4000/api/public/types/grass.png",
                "id": 12,
                "name": "grass",
              },
              {
                "icon": "http://localhost:4000/api/public/types/poison.png",
                "id": 4,
                "name": "poison",
              },
            ],
            "weight": 42,
          }
        `);
      })
    );

    it(
      "should update both sprites when both are provided",
      withServer(async () => {
        expect.assertions(5);

        const form = {
          id: 1,
          name: "mew",
          sprites: {
            back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/151.png",
            front:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
          },
          stats: [
            {
              id: 1,
              name: "hp",
              value: 10,
            },
            {
              id: 2,
              name: "attack",
              value: 20,
            },
            {
              id: 3,
              name: "defense",
              value: 30,
            },
            {
              id: 4,
              name: "special-attack",
              value: 40,
            },
            {
              id: 5,
              name: "special-defense",
              value: 50,
            },
            {
              id: 6,
              name: "speed",
              value: 60,
            },
          ],
          types: [
            {
              id: 12,
              name: "grass",
            },
            {
              id: 4,
              name: "poison",
            },
          ],
          weight: 42,
          height: 1337,
        };

        const formData = new FormData();
        formData.append("form", JSON.stringify(form));

        formData.append(
          "front",
          fs.createReadStream(__dirname + "/../sprites/mew-front.png")
        );

        formData.append(
          "back",
          fs.createReadStream(__dirname + "/../sprites/mew-back.png")
        );

        const response = await axios.put(
          "http://localhost:4000/api/pokemon/1",
          formData,
          {
            headers: {
              ...formData.getHeaders(),
            },
          }
        );

        expect(response.status).toEqual(200);
        const data = response.data;

        expect(typeof data.sprites.front).toBe("string");
        expect(typeof data.sprites.back).toBe("string");

        expect(data.sprites.front).not.toBe(
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png"
        );
        expect(data.sprites.back).not.toBe(
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/151.png"
        );
      })
    );

    it(
      "should update front sprites only when only front sprite is provided",
      withServer(async () => {
        expect.assertions(5);

        const form = {
          id: 1,
          name: "mew",
          sprites: {
            back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/151.png",
            front:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
          },
          stats: [
            {
              id: 1,
              name: "hp",
              value: 10,
            },
            {
              id: 2,
              name: "attack",
              value: 20,
            },
            {
              id: 3,
              name: "defense",
              value: 30,
            },
            {
              id: 4,
              name: "special-attack",
              value: 40,
            },
            {
              id: 5,
              name: "special-defense",
              value: 50,
            },
            {
              id: 6,
              name: "speed",
              value: 60,
            },
          ],
          types: [
            {
              id: 12,
              name: "grass",
            },
            {
              id: 4,
              name: "poison",
            },
          ],
          weight: 42,
          height: 1337,
        };

        const formData = new FormData();
        formData.append("form", JSON.stringify(form));

        formData.append(
          "front",
          fs.createReadStream(__dirname + "/../sprites/mew-front.png")
        );

        const response = await axios.put(
          "http://localhost:4000/api/pokemon/1",
          formData,
          {
            headers: {
              ...formData.getHeaders(),
            },
          }
        );

        expect(response.status).toEqual(200);
        const data = response.data;

        expect(typeof data.sprites.front).toBe("string");
        expect(typeof data.sprites.back).toBe("string");

        expect(data.sprites.front).not.toBe(
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png"
        );
        expect(data.sprites.back).toBe(
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/151.png"
        );
      })
    );

    it(
      "should update front sprites only when only front sprite is provided",
      withServer(async () => {
        expect.assertions(5);

        const form = {
          id: 1,
          name: "mew",
          sprites: {
            back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/151.png",
            front:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
          },
          stats: [
            {
              id: 1,
              name: "hp",
              value: 10,
            },
            {
              id: 2,
              name: "attack",
              value: 20,
            },
            {
              id: 3,
              name: "defense",
              value: 30,
            },
            {
              id: 4,
              name: "special-attack",
              value: 40,
            },
            {
              id: 5,
              name: "special-defense",
              value: 50,
            },
            {
              id: 6,
              name: "speed",
              value: 60,
            },
          ],
          types: [
            {
              id: 12,
              name: "grass",
            },
            {
              id: 4,
              name: "poison",
            },
          ],
          weight: 42,
          height: 1337,
        };

        const formData = new FormData();
        formData.append("form", JSON.stringify(form));

        formData.append(
          "back",
          fs.createReadStream(__dirname + "/../sprites/mew-back.png")
        );

        const response = await axios.put(
          "http://localhost:4000/api/pokemon/1",
          formData,
          {
            headers: {
              ...formData.getHeaders(),
            },
          }
        );

        expect(response.status).toEqual(200);
        const data = response.data;

        expect(typeof data.sprites.front).toBe("string");
        expect(typeof data.sprites.back).toBe("string");

        expect(data.sprites.front).toBe(
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png"
        );
        expect(data.sprites.back).not.toBe(
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/151.png"
        );
      })
    );

    it(
      "should fail when pokemon does not exist",
      withServer(async () => {
        expect.assertions(2);

        const form = {
          id: 1337,
          name: "mew",
          sprites: {
            back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/151.png",
            front:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
          },
          stats: [
            {
              id: 1,
              name: "hp",
              value: 10,
            },
            {
              id: 2,
              name: "attack",
              value: 20,
            },
            {
              id: 3,
              name: "defense",
              value: 30,
            },
            {
              id: 4,
              name: "special-attack",
              value: 40,
            },
            {
              id: 5,
              name: "special-defense",
              value: 50,
            },
            {
              id: 6,
              name: "speed",
              value: 60,
            },
          ],
          types: [
            {
              id: 12,
              name: "grass",
            },
            {
              id: 4,
              name: "poison",
            },
          ],
          weight: 42,
          height: 1337,
        };

        try {
          const formData = new FormData();
          formData.append("form", JSON.stringify(form));

          await axios.put("http://localhost:4000/api/pokemon/1337", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
        } catch ({ response }) {
          expect(response.status).toEqual(404);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "error": "pokemon does not exist",
            }
          `);
        }
      })
    );

    it(
      "should return errors when the form is empty",
      withServer(async () => {
        expect.assertions(2);

        const form = {};

        try {
          const formData = new FormData();
          formData.append("form", JSON.stringify(form));

          await axios.put("http://localhost:4000/api/pokemon/1", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "height": [
                "Height is required",
              ],
              "name": [
                "Name is required",
              ],
              "sprites": [
                "Sprites are required",
              ],
              "stats": [
                "Stats are required",
              ],
              "types": [
                "Types are required",
              ],
              "weight": [
                "Weight is required",
              ],
            }
          `);
        }
      })
    );

    it(
      "should return errors when types is an empty array",
      withServer(async () => {
        expect.assertions(2);

        const form = {
          id: 1,
          name: "mew",
          sprites: {
            back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/151.png",
            front:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
          },
          stats: [
            {
              id: 1,
              name: "hp",
              value: 10,
            },
            {
              id: 2,
              name: "attack",
              value: 20,
            },
            {
              id: 3,
              name: "defense",
              value: 30,
            },
            {
              id: 4,
              name: "special-attack",
              value: 40,
            },
            {
              id: 5,
              name: "special-defense",
              value: 50,
            },
            {
              id: 6,
              name: "speed",
              value: 60,
            },
          ],
          types: [],
          weight: 42,
          height: 1337,
        };

        try {
          const formData = new FormData();
          formData.append("form", JSON.stringify(form));

          await axios.put("http://localhost:4000/api/pokemon/1", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "types": [
                "Types are required",
              ],
            }
          `);
        }
      })
    );

    it(
      "should return errors when provided types do not exist",
      withServer(async () => {
        expect.assertions(2);

        const form = {
          name: "mew",
          sprites: {
            back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/151.png",
            front:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
          },
          stats: [
            {
              id: 1,
              name: "hp",
              value: 10,
            },
            {
              id: 2,
              name: "attack",
              value: 20,
            },
            {
              id: 3,
              name: "defense",
              value: 30,
            },
            {
              id: 4,
              name: "special-attack",
              value: 40,
            },
            {
              id: 5,
              name: "special-defense",
              value: 50,
            },
            {
              id: 6,
              name: "speed",
              value: 60,
            },
          ],
          types: [
            {
              id: 42,
              name: "super",
            },
            {
              id: 1337,
              name: "saiyan",
            },
          ],
          weight: 42,
          height: 1337,
        };

        try {
          const formData = new FormData();
          formData.append("form", JSON.stringify(form));

          await axios.put("http://localhost:4000/api/pokemon/1", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "types": [
                "Type with id: 42, cannot be found",
                "Type with id: 1337, cannot be found",
              ],
            }
          `);
        }
      })
    );

    it(
      "should return errors when stats is an empty array",
      withServer(async () => {
        expect.assertions(2);

        const form = {
          name: "mew",
          sprites: {
            back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/151.png",
            front:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
          },
          stats: [],
          types: [
            {
              id: 12,
              name: "grass",
            },
          ],
          weight: 42,
          height: 1337,
        };

        try {
          const formData = new FormData();
          formData.append("form", JSON.stringify(form));

          await axios.put("http://localhost:4000/api/pokemon/1", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "stats": [
                "Stats are required",
              ],
            }
          `);
        }
      })
    );

    it(
      "should return errors when stats has missing items",
      withServer(async () => {
        expect.assertions(2);

        const form = {
          id: 1,
          name: "mew",
          sprites: {},
          stats: [
            {
              id: 1,
              name: "hp",
              value: 10,
            },
          ],
          types: [
            {
              id: 12,
              name: "grass",
            },
          ],
          weight: 42,
          height: 1337,
        };

        try {
          const formData = new FormData();
          formData.append("form", JSON.stringify(form));

          formData.append(
            "front",
            fs.createReadStream(__dirname + "/../sprites/mew-front.png")
          );

          formData.append(
            "back",
            fs.createReadStream(__dirname + "/../sprites/mew-back.png")
          );

          await axios.put("http://localhost:4000/api/pokemon/1", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "stats": [
                "Attack is required",
                "Defense is required",
                "Special-attack is required",
                "Special-defense is required",
                "Speed is required",
              ],
            }
          `);
        }
      })
    );

    it(
      "should return errors when provided stats do not exist",
      withServer(async () => {
        expect.assertions(2);

        const form = {
          name: "mew",
          sprites: {
            back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/151.png",
            front:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
          },
          stats: [
            {
              id: 1,
              name: "hp",
              value: 10,
            },
            {
              id: 2,
              name: "attack",
              value: 20,
            },
            {
              id: 3,
              name: "defense",
              value: 30,
            },
            {
              id: 4,
              name: "special-attack",
              value: 40,
            },
            {
              id: 5,
              name: "special-defense",
              value: 50,
            },
            {
              id: 6,
              name: "speed",
              value: 60,
            },
            {
              id: 9999,
              name: "blaat",
              value: 10,
            },
          ],
          types: [
            {
              id: 12,
              name: "grass",
            },
          ],
          weight: 42,
          height: 1337,
        };

        try {
          const formData = new FormData();
          formData.append("form", JSON.stringify(form));

          await axios.put("http://localhost:4000/api/pokemon/1", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "stats": [
                "Stat "blaat" does not exist in the database",
              ],
            }
          `);
        }
      })
    );

    it(
      "should return errors when fields are invalid",
      withServer(async () => {
        expect.assertions(2);

        const form = {
          id: 1,
          name: "thisisaverylongstringwhichisnotavalidnameforthepokemonatall",
          sprites: {
            back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/151.png",
            front:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
          },
          stats: [
            {
              id: 1,
              name: "hp",
              value: -10,
            },
            {
              id: 2,
              name: "attack",
              value: 0,
            },
            {
              id: 3,
              name: "defense",
              value: 1,
            },
            {
              id: 4,
              name: "special-attack",
              value: 40,
            },
            {
              id: 5,
              name: "special-defense",
              value: 50,
            },
            {
              id: 6,
              name: "speed",
              value: 60,
            },
          ],
          types: [
            {
              id: 12,
              name: "grass",
            },
          ],
          weight: -1,
          height: -50,
        };

        try {
          const formData = new FormData();
          formData.append("form", JSON.stringify(form));

          await axios.put("http://localhost:4000/api/pokemon/1", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
        } catch ({ response }) {
          expect(response.status).toEqual(422);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "name": [
                "Name cannot be bigger than 50",
                "Weight must be larger than 0",
                "Height must be larger than 0",
              ],
              "stats": [
                "Hp must be larger than 0",
                "Attack must be larger than 0",
              ],
            }
          `);
        }
      })
    );
  });

  describe("DELETE /pokemon/:id", () => {
    it(
      "should delete the pokemon",
      withServer(async () => {
        expect.assertions(2);

        const deleteResponse = await axios.delete(
          "http://localhost:4000/api/pokemon/1"
        );

        expect(deleteResponse.status).toEqual(204);

        try {
          await axios.get("http://localhost:4000/api/pokemon/1");
        } catch ({ response }) {
          expect(response.status).toEqual(404);
        }
      })
    );

    it(
      "should fail when pokemon does not exist",
      withServer(async () => {
        expect.assertions(2);

        try {
          await axios.delete("http://localhost:4000/api/pokemon/1337");
        } catch ({ response }) {
          expect(response.status).toEqual(404);
          expect(response.data).toMatchInlineSnapshot(`
            {
              "error": "pokemon does not exist",
            }
          `);
        }
      })
    );
  });
});
