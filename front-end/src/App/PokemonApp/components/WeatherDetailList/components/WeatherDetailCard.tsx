import { Link } from 'react-router-dom';
import { Card } from '../../../../../components/Card/Card';
import { WeatherStation } from '../../../WeatherTypes';

type Props = {
  station: WeatherStation;
};

export function WeatherDetailCard({ station }: Props) {
  return (
    <Link to={`${station.id}`}>
      <Card className="border p-2" key={station.id}>
        <div className="grid grid-cols-2">
          <div className="flex flex-col ">
            <b className="text-lg capitalize ">{station.name}</b>
            <p className="center text-4xl p-6">{station.temperature}°C</p>
          </div>

          <div className="flex flex-col items-center">
            <img
              className="h-32 w-32"
              src={`/weatherIcons/${station.status}.svg`}
              alt="Weather Icon"
            />
            <p className="">
              <b>{station.status}</b>
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
