import { ResponsiveRadar } from '@nivo/radar';
import { Stats } from '../../PokemonTypes';
import { Card } from '../../../../components';

type Props = {
  stats: Stats[];
};

export default function PokemonRadarChart({ stats }: Props) {
  return (
    <Card>
      <ResponsiveRadar
        data={stats}
        keys={['value']}
        indexBy="name"
        maxValue="auto"
        margin={{ top: 30, bottom: 30 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={3}
        gridShape="circular"
        gridLabelOffset={20}
        colors={{ scheme: 'dark2' }}
        fillOpacity={0.5}
        blendMode="darken"
        motionConfig="wobbly"
      />
    </Card>
  );
}
