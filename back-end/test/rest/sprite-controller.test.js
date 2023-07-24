const axios = require('axios');
const fs = require('fs');
var FormData = require('form-data');

const { withServer } = require('../utils');

describe('REST API: sprite-controller', () => {
  describe('POST /sprite', () => {
    it(
      'should upload a file and return the location',
      withServer(async () => {
        expect.assertions(2);

        const formData = new FormData();
        formData.append(
          'file',
          fs.createReadStream(__dirname + '/../sprites/mew-front.png')
        );

        const response = await axios.post(
          'http://localhost:4000/api/sprite',
          formData,
          {
            headers: formData.getHeaders(),
          }
        );

        expect(response.status).toEqual(201);
        expect(response.data.url).not.toBe(undefined);
      })
    );

    it(
      'should error when no files are sent',
      withServer(async () => {
        expect.assertions(2);

        const formData = new FormData();

        try {
          await axios.post('http://localhost:4000/api/sprite', formData, {
            headers: formData.getHeaders(),
          });
        } catch (error) {
          expect(error.response.status).toEqual(422);
          expect(error.response.data).toEqual({
            file: 'No files were uploaded.',
          });
        }
      })
    );
  });

  describe('GET /sprite/:name', () => {
    it(
      'should upload a file and return the location',
      withServer(async () => {
        expect.assertions(3);

        // Put a file in the uploads folder
        const file = fs.readFileSync(__dirname + '/../sprites/mew-front.png');
        fs.writeFileSync(__dirname + '/../../uploads/mew-front.png', file);

        const response = await axios.get(
          'http://localhost:4000/api/sprite/mew-front.png'
        );

        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('image/png');
        expect(response.headers['content-disposition']).toEqual(
          'attachment; filename="mew-front.png"'
        );
      })
    );

    it(
      'should error when file does not exist',
      withServer(async () => {
        expect.assertions(1);

        try {
          await axios.get('http://localhost:4000/api/sprite/error.png');
        } catch (error) {
          expect(error.response.status).toEqual(404);
        }
      })
    );
  });
});
