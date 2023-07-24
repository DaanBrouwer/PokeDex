import { faHdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  ImageInput,
  MultiCheckbox,
  Button
} from '../../../../components';
import { successFlashMessage } from '../../../components/FlashMessages/flash-message-service';
import {
  postNewPokemon,
  POKEMON_CACHE_KEY,
  updatePokemon
} from '../../PokemonServices';
import { BareStats, Type, Pokemon } from '../../PokemonTypes';
import axios from 'axios';

const pokemonSchema = Yup.object({
  name: Yup.string().required().max(50).label('Name'),
  weight: Yup.number()
    .required()
    .min(1)
    .max(50)
    .label('Weight')
    .typeError('This is not a number'),
  height: Yup.number()
    .required()
    .min(1)
    .max(50)
    .label('Height')
    .typeError('This is not a number'),
  sprites: Yup.object({
    front: Yup.mixed().test(
      'file',
      'Front is a required file',
      (value) => value
    ),
    back: Yup.mixed().test('file', 'Back is a required file', (value) => value)
  }),
  stats: Yup.array(
    Yup.object({
      value: Yup.number()
        .required()
        .min(1)
        .max(50)
        .label('This')
        .typeError('This is not a number')
    })
  ),
  types: Yup.array().required().min(1).label('Types')
});

type Props = {
  stats: BareStats[];
  type: Type[];
  values: Pokemon;
};
export function PokemonHookForm({ values, stats, type }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm<Pokemon>({
    values,
    resolver: yupResolver(pokemonSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });

  async function createPokemon(form: Pokemon) {
    const savedPokemon = save(form);
    queryClient.invalidateQueries([POKEMON_CACHE_KEY]);
    successFlashMessage(`Pokemon ${(await savedPokemon).name} Saved`);
    navigate(`/pokemon/${(await savedPokemon).id}`);
  }

  async function save(form: Pokemon) {
    const pokemonData = new FormData();
    pokemonData.append('front', form.sprites.front);
    pokemonData.append('back', form.sprites.back);
    pokemonData.append('form', JSON.stringify(form));

    if (form.id === -1) {
      const response = await axios.post('/api/pokmeon', pokemonData);
      return response.data as Pokemon;
    } else {
      const response = await axios.put(`/api/pokemon/${form.id}`, pokemonData);
      return response.data as Pokemon;
    }
  }

  return (
    <>
      <FormProvider {...form}>
        <form
          className="grid gap-4"
          onSubmit={form.handleSubmit((form) => createPokemon(form))}
        >
          <Input<Pokemon> name="name" label={'Name'}></Input>
          <Input<Pokemon> name="weight" label="Weight" type="number"></Input>
          <Input<Pokemon> name="height" label="Height" type="number"></Input>

          <ImageInput<Pokemon> name="sprites.front" label="Front"></ImageInput>
          <ImageInput<Pokemon> name="sprites.back" label="Back"></ImageInput>
          {stats.map((stat, index) => (
            <Input<Pokemon>
              key={stat.id}
              name={`stats.${index}.value`}
              label={stat.name.toUpperCase()}
              type="number"
            ></Input>
          ))}

          <MultiCheckbox<Pokemon, Type>
            name="types"
            label="Types*"
            options={type}
            labelForOption={(type) => type.name}
          ></MultiCheckbox>

          <Button className="mt-4" type="submit">
            <FontAwesomeIcon
              icon={faHdd}
              className="gap-2 mr-4"
            ></FontAwesomeIcon>
            Submit
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
