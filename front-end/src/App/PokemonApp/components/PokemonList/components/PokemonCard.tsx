import { Link } from 'react-router-dom';
import { BarePokemon } from '../../../PokemonTypes';
import { Card } from '../../../../../components/Card/Card';

type Props = {
  pokemon: BarePokemon;
};
export function PokemonCard({ pokemon }: Props) {
  return (
    <Link to={`${pokemon.id}`}>
      <Card className="border p-2 " key={pokemon.id}>
        <b className="text-lg capitalize">{pokemon.name}</b>
        <div className="flex justify-center">
          <img src={pokemon.sprite}></img>
        </div>
      </Card>
    </Link>
  );
}
