export type WeatherStation = {
  id: number;
  name: string;
  uvindex: number;
  rainfall: number;
  airpressure: number;
  status: string;
  humidity: number;
  windspeed: number;
  temperature: number;
  date: string;
};

export type WeatherStats = {
  id: number;
  date: string;
  value: number;
};
