import { act, render, screen } from '@testing-library/react';
import { UseQueryResult } from '@tanstack/react-query';
import { AsyncContent } from '..';

describe('AsyncContent component', () => {
  it('should wait before rendering a loading indicator until 200 milliseconds have passed', () => {
    jest.useFakeTimers();

    // @ts-expect-error Test mock
    const result: UseQueryResult = {
      isLoading: true,
    };

    render(
      <AsyncContent result={result}>{() => <p>Children</p>}</AsyncContent>
    );

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(201);
    });

    screen.queryByText('Loading...');
  });

  it('should render a loading indicator when status is loading', () => {
    jest.useFakeTimers();

    // @ts-expect-error Test mock
    const result: UseQueryResult = {
      isLoading: true,
    };

    render(
      <AsyncContent result={result}>{() => <p>Children</p>}</AsyncContent>
    );

    act(() => {
      jest.advanceTimersByTime(201);
    });

    screen.getByText('Loading...');
  });

  it('should render a loading indicator when data is undefined', () => {
    jest.useFakeTimers()

    // @ts-expect-error Test mock
    const result: UseQueryResult = {
      data: undefined,
    };

    render(
      <AsyncContent result={result}>{() => <p>Children</p>}</AsyncContent>
    );

    act(() => {
      jest.advanceTimersByTime(201);
    });

    screen.getByText('Loading...');
  });

  it('should render an error message when status is error', () => {
    // @ts-expect-error Test mock
    const result: UseQueryResult = {
      isError: true,
      error: 'Error string',
    };

    jest.spyOn(console, 'error').mockImplementation();

    render(
      <AsyncContent result={result}>{() => <p>Children</p>}</AsyncContent>
    );

    const error = screen.getByText('Something went wrong!');

    expect(error).toBeInTheDocument();

    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith('Error string');
  });

  it('should render the children when there are no errors and the data is fetched', () => {
    // @ts-expect-error Test mock
    const result: UseQueryResult<string> = {
      isError: false,
      isLoading: false,
      data: 'Children',
    };

    jest.spyOn(console, 'error').mockImplementation();

    render(
      <AsyncContent result={result}>{(data) => <p>{data}</p>}</AsyncContent>
    );

    const normal = screen.getByText('Children');

    expect(normal).toBeInTheDocument();
  });
});
