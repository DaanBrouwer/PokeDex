import { render, screen } from '@testing-library/react';
import { Box } from '..';

describe('Box Component', () => {
  it('should render', () => {
    render(<Box>Content</Box>);

    screen.getByText('Content');
  });
});
