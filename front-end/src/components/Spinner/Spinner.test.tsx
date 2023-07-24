import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner component', () => {
  it('should render a Spinner', () => {
    render(<Spinner />);
  });
});
