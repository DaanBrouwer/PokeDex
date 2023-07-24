import { render, screen } from '@testing-library/react';
import { MessageBox } from './MessageBox';

describe('MessageBox Component', () => {
  it('should render', () => {
    render(<MessageBox>Important message goes here</MessageBox>);

    screen.getByText('Important message goes here');
  });
});
