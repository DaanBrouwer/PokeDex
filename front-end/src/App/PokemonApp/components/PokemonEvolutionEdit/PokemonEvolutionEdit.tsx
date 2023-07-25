import { useQuery } from '@tanstack/react-query';
import { GetEvolutions, POKEMON_CACHE_KEY } from '../../PokemonServices';
import { useParams } from 'react-router-dom';
import { StringSchema } from 'yup';
import { AsyncContent } from '../../../../components';
import { PokemonCard } from '../PokemonList/components/PokemonCard';

type Props = {
  id: string;
};
export function PokemonEvolutionEdit() {
  const { id = '1' } = useParams<Props>();
  const result = useQuery({
    queryKey: [POKEMON_CACHE_KEY, 'pokemon-evolution-edit', id],
    queryFn: () => GetEvolutions(id)
  });
  return (
    <div>
      <AsyncContent result={result}>
        {(pokemonEvolution) =>
          pokemonEvolution.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon}></PokemonCard>
          ))
        }
      </AsyncContent>
    </div>
  );
}
