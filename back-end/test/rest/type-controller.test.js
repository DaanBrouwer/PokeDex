const axios = require("axios");

const { withServer } = require("../utils");

describe("REST API: type-controller", () => {
  describe("GET /types", () => {
    it(
      "should know how to fetch all types in a page.",
      withServer(async () => {
        expect.assertions(2);

        const response = await axios.get("http://localhost:4000/api/types", {
          params: { page: 1, size: 10 },
        });

        expect(response.status).toBe(200);
        expect(response.data).toMatchInlineSnapshot(`
          {
            "content": [
              {
                "icon": "http://localhost:4000/api/public/types/normal.png",
                "id": 1,
                "name": "normal",
              },
              {
                "icon": "http://localhost:4000/api/public/types/fighting.png",
                "id": 2,
                "name": "fighting",
              },
              {
                "icon": "http://localhost:4000/api/public/types/flying.png",
                "id": 3,
                "name": "flying",
              },
              {
                "icon": "http://localhost:4000/api/public/types/poison.png",
                "id": 4,
                "name": "poison",
              },
              {
                "icon": "http://localhost:4000/api/public/types/ground.png",
                "id": 5,
                "name": "ground",
              },
              {
                "icon": "http://localhost:4000/api/public/types/rock.png",
                "id": 6,
                "name": "rock",
              },
              {
                "icon": "http://localhost:4000/api/public/types/bug.png",
                "id": 7,
                "name": "bug",
              },
              {
                "icon": "http://localhost:4000/api/public/types/ghost.png",
                "id": 8,
                "name": "ghost",
              },
              {
                "icon": "http://localhost:4000/api/public/types/steel.png",
                "id": 9,
                "name": "steel",
              },
              {
                "icon": "http://localhost:4000/api/public/types/fire.png",
                "id": 10,
                "name": "fire",
              },
            ],
            "first": true,
            "last": false,
            "number": 1,
            "size": 10,
            "totalElements": 17,
            "totalPages": 2,
          }
        `);
      })
    );

    it(
      "should limit the number of types per page to 100",
      withServer(async () => {
        expect.assertions(4);

        const response = await axios.get("http://localhost:4000/api/types", {
          params: { page: 1, size: 101 },
        });

        expect(response.status).toBe(200);
        expect(response.data.content.length).toBe(17);
        expect(response.data.totalPages).toBe(1);
        expect(response.data.totalElements).toBe(17);
      })
    );

    it(
      "should know how to get the first page",
      withServer(async () => {
        expect.assertions(2);

        const response = await axios.get("http://localhost:4000/api/types", {
          params: { page: 1, size: 10 },
        });

        expect(response.status).toBe(200);
        expect(response.data.first).toBe(true);
      })
    );

    it(
      "should know how to get the last page",
      withServer(async () => {
        expect.assertions(2);

        const response = await axios.get("http://localhost:4000/api/types", {
          params: { page: 2, size: 10 },
        });

        expect(response.status).toBe(200);
        expect(response.data.last).toBe(true);
      })
    );

    it(
      "should use default values for when page and size are missing",
      withServer(async () => {
        expect.assertions(4);

        const response = await axios.get("http://localhost:4000/api/types", {
          params: {},
        });

        expect(response.status).toBe(200);
        expect(response.data.first).toBe(true);
        expect(response.data.number).toBe(1);
        expect(response.data.content.length).toBe(10);
      })
    );
  });

  describe("GET /types/:id", () => {
    it(
      "show know how to fetch a type by id",
      withServer(async () => {
        expect.assertions(2);

        const response = await axios.get("http://localhost:4000/api/types/1");

        expect(response.status).toBe(200);
        expect(response.data).toMatchInlineSnapshot(`
          {
            "icon": "http://localhost:4000/api/public/types/normal.png",
            "id": 1,
            "name": "normal",
          }
        `);
      })
    );
  });

  describe("GET /types/:id/pokemon", () => {
    it(
      "should know how to fetch all types in a page.",
      withServer(async () => {
        expect.assertions(2);

        const response = await axios.get(
          "http://localhost:4000/api/types/1/pokemon",
          {
            params: { page: 1, size: 10 },
          }
        );

        expect(response.status).toBe(200);
        expect(response.data).toMatchInlineSnapshot(`
          {
            "content": [
              {
                "id": 16,
                "name": "pidgey",
                "sprite": "http://localhost:4000/api/public/sprites/16-front.png",
              },
              {
                "id": 17,
                "name": "pidgeotto",
                "sprite": "http://localhost:4000/api/public/sprites/17-front.png",
              },
              {
                "id": 18,
                "name": "pidgeot",
                "sprite": "http://localhost:4000/api/public/sprites/18-front.png",
              },
              {
                "id": 19,
                "name": "rattata",
                "sprite": "http://localhost:4000/api/public/sprites/19-front.png",
              },
              {
                "id": 20,
                "name": "raticate",
                "sprite": "http://localhost:4000/api/public/sprites/20-front.png",
              },
              {
                "id": 21,
                "name": "spearow",
                "sprite": "http://localhost:4000/api/public/sprites/21-front.png",
              },
              {
                "id": 22,
                "name": "fearow",
                "sprite": "http://localhost:4000/api/public/sprites/22-front.png",
              },
              {
                "id": 39,
                "name": "jigglypuff",
                "sprite": "http://localhost:4000/api/public/sprites/39-front.png",
              },
              {
                "id": 40,
                "name": "wigglytuff",
                "sprite": "http://localhost:4000/api/public/sprites/40-front.png",
              },
              {
                "id": 52,
                "name": "meowth",
                "sprite": "http://localhost:4000/api/public/sprites/52-front.png",
              },
            ],
            "first": true,
            "last": false,
            "number": 1,
            "size": 10,
            "totalElements": 22,
            "totalPages": 3,
          }
        `);
      })
    );

    it(
      "should limit the number of types per page to 100",
      withServer(async () => {
        expect.assertions(4);

        const response = await axios.get(
          "http://localhost:4000/api/types/1/pokemon",
          {
            params: { page: 1, size: 101 },
          }
        );

        expect(response.status).toBe(200);
        expect(response.data.content.length).toBe(22);
        expect(response.data.totalPages).toBe(1);
        expect(response.data.totalElements).toBe(22);
      })
    );

    it(
      "should know how get the first page",
      withServer(async () => {
        expect.assertions(2);

        const response = await axios.get(
          "http://localhost:4000/api/types/1/pokemon",
          {
            params: { page: 1, size: 10 },
          }
        );

        expect(response.status).toBe(200);
        expect(response.data.first).toBe(true);
      })
    );

    it(
      "should know how to get the last page",
      withServer(async () => {
        expect.assertions(2);

        const response = await axios.get(
          "http://localhost:4000/api/types/1/pokemon",
          {
            params: { page: 3, size: 10 },
          }
        );

        expect(response.status).toBe(200);
        expect(response.data.last).toBe(true);
      })
    );

    it(
      "should use default values for when page and size are missing",
      withServer(async () => {
        expect.assertions(4);

        const response = await axios.get(
          "http://localhost:4000/api/types/1/pokemon",
          {
            params: {},
          }
        );

        expect(response.status).toBe(200);
        expect(response.data.first).toBe(true);
        expect(response.data.number).toBe(1);
        expect(response.data.content.length).toBe(10);
      })
    );
  });
});
