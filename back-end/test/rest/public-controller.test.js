const axios = require('axios');
const { withServer } = require('../utils');

describe('REST API: public-controller', () => {

  describe('GET /public/types/:name', () => {
    it(
      'should download the type icon',
      withServer(async () => {
        expect.assertions(3);

        const response = await axios.get(
          'http://localhost:4000/api/public/types/rock.png'
        );

        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('image/png');
        expect(response.headers['content-disposition']).toEqual(
          'attachment; filename="rock.png"'
        );
      })
    );

    it(
      'should error when file does not exist',
      withServer(async () => {
        expect.assertions(1);

        try {
          await axios.get('http://localhost:4000/api/public/types/error.png');
        } catch (error) {
          expect(error.response.status).toEqual(404);
        }
      })
    );
  });

  describe('GET /public/sprites/:name', () => {
    it(
      'should download the sprite',
      withServer(async () => {
        expect.assertions(3);

        const response = await axios.get(
          'http://localhost:4000/api/public/sprites/1-front.png'
        );

        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('image/png');
        expect(response.headers['content-disposition']).toEqual(
          'attachment; filename="1-front.png"'
        );
      })
    );

    it(
      'should error when file does not exist',
      withServer(async () => {
        expect.assertions(1);

        try {
          await axios.get('http://localhost:4000/api/public/sprites/error.png');
        } catch (error) {
          expect(error.response.status).toEqual(404);
        }
      })
    );
  });
});
