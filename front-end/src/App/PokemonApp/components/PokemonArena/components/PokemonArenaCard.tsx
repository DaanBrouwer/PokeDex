import { Card } from '../../../../../components/Card/Card';
import { PokemonStats } from '../../PokemonStats/PokemonStats';
import { useQuery } from '@tanstack/react-query';
import { GetPokemon, POKEMON_CACHE_KEY } from '../../../PokemonServices';
import { AsyncContent } from '../../../../../components';
import { useState } from 'react';

type Props = {
  id: number;
};
export function PokemonArenaCard({ id }: Props) {
  const [stats, setStats] = useState(false);
  const result = useQuery({
    queryKey: [POKEMON_CACHE_KEY, 'pokemon-arena-id', id],
    queryFn: () => GetPokemon(id)
  });

  return (
    <>
      {stats ? (
        <AsyncContent result={result}>
          {(pokemon) => (
            <button onClick={() => setStats(!stats)}>
              <PokemonStats pokemon={pokemon}></PokemonStats>
            </button>
          )}
        </AsyncContent>
      ) : (
        <AsyncContent result={result}>
          {(pokemon) => (
            <button onClick={() => setStats(!stats)}>
              <Card className="border p-2 " key={pokemon.id}>
                <b className="text-lg capitalize">{pokemon.name}</b>
                <div className="flex justify-center">
                  <img src={pokemon.sprites.front} alt={pokemon.name}></img>
                </div>
              </Card>
            </button>
          )}
        </AsyncContent>
      )}
    </>
  );
}
