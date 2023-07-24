import { Card } from '../../../../../components';
import { WeatherStatsCalc } from './WeatherStatsCalc';
import { useParams } from 'react-router-dom';

type WeatherStationParam = {
  id: string;
};
export function WeatherStats() {
  const { id = '1' } = useParams<WeatherStationParam>();
  const typeValues = [
    'TEMPERATURE',
    'AIRPRESSURE',
    'HUMIDITY',
    'RAINFALL',
    'WINDSPEED',
    'UVINDEX'
  ];

  const modeValues = ['WEEK', 'MONTH', 'YEAR'];
  return (
    <>
      {modeValues.map((mode) => (
        <Card className="bg-green-500" key={mode}>
          <h1 className="text-xl">
            Averages of last {mode.toLocaleLowerCase()}:
          </h1>

          <ul className="list-none grid grid-cols-2">
            {typeValues.map((type) => (
              <WeatherStatsCalc
                key={`${type}-${mode}`}
                id={id}
                type={type}
                mode={mode}
              ></WeatherStatsCalc>
            ))}
          </ul>
        </Card>
      ))}
    </>
  );
}
