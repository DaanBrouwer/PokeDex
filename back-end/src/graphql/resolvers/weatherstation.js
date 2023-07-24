const {
  MEASUREMENTS,
  getLast1000WeatherstationMeasurementsByIdAndType,
} = require('../../services/weatherstation');

module.exports = {
  Weatherstation: {
    measurements(weatherstation) {
      const result = {};

      for (const measurement of MEASUREMENTS) {
        result[measurement.toLowerCase()] = () =>
          getLast1000WeatherstationMeasurementsByIdAndType(
            weatherstation.id,
            measurement
          );
      }

      return result;
    },
  },
};
