import { useParams } from 'react-router-dom';
import { GetPokemon, POKEMON_CACHE_KEY } from '../../PokemonServices';
import { useQuery } from '@tanstack/react-query';
import { AsyncContent, Button } from '../../../../components';
import { PokemonEvolutionsCard } from '../PokemonEvolutionsCard/PokemonEvolutionsCard';
import { PokemonTypes } from '../PokemonTypes/PokemonTypes';
import { PokemonStats } from '../PokemonStats/PokemonStats';
import { PokemonSpriteCard } from '../PokemonSpriteCard/PokemonSpriteCard';
import { PokemonDelete } from '../PokemonDelete/PokemonDelete';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import PokemonRadarChart from '../PokemonRadarChart/PokemonRadarChart';

type PokemonDetailParam = {
  id: string;
};
export function PokemonDetail() {
  const { id = '1' } = useParams<PokemonDetailParam>();
  const pokemondetail = useQuery({
    queryKey: [POKEMON_CACHE_KEY, 'pokemon-detail', id],
    queryFn: () => GetPokemon(id)
  });

  return (
    <div className="grid gap-4">
      <>
        <div className="flex justify-between">
          <Link to="../">
            <Button>
              <FontAwesomeIcon
                className="mr-4 flex center"
                icon={faArrowLeft}
              ></FontAwesomeIcon>
              Back
            </Button>
          </Link>
          <Link to="edit">
            <Button>
              <FontAwesomeIcon
                className="mr-4 flex"
                icon={faEdit}
              ></FontAwesomeIcon>
              Edit
            </Button>
          </Link>
        </div>

        <AsyncContent result={pokemondetail}>
          {(pokemon) => (
            <>
              <div className="grid grid-cols-2 gap-2">
                <PokemonSpriteCard pokemon={pokemon}></PokemonSpriteCard>
                <PokemonRadarChart stats={pokemon.stats}></PokemonRadarChart>
              </div>

              <PokemonTypes pokemon={pokemon}></PokemonTypes>
              <PokemonStats pokemon={pokemon}></PokemonStats>
              <PokemonEvolutionsCard pokemon={pokemon}></PokemonEvolutionsCard>

              <PokemonDelete pokemon={pokemon}></PokemonDelete>
            </>
          )}
        </AsyncContent>
      </>
    </div>
  );
}
