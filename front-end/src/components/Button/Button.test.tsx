import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button component', () => {
  it('should when the button is enabled, and clicked call the onClick callback', async () => {
    expect.assertions(2);

    const onClickSpy = jest.fn();

    render(
      <Button onClick={onClickSpy} disabled={false}>
        Click me!
      </Button>
    );

    await userEvent.click(screen.getByText('Click me!'));

    expect(onClickSpy).toBeCalledTimes(1);
    expect(onClickSpy).toBeCalledWith(
      expect.objectContaining({ type: 'click' })
    );
  });

  it('should when the button is disabled ignore the click', async () => {
    expect.assertions(1);

    const onClickSpy = jest.fn();

    render(
      <Button onClick={onClickSpy} disabled={true}>
        Click me!
      </Button>
    );

    await userEvent.click(screen.getByText('Click me!'));

    expect(onClickSpy).toBeCalledTimes(0);
  });
});
