import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HamburgerMenu } from './HamburgerMenu';

describe('HamburgerMenu component', () => {
  it('should call open with true when clicked when open is false', async () => {
    expect.assertions(2);

    const onClickSpy = jest.fn();

    render(<HamburgerMenu open={false} onClick={onClickSpy} />);

    await userEvent.click(screen.getByRole('button'));

    expect(onClickSpy).toBeCalledTimes(1);
    expect(onClickSpy).toBeCalledWith(true);
  });

  it('should call open with false when clicked when open is true', async () => {
    expect.assertions(2);

    const onClickSpy = jest.fn();

    render(<HamburgerMenu open={true} onClick={onClickSpy} />);

    await userEvent.click(screen.getByRole('button'));

    expect(onClickSpy).toBeCalledTimes(1);
    expect(onClickSpy).toBeCalledWith(false);
  });
});
