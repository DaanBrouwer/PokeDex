import { render, screen } from '@testing-library/react';
import { Card } from '..';

describe('Card Component', () => {
  it('should render', () => {
    render(<Card>Content</Card>);

    screen.getByText("Content");
  });
});
