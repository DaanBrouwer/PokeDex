import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AsyncContent, Button, Card } from '../../../../components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { GetWeatherStation, WEATHER_CACHE_KEY } from '../../WeatherServices';

import { WeatherStats } from './components/WeatherStats';
import { WeatherDetailCard } from './components/WeatherDetailCard';

type WeatherDetailParam = {
  id: string;
};
export function WeatherDetail() {
  const { id = '1' } = useParams<WeatherDetailParam>();
  const weatherdetail = useQuery({
    queryKey: [WEATHER_CACHE_KEY, 'weather-detail', id],
    queryFn: () => GetWeatherStation(id)
  });

  return (
    <div className="grid gap-4">
      <>
        <div className="flex justify-between">
          <Link to="../weather">
            <Button>
              <FontAwesomeIcon
                className="mr-4 flex center"
                icon={faArrowLeft}
              ></FontAwesomeIcon>
              Back
            </Button>
          </Link>
        </div>

        <AsyncContent result={weatherdetail}>
          {(weather) => (
            <>
              <WeatherDetailCard station={weather}></WeatherDetailCard>

              <WeatherStats></WeatherStats>
            </>
          )}
        </AsyncContent>
      </>
    </div>
  );
}
