import axios from 'axios';
import { WeatherStation, WeatherStats } from './WeatherTypes';
import { Page } from '../../types';

export const WEATHER_CACHE_KEY = 'weather';

export async function GetAllWeather(page: number, query: string) {
  const response = await axios.get('/api/weatherstation', {
    params: {
      size: 15,
      page,
      query
    }
  });
  return response.data as Page<WeatherStation>;
}
export async function GetWeatherStation(id: number | string) {
  const response = await axios.get(`/api/weatherstation/${id}`);
  return response.data as WeatherStation;
}

export async function getWeatherStats(
  id: number | string,
  type: string,
  mode: string
) {
  const response = await axios.get(`/api/weatherstation/${id}/${type}/${mode}`);
  return response.data as WeatherStats[];
}
