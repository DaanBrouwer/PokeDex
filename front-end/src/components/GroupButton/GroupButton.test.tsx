import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GroupButton } from './GroupButton';

describe('GroupButton component', () => {
  it('should when the button is clicked call the onClick callback', async () => {
    expect.assertions(2);

    const onClickSpy = jest.fn();

    render(
      <GroupButton onClick={onClickSpy} active={false}>
        Click me!
      </GroupButton>
    );

    await userEvent.click(screen.getByText('Click me!'));

    expect(onClickSpy).toBeCalledTimes(1);
    expect(onClickSpy).toBeCalledWith(
      expect.objectContaining({ type: 'click' })
    );
  });

  it('should when the button is active render with a red background', () => {
    const onClickSpy = jest.fn();

    render(
      <GroupButton onClick={onClickSpy} active={true}>
        Click me!
      </GroupButton>
    );

    const button = screen.getByText('Click me!');
    expect(button).toHaveClass('bg-red-500');
  });
});
