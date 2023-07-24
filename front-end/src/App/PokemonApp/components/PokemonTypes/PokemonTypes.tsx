import { Card } from '../../../../components';
import { Pokemon } from '../../PokemonTypes';

type Props = {
  pokemon: Pokemon;
};
export function PokemonTypes({ pokemon }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-4 mb-4">
      <Card className="flex flex-col">
        <b>Height </b>
        {pokemon.height} cm
      </Card>
      <Card className="flex flex-col">
        <b>Weight</b>
        {pokemon.weight} kg
      </Card>
      <Card className="flex flex-col ">
        <b>Types</b>
        <div className="flex gap-4">
          {pokemon.types.map((type) => (
            <span key={type.id} className="flex gap-2 items-center capitalize">
              <img className="w-8 h-8" src={type.icon} />
              {type.name}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
