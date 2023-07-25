import { PokemonArenaList } from './components/PokemonArenaList';

export function PokemonArena() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 ">
        <PokemonArenaList></PokemonArenaList>
        <PokemonArenaList></PokemonArenaList>
      </div>
    </>
  );
}
