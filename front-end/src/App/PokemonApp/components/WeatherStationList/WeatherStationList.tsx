import { useQuery } from '@tanstack/react-query';
import { AsyncContent } from '../../../../components';
import { useQueryParam } from '../../../../hooks';
import { GetAllWeather, WEATHER_CACHE_KEY } from '../../WeatherServices';
import { WeatherCard } from './components/WeatherCard';

export function WeatherStationList() {
  const page = useQueryParam('page', 1);
  const query = useQueryParam('query', '');
  const response = useQuery({
    queryKey: [WEATHER_CACHE_KEY, 'weather'],
    queryFn: () => GetAllWeather(page, query),
    keepPreviousData: true
  });
  return (
    <>
      <AsyncContent result={response}>
        {(weatherstations) => (
          <>
            <div className="grid md:grid-cols-3 gap-4 my-4">
              {weatherstations.content.map((weather) => (
                <WeatherCard key={weather.id} station={weather}></WeatherCard>
              ))}
            </div>
          </>
        )}
      </AsyncContent>
    </>
  );
}
