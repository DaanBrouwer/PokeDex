import { useNavigate } from 'react-router-dom';
import { POKEMON_CACHE_KEY, deletePokemon } from '../../PokemonServices';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Modal } from '../../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Pokemon } from '../../PokemonTypes';
import { successFlashMessage } from '../../../components/FlashMessages/flash-message-service';
import { useState } from 'react';

type Props = {
  pokemon: Pokemon;
};
export function PokemonDelete({ pokemon }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  function removePokemon() {
    deletePokemon(pokemon.id);
    successFlashMessage(`The pokemon ${pokemon.name} is removed successfully`);
    queryClient.invalidateQueries([POKEMON_CACHE_KEY]);
    navigate('/pokemon');
  }
  return (
    <>
      {showModal ? (
        <Modal title="Confirmation" onClose={() => setShowModal(false)}>
          Do you want to remove {pokemon.name}?
          <Button className="capitalize" onClick={removePokemon}>
            <FontAwesomeIcon
              className="mr-4 flex center"
              icon={faTrashCan}
            ></FontAwesomeIcon>
            Remove {pokemon.name}
          </Button>
        </Modal>
      ) : (
        <Button className="capitalize" onClick={() => setShowModal(true)}>
          <FontAwesomeIcon
            className="mr-4 flex center"
            icon={faTrashCan}
          ></FontAwesomeIcon>
          Remove {pokemon.name}
        </Button>
      )}
    </>
  );
}
