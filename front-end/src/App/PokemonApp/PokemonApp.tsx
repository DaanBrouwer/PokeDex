import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { PokemonDetail } from './components/PokemonDetail/PokemonDetail';
import { PokemonList } from './components/PokemonList/PokemonList';
import { WeatherStationList } from './components/WeatherStationList/WeatherStationList';

const PokemonEdit = lazy(() => import('./components/PokemonEdit/PokemonEdit'));
const PokemonCreate = lazy(
  () => import('./components/PokemonCreate/PokemonCreate')
);

export function PokemonApp() {
  return (
    <Routes>
      <Route path="" element={<PokemonList></PokemonList>}></Route>
      <Route path="create" element={<PokemonCreate></PokemonCreate>}></Route>
      <Route path=":id" element={<PokemonDetail></PokemonDetail>}></Route>
      <Route path=":id/edit" element={<PokemonEdit></PokemonEdit>}></Route>
    </Routes>
  );
}
