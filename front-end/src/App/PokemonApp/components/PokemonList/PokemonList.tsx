import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { GetAllPokemon, POKEMON_CACHE_KEY } from '../../PokemonServices';
import {
  AsyncContent,
  Button,
  Empty,
  NotFound,
  Pager,
  SearchInput
} from '../../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { PokemonCard } from './components/PokemonCard';
import { useQueryParam } from '../../../../hooks';
import { faArrowLeft, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function PokemonList() {
  const page = useQueryParam('page', 1);
  const query = useQueryParam('query', '');
  const navigate = useNavigate();
  const result = useQuery({
    queryKey: [POKEMON_CACHE_KEY, '/pokemons', page, query],
    queryFn: () => GetAllPokemon(page, query),

    keepPreviousData: true,
    staleTime: 60000
  });

  function pageChanged(page: number) {
    navigate(`?page=${page}&query=${query}`, {
      replace: true
    });
  }
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

            {pokemonPage.content.length === 0 ? (
              query ? (
                <NotFound>No Pokemon found</NotFound>
              ) : (
                <Empty>There are no pokemon yet</Empty>
              )
            ) : null}
            <div className="grid md:grid-cols-3 gap-4 my-4">
              {pokemonPage.content.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon}></PokemonCard>
              ))}
            </div>
            <Pager page={pokemonPage} onChange={pageChanged}></Pager>
          </>
        )}
      </AsyncContent>
    </>
  );
}
