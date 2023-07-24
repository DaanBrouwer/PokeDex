import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Page } from '../../types';
import { Pager } from './Pager';

describe('Pager component', () => {
  it('should render nothing then the page is both first and last', () => {
    const page: Page<unknown> = {
      first: true,
      last: true,
      number: 1,
      totalElements: 0,
      totalPages: 0,
      size: 10,
      content: [],
    };

    render(<Pager page={page} onChange={jest.fn()} />);

    expect(screen.queryByTestId('next')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prev')).not.toBeInTheDocument();
  });

  it('should when clicking on the < go to the previous page', async () => {
    expect.assertions(2);

    const page: Page<unknown> = {
      first: false,
      last: false,
      number: 5,
      totalElements: 0,
      totalPages: 0,
      size: 10,
      content: [],
    };

    const onChangeSpy = jest.fn();

    render(<Pager page={page} onChange={onChangeSpy} />);

    await userEvent.click(screen.getByTestId('prev'));

    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(onChangeSpy).toBeCalledWith(4);
  });

  it('should when clicking on the > go to the next page', async() => {
    expect.assertions(2);

    const page: Page<unknown> = {
      first: false,
      last: false,
      number: 5,
      totalElements: 0,
      totalPages: 0,
      size: 10,
      content: [],
    };

    const onChangeSpy = jest.fn();

    render(<Pager page={page} onChange={onChangeSpy} />);

    await userEvent.click(screen.getByTestId('next'));

    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(onChangeSpy).toBeCalledWith(6);
  });

  it('should when the user is on the first page disabled the < button', async () => {
    expect.assertions(1);

    const page: Page<unknown> = {
      first: true,
      last: false,
      number: 1,
      totalElements: 0,
      totalPages: 0,
      size: 10,
      content: [],
    };

    const onChangeSpy = jest.fn();

    render(<Pager page={page} onChange={onChangeSpy} />);

    await userEvent.click(screen.getByTestId('prev'));

    expect(onChangeSpy).toHaveBeenCalledTimes(0);
  });

  it('should when the user is on the last page disabled the > button', async () => {
    expect.assertions(1);

    const page: Page<unknown> = {
      first: false,
      last: true,
      number: 5,
      totalElements: 0,
      totalPages: 0,
      size: 10,
      content: [],
    };

    const onChangeSpy = jest.fn();

    render(<Pager page={page} onChange={onChangeSpy} />);

    await userEvent.click(screen.getByTestId('next'));

    expect(onChangeSpy).toHaveBeenCalledTimes(0);
  });
});
