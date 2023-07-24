import { useParams } from 'react-router-dom';
import { Pokemon } from '../../PokemonTypes';
import {
  GetPokemon,
  POKEMON_CACHE_KEY,
  getFormData,
  postNewPokemon
} from '../../PokemonServices';
import { successFlashMessage } from '../../../components/FlashMessages/flash-message-service';
import { useQuery } from '@tanstack/react-query';
import { AsyncContent } from '../../../../components';
import { PokemonHookForm } from '../PokemonForm/PokemonHookForm';
type PokemonDetailParam = {
  id: string;
};

export default function PokemonEdit() {
  const { id = '1' } = useParams<PokemonDetailParam>();

  const pokemondetail = useQuery({
    queryKey: [POKEMON_CACHE_KEY, 'pokemon-detail', id],
    queryFn: () => GetPokemon(id)
  });
  const response = useQuery({
    queryKey: [POKEMON_CACHE_KEY, '/stats'],
    queryFn: () => getFormData()
  });

  return (
    <>
      <AsyncContent result={pokemondetail}>
        {(pokemon) => (
          <AsyncContent result={response}>
            {({ stats, type }) => (
              <PokemonHookForm
                values={pokemon}
                stats={stats}
                type={type}
              ></PokemonHookForm>
            )}
          </AsyncContent>
        )}
      </AsyncContent>
    </>
  );
}
