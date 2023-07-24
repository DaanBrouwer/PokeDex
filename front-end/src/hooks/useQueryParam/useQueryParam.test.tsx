import { renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { MockRouter } from '../../../test/MockRouter';
import { useQueryParam } from '../index';

describe('useQueryParam hook', () => {
  it('should return the value of the query param when it is found', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockRouter path="/pokedex" initialRoute="/pokedex?page=1&query=saur">
        {children}
      </MockRouter>
    );

    const { result } = renderHook(() => useQueryParam('page', '1337'), {
      wrapper,
    });

    expect(result.current).toBe('1');
  });

  it('should return the value default value when the query param is not defined in the url', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockRouter path="/pokedex" initialRoute="/pokedex?query=saur">
        {children}
      </MockRouter>
    );

    const { result } = renderHook(() => useQueryParam('page', '1337'), {
      wrapper,
    });

    expect(result.current).toBe('1337');
  });
});
