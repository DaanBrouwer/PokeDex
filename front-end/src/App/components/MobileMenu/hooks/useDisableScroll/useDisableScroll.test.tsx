import { renderHook } from '@testing-library/react';
import { useDisableScroll } from './useDisableScroll';

describe('useQueryParam hook', () => {
  it('should return the value of the query param when it is found', () => {
    const { rerender } = renderHook(({ open }) => useDisableScroll(open), {
      initialProps: {
        open: false
      }
    });

    expect(document.body.style.overflow).toBe('visible');

    rerender({ open: true });

    expect(document.body.style.overflow).toBe('hidden');

    rerender({ open: false });

    expect(document.body.style.overflow).toBe('visible');
  });
});
