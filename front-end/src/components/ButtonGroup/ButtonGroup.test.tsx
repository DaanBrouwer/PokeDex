import { render, screen } from '@testing-library/react';
import { GroupButton } from '../GroupButton/GroupButton';
import { ButtonGroup } from './ButtonGroup';

describe('ButtonGroup component', () => {
  it('should render the buttons inside of the group', () => {
    render(
      <ButtonGroup>
        <GroupButton onClick={jest.fn()} active={false}>
          One
        </GroupButton>

        <GroupButton onClick={jest.fn()} active={false}>
          Two
        </GroupButton>

        <GroupButton onClick={jest.fn()} active={false}>
          Three
        </GroupButton>
      </ButtonGroup>
    );

    screen.getByText('One');
    screen.getByText('Two');
    screen.getByText('Three');
  });
});
