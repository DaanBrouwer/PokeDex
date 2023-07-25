import { useInfiniteQuery } from '@tanstack/react-query';
import { GetAllPokemon, POKEMON_CACHE_KEY } from '../../PokemonServices';
import {
  AsyncContent,
  Button,
  Empty,
  NotFound,
  SearchInput
} from '../../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { PokemonCard } from './components/PokemonCard';
import { useQueryParam } from '../../../../hooks';
import { faArrowsSpin, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function PokemonList() {
  const query = useQueryParam('query', '');
  const navigate = useNavigate();
  const result = useInfiniteQuery(
    [POKEMON_CACHE_KEY, '/pokemons', query],
    ({ pageParam }) => GetAllPokemon(query, pageParam),
    {
      getNextPageParam: (pages) => {
        if (pages.number < pages.totalPages) {
          return pages.number + 1;
        }
      },
      keepPreviousData: true,
      staleTime: 60000
    }
  );

  function search(query: string) {
    navigate(`?page=1&query=${query}`, {
      replace: true
    });
  }
  return (
    <>
      <AsyncContent result={result}>
        {(pokemonPage) => (
          <>
            <div className="flex gap-4 mb-4">
              <SearchInput
                className="grow"
                onChange={search}
                placeholder="Search for a pokemon"
                defaultValue={''}
              ></SearchInput>
              <Link className="flex justify-end" to="/pokemon/create">
                <Button className="rounded-md">
                  <FontAwesomeIcon
                    className="mr-4 flex center"
                    icon={faNewspaper}
                  ></FontAwesomeIcon>
                  Create
                </Button>
              </Link>
            </div>
            {pokemonPage.pages.map((pokemon) => (
              <div className="grid grid-cols-3 gap-4 my-4" key={Math.random()}>
                {pokemon.content.length === 0 ? (
                  query ? (
                    <NotFound>No Pokemon found</NotFound>
                  ) : (
                    <Empty>There are no pokemon yet</Empty>
                  )
                ) : (
                  pokemon.content.map((singlePokemon) => (
                    <PokemonCard
                      key={singlePokemon.id}
                      pokemon={singlePokemon}
                    ></PokemonCard>
                  ))
                )}
              </div>
            ))}

            <Button
              className="rounded-md "
              onClick={() => result.fetchNextPage()}
              disabled={!result.hasNextPage || result.isFetchingNextPage}
            >
              <FontAwesomeIcon
                className="mr-4 flex center"
                icon={faArrowsSpin}
              ></FontAwesomeIcon>
              {result.isFetchingNextPage
                ? 'Loading more...'
                : result.hasNextPage
                ? 'Load More'
                : 'Nothing more to load'}
            </Button>
          </>
        )}
      </AsyncContent>
    </>
  );
}
