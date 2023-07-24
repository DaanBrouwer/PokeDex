function pokemonDto(pokemon) {
  return {
    id: pokemon.id,
    name: pokemon.name,
    weight: pokemon.weight,
    height: pokemon.height,
    stats: pokemon.stats.map(pokemonStatDto),
    types: pokemon.types.map(typeDto),
    sprites: spriteDto(pokemon.sprites),
  };
}

function pokemonPageDto(pokemon) {
  return {
    id: pokemon.id,
    name: pokemon.name,
    sprite: pokemon.sprites.front,
  };
}

function pokemonStatDto(stat) {
  return {
    id: stat.id,
    name: stat.name,
    value: stat.value,
  };
}

function spriteDto(sprite) {
  return {
    front: sprite.front,
    back: sprite.back,
  };
}

function typeDto(type) {
  return {
    id: type.id,
    name: type.name,
    icon: `http://localhost:4000/api/public/types/${type.name}.png`
  };
}

function statDto(stat) {
  return {
    id: stat.id,
    name: stat.name,
  };
}

function weatherstationDto(weatherStation) {
  return {
    id: weatherStation.id,
    name: weatherStation.name,
    uvindex: weatherStation.uvindex,
    rainfall: weatherStation.rainfall,
    airpressure: weatherStation.airpressure,
    status: weatherStation.status,
    humidity: weatherStation.humidity,
    windspeed: weatherStation.windspeed,
    temperature: weatherStation.temperature,
    date: weatherStation.date,
  };
}

function measurementsDto(measurements) {
  return measurements.map((measurement) => {
    return {
      id: measurement.id,
      date: measurement.date,
      value: measurement.value,
    };
  });
}

module.exports = {
  pokemonDto,
  pokemonPageDto,
  typeDto,
  statDto,
  weatherstationDto,
  measurementsDto,
};
