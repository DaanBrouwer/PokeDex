const axios = require('axios');

const { withServer } = require('../utils');

describe('REST API: weatherstation-controller', () => {
  describe('GET /weatherstation', () => {
    it(
      'should know how to fetch all weatherstations in a page.',
      withServer(async () => {
        expect.assertions(107);

        const response = await axios.get(
          'http://localhost:4000/api/weatherstation',
          {
            params: { page: 1, size: 10, query: undefined },
          }
        );

        expect(response.status).toBe(200);

        expect(response.data.first).toBe(true);
        expect(response.data.last).toBe(false);
        expect(response.data.number).toBe(1);
        expect(response.data.totalElements).toBe(84);
        expect(response.data.totalPages).toBe(9);

        expect(response.data.content.length).toBe(10);

        expect(response.data.content[0].id).toBe(1);
        expect(response.data.content[0].name).toBe('Pallet Town');
        expect(typeof response.data.content[0].temperature).toBe('string');
        expect(typeof response.data.content[0].humidity).toBe('string');
        expect(typeof response.data.content[0].windspeed).toBe('string');
        expect(typeof response.data.content[0].uvindex).toBe('string');
        expect(typeof response.data.content[0].rainfall).toBe('string');
        expect(typeof response.data.content[0].airpressure).toBe('string');
        expect(typeof response.data.content[0].status).toBe('string');
        expect(typeof response.data.content[0].date).toBe('string');

        expect(response.data.content[1].id).toBe(2);
        expect(response.data.content[1].name).toBe('Viridian City');
        expect(typeof response.data.content[1].temperature).toBe('string');
        expect(typeof response.data.content[1].humidity).toBe('string');
        expect(typeof response.data.content[1].windspeed).toBe('string');
        expect(typeof response.data.content[1].uvindex).toBe('string');
        expect(typeof response.data.content[1].rainfall).toBe('string');
        expect(typeof response.data.content[1].airpressure).toBe('string');
        expect(typeof response.data.content[1].status).toBe('string');
        expect(typeof response.data.content[1].date).toBe('string');

        expect(response.data.content[2].id).toBe(3);
        expect(response.data.content[2].name).toBe('Pewter City');
        expect(typeof response.data.content[2].temperature).toBe('string');
        expect(typeof response.data.content[2].humidity).toBe('string');
        expect(typeof response.data.content[2].windspeed).toBe('string');
        expect(typeof response.data.content[2].uvindex).toBe('string');
        expect(typeof response.data.content[2].rainfall).toBe('string');
        expect(typeof response.data.content[2].airpressure).toBe('string');
        expect(typeof response.data.content[2].status).toBe('string');
        expect(typeof response.data.content[2].date).toBe('string');

        expect(response.data.content[3].id).toBe(4);
        expect(response.data.content[3].name).toBe('Cerulean City');
        expect(typeof response.data.content[3].temperature).toBe('string');
        expect(typeof response.data.content[3].humidity).toBe('string');
        expect(typeof response.data.content[3].windspeed).toBe('string');
        expect(typeof response.data.content[3].uvindex).toBe('string');
        expect(typeof response.data.content[3].rainfall).toBe('string');
        expect(typeof response.data.content[3].airpressure).toBe('string');
        expect(typeof response.data.content[3].status).toBe('string');
        expect(typeof response.data.content[3].date).toBe('string');

        expect(response.data.content[4].id).toBe(5);
        expect(response.data.content[4].name).toBe('Vermilion City');
        expect(typeof response.data.content[4].temperature).toBe('string');
        expect(typeof response.data.content[4].humidity).toBe('string');
        expect(typeof response.data.content[4].windspeed).toBe('string');
        expect(typeof response.data.content[4].uvindex).toBe('string');
        expect(typeof response.data.content[4].rainfall).toBe('string');
        expect(typeof response.data.content[4].airpressure).toBe('string');
        expect(typeof response.data.content[4].status).toBe('string');
        expect(typeof response.data.content[4].date).toBe('string');

        expect(response.data.content[5].id).toBe(6);
        expect(response.data.content[5].name).toBe('Lavender Town');
        expect(typeof response.data.content[5].temperature).toBe('string');
        expect(typeof response.data.content[5].humidity).toBe('string');
        expect(typeof response.data.content[5].windspeed).toBe('string');
        expect(typeof response.data.content[5].uvindex).toBe('string');
        expect(typeof response.data.content[5].rainfall).toBe('string');
        expect(typeof response.data.content[5].airpressure).toBe('string');
        expect(typeof response.data.content[5].status).toBe('string');
        expect(typeof response.data.content[5].date).toBe('string');

        expect(response.data.content[6].id).toBe(7);
        expect(response.data.content[6].name).toBe('Celadon City');
        expect(typeof response.data.content[6].temperature).toBe('string');
        expect(typeof response.data.content[6].humidity).toBe('string');
        expect(typeof response.data.content[6].windspeed).toBe('string');
        expect(typeof response.data.content[6].uvindex).toBe('string');
        expect(typeof response.data.content[6].rainfall).toBe('string');
        expect(typeof response.data.content[6].airpressure).toBe('string');
        expect(typeof response.data.content[6].status).toBe('string');
        expect(typeof response.data.content[6].date).toBe('string');

        expect(response.data.content[7].id).toBe(8);
        expect(response.data.content[7].name).toBe('Saffron City');
        expect(typeof response.data.content[7].temperature).toBe('string');
        expect(typeof response.data.content[7].humidity).toBe('string');
        expect(typeof response.data.content[7].windspeed).toBe('string');
        expect(typeof response.data.content[7].uvindex).toBe('string');
        expect(typeof response.data.content[7].rainfall).toBe('string');
        expect(typeof response.data.content[7].airpressure).toBe('string');
        expect(typeof response.data.content[7].status).toBe('string');
        expect(typeof response.data.content[7].date).toBe('string');

        expect(response.data.content[8].id).toBe(9);
        expect(response.data.content[8].name).toBe('Fuchsia City');
        expect(typeof response.data.content[8].temperature).toBe('string');
        expect(typeof response.data.content[8].humidity).toBe('string');
        expect(typeof response.data.content[8].windspeed).toBe('string');
        expect(typeof response.data.content[8].uvindex).toBe('string');
        expect(typeof response.data.content[8].rainfall).toBe('string');
        expect(typeof response.data.content[8].airpressure).toBe('string');
        expect(typeof response.data.content[8].status).toBe('string');
        expect(typeof response.data.content[8].date).toBe('string');

        expect(response.data.content[9].id).toBe(10);
        expect(response.data.content[9].name).toBe('Cinnabar Island');
        expect(typeof response.data.content[9].temperature).toBe('string');
        expect(typeof response.data.content[9].humidity).toBe('string');
        expect(typeof response.data.content[9].windspeed).toBe('string');
        expect(typeof response.data.content[9].uvindex).toBe('string');
        expect(typeof response.data.content[9].rainfall).toBe('string');
        expect(typeof response.data.content[9].airpressure).toBe('string');
        expect(typeof response.data.content[9].status).toBe('string');
        expect(typeof response.data.content[9].date).toBe('string');
      })
    );

    it(
      'should know how to get the first page',
      withServer(async () => {
        expect.assertions(2);

        const response = await axios.get(
          'http://localhost:4000/api/weatherstation',
          {
            params: { page: 1, size: 10, query: undefined },
          }
        );

        expect(response.status).toBe(200);
        expect(response.data.first).toBe(true);
      })
    );

    it(
      'should know how to get the last page',
      withServer(async () => {
        expect.assertions(2);

        const response = await axios.get(
          'http://localhost:4000/api/weatherstation',
          {
            params: { page: 9, size: 10, query: undefined },
          }
        );

        expect(response.status).toBe(200);
        expect(response.data.last).toBe(true);
      })
    );

    it(
      'should use default values for when page and size are missing',
      withServer(async () => {
        expect.assertions(4);

        const response = await axios.get(
          'http://localhost:4000/api/weatherstation',
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

    it(
      'should when query is provided filter results based on weatherstation name',
      withServer(async () => {
        expect.assertions(5);

        const response = await axios.get(
          'http://localhost:4000/api/weatherstation',
          {
            params: { page: 1, size: 10, query: 'pallet' },
          }
        );

        expect(response.status).toBe(200);
        expect(response.data.totalPages).toBe(1);
        expect(response.data.totalElements).toBe(1);
        expect(response.data.content.length).toBe(1);
        expect(
          response.data.content.map((weatherstation) => weatherstation.name)
        ).toEqual(['Pallet Town']);
      })
    );

    it(
      'should even paginate when query filter provides to many results',
      withServer(async () => {
        expect.assertions(4);

        const response = await axios.get(
          'http://localhost:4000/api/weatherstation',
          {
            params: { page: 1, size: 10, query: 'city' },
          }
        );

        expect(response.status).toBe(200);
        expect(response.data.totalPages).toBe(6);
        expect(response.data.totalElements).toBe(52);
        expect(response.data.content.length).toBe(10);
      })
    );
  });

  describe('GET /weatherstation/:id', () => {
    it(
      'show know how to fetch a weatherstation by id',
      withServer(async () => {
        expect.assertions(11);

        const response = await axios.get(
          'http://localhost:4000/api/weatherstation/1'
        );

        expect(response.status).toBe(200);
        expect(response.data.id).toBe(1);
        expect(response.data.name).toBe('Pallet Town');
        expect(typeof response.data.temperature).toBe('string');
        expect(typeof response.data.humidity).toBe('string');
        expect(typeof response.data.windspeed).toBe('string');
        expect(typeof response.data.uvindex).toBe('string');
        expect(typeof response.data.rainfall).toBe('string');
        expect(typeof response.data.airpressure).toBe('string');
        expect(typeof response.data.status).toBe('string');
        expect(typeof response.data.date).toBe('string');
      })
    );

    it(
      'should return a 404 when weatherstation does not exist',
      withServer(async () => {
        expect.assertions(2);

        try {
          await axios.get('http://localhost:4000/api/weatherstation/1337');
        } catch ({ response }) {
          expect(response.status).toBe(404);
          expect(response.data).toEqual({
            error: 'weatherstation does not exist',
          });
        }
      })
    );
  });

  describe('GET /weatherstation/:id/:type/:mode', () => {
    async function checkType(type, mode) {
      expect.assertions(5);

      const response = await axios.get(
        `http://localhost:4000/api/weatherstation/1/${type}/${mode}`
      );

      expect(response.status).toBe(200);
      expect(response.data.length > 0).toBe(true);
      expect(response.data[0].id).toBeDefined();
      expect(response.data[0].value).toBeDefined();
      expect(response.data[0].date).toBeDefined();
    }
    
    describe('mode WEEK', () => {
      it(
        'show know how to fetch a temperature by id',
        withServer(async () => {
          await checkType('temperature', 'WEEK');
        })
      );
  
      it(
        'show know how to fetch a humidity by id',
        withServer(async () => {
         await checkType('humidity', 'WEEK');
        })
      );
  
      it(
        'show know how to fetch a windspeed by id',
        withServer(async () => {
         await checkType('windspeed', 'WEEK');
        })
      );
  
      it(
        'show know how to fetch a uvindex by id',
        withServer(async () => {
         await checkType('uvindex', 'WEEK');
        })
      );
  
      it(
        'show know how to fetch a airpressure by id',
        withServer(async () => {
         await checkType('airpressure', 'WEEK');
        })
      );
    });

    describe('mode MONTH', () => {
      it(
        'show know how to fetch a temperature by id',
        withServer(async () => {
          await checkType('temperature', 'MONTH');
        })
      );
  
      it(
        'show know how to fetch a humidity by id',
        withServer(async () => {
         await checkType('humidity', 'MONTH');
        })
      );
  
      it(
        'show know how to fetch a windspeed by id',
        withServer(async () => {
         await checkType('windspeed', 'MONTH');
        })
      );
  
      it(
        'show know how to fetch a uvindex by id',
        withServer(async () => {
         await checkType('uvindex', 'MONTH');
        })
      );
  
      it(
        'show know how to fetch a airpressure by id',
        withServer(async () => {
         await checkType('airpressure', 'MONTH');
        })
      );
    });

    describe('mode YEAR', () => {
      it(
        'show know how to fetch a temperature by id',
        withServer(async () => {
          await checkType('temperature', 'YEAR');
        })
      );
  
      it(
        'show know how to fetch a humidity by id',
        withServer(async () => {
         await checkType('humidity', 'YEAR');
        })
      );
  
      it(
        'show know how to fetch a windspeed by id',
        withServer(async () => {
         await checkType('windspeed', 'YEAR');
        })
      );
  
      it(
        'show know how to fetch a uvindex by id',
        withServer(async () => {
         await checkType('uvindex', 'YEAR');
        })
      );
  
      it(
        'show know how to fetch a airpressure by id',
        withServer(async () => {
         await checkType('airpressure', 'YEAR');
        })
      );
    });
    

    

    it(
      'should return a 404 when weatherstation does not exist',
      withServer(async () => {
        expect.assertions(2);

        try {
          await axios.get(
            'http://localhost:4000/api/weatherstation/1337/rainfall/WEEK'
          );
        } catch ({ response }) {
          expect(response.status).toBe(404);
          expect(response.data).toEqual({
            error: 'weatherstation does not exist',
          });
        }
      })
    );

    it(
      'should return a 400 when type does not exist',
      withServer(async () => {
        expect.assertions(2);

        try {
          await axios.get(
            'http://localhost:4000/api/weatherstation/1/BLAAT/YEAR'
          );
        } catch ({ response }) {
          expect(response.status).toBe(400);
          expect(response.data).toEqual({
            error: 'unknown type',
          });
        }
      })
    );

    it(
      'should return a 400 when mode does not exist',
      withServer(async () => {
        expect.assertions(2);

        try {
          await axios.get(
            'http://localhost:4000/api/weatherstation/1/temperature/BLAAT'
          );
        } catch ({ response }) {
          expect(response.status).toBe(400);
          expect(response.data).toEqual({
            error: 'unknown mode',
          });
        }
      })
    );

    it(
      'should return a 400 when mode does is STATUS, since status does not have a history',
      withServer(async () => {
        expect.assertions(2);

        try {
          await axios.get(
            'http://localhost:4000/api/weatherstation/1/STATUS/week'
          );
        } catch ({ response }) {
          expect(response.status).toBe(400);
          expect(response.data).toEqual({
            error: 'status does not have history',
          });
        }
      })
    );
  });
});
