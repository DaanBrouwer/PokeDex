const axios = require("axios");

const { withServer } = require("../utils");

describe("REST API: stats-controller", () => {
  describe("GET /types", () => {
    it(
      "should know how to fetch all stats as an array.",
      withServer(async () => {
        expect.assertions(2);

        const response = await axios.get("http://localhost:4000/api/stats");

        expect(response.status).toBe(200);
        expect(response.data).toMatchInlineSnapshot(`
          [
            {
              "id": 1,
              "name": "hp",
            },
            {
              "id": 2,
              "name": "attack",
            },
            {
              "id": 3,
              "name": "defense",
            },
            {
              "id": 4,
              "name": "special-attack",
            },
            {
              "id": 5,
              "name": "special-defense",
            },
            {
              "id": 6,
              "name": "speed",
            },
          ]
        `);
      })
    );
  });
});
