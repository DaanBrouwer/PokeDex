import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal Component', () => {
  it('should render without a title', () => {
    const onCloseSpy = jest.fn();

    render(<Modal onClose={onCloseSpy}>Modal content goes here</Modal>);

    screen.getByText('Modal content goes here');
  });

  it('should render a title when given', () => {
    const onCloseSpy = jest.fn();

    render(
      <Modal title="Some title" onClose={onCloseSpy}>
        Modal content goes here
      </Modal>
    );

    screen.getByText('Some title');
    screen.getByText('Modal content goes here');
  });

  it('should close when close x circle is pressed', async () => {
    expect.assertions(2);

    const onCloseSpy = jest.fn();

    render(<Modal onClose={onCloseSpy}>Important message goes here</Modal>);

    await userEvent.click(screen.getByTestId('modal-close'));

    expect(onCloseSpy).toBeCalledTimes(1);
    expect(onCloseSpy).toBeCalledWith();
  });

  it('should close when backdrop is pressed', async () => {
    expect.assertions(2);

    const onCloseSpy = jest.fn();

    render(<Modal onClose={onCloseSpy}>Important message goes here</Modal>);

    await userEvent.click(screen.getByTestId('modal-backdrop'));

    expect(onCloseSpy).toBeCalledTimes(1);
    expect(onCloseSpy).toBeCalledWith();
  });

  it('should not close button inside of modal is clicked', async () => {
    expect.assertions(1);

    const onCloseSpy = jest.fn();

    render(<Modal onClose={onCloseSpy}><button>Confirm</button></Modal>);

    await userEvent.click(screen.getByText('Confirm'));

    expect(onCloseSpy).toBeCalledTimes(0);
  });
});
