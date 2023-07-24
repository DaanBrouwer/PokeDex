import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './SearchInput';

describe('SearchInput component', () => {
  it('should debounce the onChange so it will not spam the back-end', async () => {
    expect.hasAssertions();

    const onChangeSpy = jest.fn();

    render(
      <SearchInput
        defaultValue="bulba"
        onChange={onChangeSpy}
        placeholder="Find pokemon by name"
      />
    );

    await userEvent.type(
      screen.getByPlaceholderText('Find pokemon by name'),
      'saur'
    );

    expect(onChangeSpy).toHaveBeenCalledTimes(0);

    await waitFor(() => {
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    expect(onChangeSpy).toHaveBeenCalledWith('bulbasaur');
  });

  it('should when enter is pressed send query immediately', async () => {
    expect.assertions(2);

    const onChangeSpy = jest.fn();

    render(
      <SearchInput
        defaultValue="bulba"
        onChange={onChangeSpy}
        placeholder="Find pokemon by name"
      />
    );

    await userEvent.type(
      screen.getByPlaceholderText('Find pokemon by name'),
      'saur{enter}'
    );

    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(onChangeSpy).toHaveBeenCalledWith('bulbasaur');
  });
});
