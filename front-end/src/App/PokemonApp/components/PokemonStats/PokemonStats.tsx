import { Card } from '../../../../components';
import { Pokemon } from '../../PokemonTypes';

type Props = {
  pokemon: Pokemon;
};
export function PokemonStats({ pokemon }: Props) {
  return (
    <Card>
      <b>Stats</b>
      <ul className="grid gap-4">
        {pokemon.stats.map((stats) => (
          <li key={stats.id} className="grid md:grid-cols-3 gap-2 md:gap-4">
            <div className="grid grid-cols-2 gap-4">
              <b className="uppercase text-right">{stats.name} </b>
              <em>{stats.value}</em>
            </div>
            <div className="h-4 md:col-span-2 bg-gray-400">
              <div
                style={{ width: `${Math.min(stats.value, 100)}%` }}
                className={`h-4 ${statColor(stats.value)}`}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );

  function statColor(value: number) {
    if (value >= 80) {
      return 'bg-green-400';
    }
    if (value >= 50) {
      return 'bg-yellow-400';
    }
    if (value >= 30) {
      return 'bg-orange-400';
    } else {
      return 'bg-red-400';
    }
  }
}
