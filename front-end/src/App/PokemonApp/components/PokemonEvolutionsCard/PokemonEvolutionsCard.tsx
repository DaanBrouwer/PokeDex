import { useQuery } from '@tanstack/react-query';
import { AsyncContent, Card } from '../../../../components';
import { POKEMON_CACHE_KEY, GetEvolutions } from '../../PokemonServices';
import { Pokemon } from '../../PokemonTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  pokemon: Pokemon;
};
export function PokemonEvolutionsCard({ pokemon }: Props) {
  const pokemonEvolutions = useQuery({
    queryKey: [POKEMON_CACHE_KEY, 'pokemon-evolutions', pokemon.id],
    queryFn: () => GetEvolutions(pokemon.id)
  });

  return (
    <AsyncContent result={pokemonEvolutions}>
      {(evolutions) =>
        evolutions.length !== 1 ? (
          <Card className="flex justify-between mt-4 items-center">
            {evolutions.map((evolution, index) => (
              <Fragment>
                <Link to={`/pokemon/${evolution.id}`}>
                  {' '}
                  <img src={evolution.sprite} alt="evolution" />
                </Link>
                {index !== evolutions.length - 1 ? (
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    size="2x"
                  ></FontAwesomeIcon>
                ) : null}
              </Fragment>
            ))}
          </Card>
        ) : null
      }
    </AsyncContent>
  );
}
