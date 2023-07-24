import { useQuery } from '@tanstack/react-query';
import { WEATHER_CACHE_KEY, getWeatherStats } from '../../../WeatherServices';
import { AsyncContent } from '../../../../../components';

type Props = {
  type: string;
  id: string;
  mode: string;
};
export function WeatherStatsCalc({ type, id, mode }: Props) {
  const result = useQuery({
    queryKey: [WEATHER_CACHE_KEY, 'weatherstats', type, mode],
    queryFn: () => getWeatherStats(id, type, mode),
    keepPreviousData: true
  });

  return (
    <>
      <li className="capitalize">{type.toLowerCase()}:</li>
      <li>
        <AsyncContent result={result}>
          {(result) =>
            result.length === 0
              ? 'No data available'
              : (
                  result.reduce((acc, item) => acc + Number(item.value), 0) /
                  result.length
                ).toFixed(2)
          }
        </AsyncContent>
      </li>
    </>
  );
}
