export type BarePokemon = {
  id: number;
  name: string;
  sprite: string;
};

export type Pokemon = {
  id: number;
  name: string;
  weight: number;
  height: number;
  stats: Stats[];
  types: Type[];

  sprites: {
    front: string;
    back: string;
  };
};

export type Type = {
  id: number;
  name: string;
  icon: string;
};
export type Stats = {
  id: number;
  name: string;
  value: number;
};

export type BareStats = {
  id: number;
  name: string;
};
