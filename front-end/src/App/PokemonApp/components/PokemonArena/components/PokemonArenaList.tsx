import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';

import { AsyncContent, SearchInput } from '../../../../../components';
import { POKEMON_CACHE_KEY, GetAllPokemon } from '../../../PokemonServices';
import { useState } from 'react';
import { PokemonArenaCard } from './PokemonArenaCard';

export function PokemonArenaList() {
  const [query, setQuery] = useState('');
  const result = useQuery({
    queryKey: [POKEMON_CACHE_KEY, '/pokemon-arena', query],
    queryFn: () => GetAllPokemon(query),
    keepPreviousData: true,
    staleTime: 60000
  });

  function search(newQuery: string) {
    setQuery(newQuery);
  }

  return (
    <>
      <AsyncContent result={result}>
        {(pokemonPage) => (
          <>
            <div className="mb-4">
              <SearchInput
                onChange={search}
                placeholder="Search for a pokemon"
                defaultValue={''}
              ></SearchInput>

              {pokemonPage.content.map((singlePokemon) => (
                <div className="grid gap-4 mb-4 mt-4">
                  <PokemonArenaCard
                    key={singlePokemon.id}
                    id={singlePokemon.id}
                  ></PokemonArenaCard>
                </div>
              ))}
            </div>
          </>
        )}
      </AsyncContent>
    </>
  );
}
