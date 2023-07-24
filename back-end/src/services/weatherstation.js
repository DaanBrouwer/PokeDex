const { getDb } = require('../db');
const {
  getLimit,
  getOffset,
  createPage,
  makeRandomNumberGenerator,
  sample,
} = require('../utils/page');

const MEASUREMENTS = [
  'TEMPERATURE',
  'HUMIDITY',
  'WINDSPEED',
  'UVINDEX',
  'RAINFALL',
  'AIRPRESSURE',
  'STATUS',
];

const MODES = ['YEAR', 'MONTH', 'WEEK'];

const STATUSSES = ['SUNNY', 'RAIN', 'STORM', 'CLOUDS', 'MIST', 'HAIL'];

async function getAllWeatherstations(page, size, query) {
  const escapedQuery = `%${query}%`;

  const countQuery = query
    ? `SELECT COUNT(id) AS count FROM weatherstation WHERE name LIKE $1`
    : `SELECT COUNT(id) AS count FROM weatherstation`;
  const count = getDb().get(countQuery, query ? [escapedQuery] : []);

  const limit = getLimit(size);
  const offset = getOffset(page, size);
  const weatherstationsQuery = query
    ? `SELECT * FROM weatherstation WHERE name LIKE $1 LIMIT $2 OFFSET $3`
    : `SELECT * FROM weatherstation LIMIT $1 OFFSET $2`;

  const weatherstations = getDb().all(
    weatherstationsQuery,
    query ? [escapedQuery, limit, offset] : [limit, offset]
  );

  const [countResult, content] = await Promise.all([count, weatherstations]);

  const weatherstationsPage = createPage({
    totalElements: countResult.count,
    content,
    page,
    limit,
  });

  const stationMeasurements = await Promise.all(
    weatherstationsPage.content.map((station) =>
      getLatestWeatherstationMeasurements(station.id)
    )
  );

  stationMeasurements.forEach((measurements, index) => {
    measurements.forEach((measurement) => {
      const weatherstation = weatherstationsPage.content[index];

      weatherstation[measurement.type.toLowerCase()] = measurement.value;
      weatherstation.date = measurement.date;
    });
  });

  return weatherstationsPage;
}

function getAllWeatherStationsAsArray() {
  const query = `SELECT * FROM weatherstation`;

  return getDb().all(query);
}

async function getWeatherstationById(id) {
  const query = `SELECT * FROM weatherstation WHERE id = $1`;

  const weatherstation = await getDb().get(query, [id]);

  if (!weatherstation) {
    return weatherstation;
  }

  // Generate fake measurements which are not actually stored in the db.
  for (const measurement of MEASUREMENTS) {
    const value = generator[measurement]();

    weatherstation[measurement.toLowerCase()] = `${value}`;
  }

  weatherstation.date = new Date();

  return weatherstation;
}

function getLatestWeatherstationMeasurements(stationId) {
  const query = `
    SELECT * FROM weatherstation_measurement 
    WHERE weatherstation_id = :station 
    ORDER BY date DESC
    LIMIT :limit
  `;

  return getDb().all(query, {
    ':station': stationId,
    ':limit': MEASUREMENTS.length,
  });
}

async function getLast1000WeatherstationMeasurementsByIdAndType(
  stationId,
  type,
  mode
) {
  const query = `
    SELECT * FROM weatherstation_measurement 
    WHERE weatherstation_id = :station 
    AND type = :type
    ORDER BY id DESC
    LIMIT 1000
  `;

  const measurements = await getDb().all(query, {
    ':station': stationId,
    ':type': type,
  });

  if (mode === 'YEAR') {
    return measurements;
  } else if (mode === 'MONTH') {
    return averageFromMeasurement(
      measurements,
      (date, pivotDate) => date.getMonth() === pivotDate.getMonth(),
      (date) => {
        date.setDate(1);
        return date;
      }
    );
  } else {
    return averageFromMeasurement(
      measurements,
      (date, pivotDate) => getWeekNumber(date) === getWeekNumber(pivotDate),
      (date) => {
        const day = date.getDay();

        // Where 1 is monday
        const distance = day - 1;

        date.setDate(date.getDate() - distance);
        return date;
      }
    );
  }
}

const generator = {
  TEMPERATURE: makeRandomNumberGenerator(-30, 50),
  HUMIDITY: makeRandomNumberGenerator(0, 100),
  WINDSPEED: makeRandomNumberGenerator(0, 12),
  UVINDEX: makeRandomNumberGenerator(1, 11),
  RAINFALL: makeRandomNumberGenerator(0, 200),
  AIRPRESSURE: makeRandomNumberGenerator(970, 1040),
  STATUS: () => sample(STATUSSES),
};

async function generateWeatherstationData() {
  const stations = await getAllWeatherStationsAsArray();

  for (const station of stations) {
    for (const measurement of MEASUREMENTS) {
      await insertWeatherstationMeasurement(station.id, measurement);
    }
  }
}

async function generateHistoricalWeatherstationData() {
  const stations = await getAllWeatherStationsAsArray();

  for (let i = 365; i > 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    for (const station of stations) {
      for (const measurement of MEASUREMENTS) {
        await insertWeatherstationMeasurement(station.id, measurement, date);
      }
    }
  }

  console.log('Historical weather data loaded');
}

async function insertWeatherstationMeasurement(
  stationId,
  type,
  date = new Date()
) {
  await getDb().run(
    `INSERT INTO weatherstation_measurement (weatherstation_id, type, value, date) VALUES (:station, :type, :value, :date)`,
    {
      ':station': stationId,
      ':type': type,
      ':value': generator[type](),
      ':date': date.toISOString(),
    }
  );
}

module.exports = {
  getAllWeatherstations,
  generateWeatherstationData,
  generateHistoricalWeatherstationData,
  getWeatherstationById,
  getLast1000WeatherstationMeasurementsByIdAndType,
  MEASUREMENTS,
  MODES,
};

// UTILS

function averageFromMeasurement(measurements, bucketFn, firstDateOfGroupFn) {
  const bucketedMeasurements = [];

  let bucket = [];
  let pivotDate = new Date(measurements[0].date);

  for (const measurement of measurements) {
    const date = new Date(measurement.date);

    if (bucketFn(date, pivotDate)) {
      bucket.push(measurement);
    } else {
      bucketedMeasurements.push(bucket);
      bucket = [];
    }

    pivotDate = date;
  }

  if (bucket.length > 0) {
    // Push the final bucket since that does not happen in the loop.
    bucketedMeasurements.push(bucket);
  }

  return bucketedMeasurements.map((bucket, index) => {
    const total = bucket.reduce((acc, n) => {
      return acc + parseFloat(n.value);
    }, 0);

    const average = Number(total / bucket.length).toFixed(1);

    const date = firstDateOfGroupFn(new Date(bucket[0].date));

    return { id: index + 1, value: `${average}`, date: date.toISOString() };
  });
}

// https://stackoverflow.com/a/6117889/63557
function getWeekNumber(date) {
  // Copy date so don't modify original
  const newDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  newDate.setUTCDate(newDate.getUTCDate() + 4 - (newDate.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(newDate.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(((newDate - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
  return weekNo;
}
