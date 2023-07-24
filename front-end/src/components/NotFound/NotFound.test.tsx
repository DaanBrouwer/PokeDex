import { render, screen } from '@testing-library/react';
import { NotFound } from './NotFound';

describe('NotFound Component', () => {
  it('should render', () => {
    render(<NotFound>No stuff found based on query</NotFound>);

    screen.getByText('No stuff found based on query');
  });
});
