import axios from 'axios';
import { Page } from '../../types';
import { BarePokemon, Pokemon, BareStats, Type } from './PokemonTypes';

export const POKEMON_CACHE_KEY = 'pokemon';
export async function GetAllPokemon(query: string, page?: number) {
  const response = await axios.get('/api/pokemon', {
    params: {
      size: 9,
      page,
      query
    }
  });
  return response.data as Page<BarePokemon>;
}

export async function GetPokemon(id: string | number) {
  const response = await axios.get(`/api/pokemon/${id}`);

  return response.data as Pokemon;
}

export async function GetEvolutions(id: string | number) {
  const response = await axios.get(`/api/pokemon/${id}/evolutions`);

  return response.data as BarePokemon[];
}

export async function deletePokemon(id: number | string) {
  await axios.delete(`/api/pokemon/${id}`);
}

export async function postNewPokemon(pokemon: globalThis.FormData) {
  const response = await axios.post('/api/pokemon', pokemon);
  return response.data as Pokemon;
}

export async function updatePokemon(pokemon: globalThis.FormData) {}

export async function getStats() {
  const response = await axios.get('/api/stats');
  return response.data as BareStats[];
}

export async function getTypes() {
  const response = await axios.get<Page<Type>>('/api/types?size=1000');

  return response.data.content as Type[];
}

type FormData = {
  stats: BareStats[];
  type: Type[];
};
export async function getFormData(): Promise<FormData> {
  const [stats, type] = await Promise.all([getStats(), getTypes()]);

  return { stats, type };
}
