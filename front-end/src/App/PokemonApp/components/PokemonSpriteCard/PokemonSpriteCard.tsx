import { useState } from 'react';
import { Button, Card } from '../../../../components';
import { Pokemon } from '../../PokemonTypes';

type Prop = {
  pokemon: Pokemon;
};
export function PokemonSpriteCard({ pokemon }: Prop) {
  const [front, setFront] = useState(true);
  return (
    <Card>
      <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
      <div className="flex flex-col items-center">
        {front ? (
          <img className="w-64 h-64" src={pokemon.sprites.front}></img>
        ) : (
          <img className="w-64 h-64" src={pokemon.sprites.back}></img>
        )}
        <Button className="w-full" onClick={() => setFront(!front)}>
          Switch view
        </Button>
      </div>
    </Card>
  );
}
