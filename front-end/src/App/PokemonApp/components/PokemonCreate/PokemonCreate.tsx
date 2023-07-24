import { AsyncContent } from '../../../../components';
import {
  POKEMON_CACHE_KEY,
  getFormData,
  getStats
} from '../../PokemonServices';
import { useQuery } from '@tanstack/react-query';
import { PokemonHookForm } from '../PokemonForm/PokemonHookForm';

export default function PokemonCreate() {
  const response = useQuery({
    queryKey: [POKEMON_CACHE_KEY, '/stats'],
    queryFn: () => getFormData()
  });

  return (
    <>
      <AsyncContent result={response}>
        {({ stats, type }) => (
          <PokemonHookForm
            values={{
              id: -1,
              name: '',
              weight: 0,
              height: 0,
              stats: stats.map((stat) => ({ ...stat, value: 0 })),
              types: [],
              sprites: {
                front: '',
                back: ''
              }
            }}
            stats={stats}
            type={type}
          ></PokemonHookForm>
        )}
      </AsyncContent>
    </>
  );
}
