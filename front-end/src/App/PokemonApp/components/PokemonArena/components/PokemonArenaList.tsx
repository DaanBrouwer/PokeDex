import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';

import {
  AsyncContent,
  Empty,
  NotFound,
  SearchInput
} from '../../../../../components';
import { POKEMON_CACHE_KEY, GetAllPokemon } from '../../../PokemonServices';
import { useState } from 'react';
import { PokemonArenaCard } from './PokemonArenaCard';
import { PokemonCard } from '../../PokemonList/components/PokemonCard';

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

              {pokemonPage.content.length === 0 ? (
                query ? (
                  <NotFound>No Pokemon found</NotFound>
                ) : (
                  <Empty>There are no pokemon yet</Empty>
                )
              ) : (
                pokemonPage.content.map((singlePokemon) => (
                  <div className="grid gap-4 my-4">
                    <PokemonArenaCard id={singlePokemon.id}></PokemonArenaCard>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </AsyncContent>
    </>
  );
}
