import { render, screen } from '@testing-library/react';
import { Empty } from './Empty';

describe('Empty Component', () => {
  it('should render', () => {
    render(<Empty>No stuff found based on query</Empty>);

    screen.getByText('No stuff found based on query');
  });
});
