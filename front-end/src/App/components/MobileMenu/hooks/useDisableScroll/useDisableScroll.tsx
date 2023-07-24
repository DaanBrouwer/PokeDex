import { useEffect } from 'react';

export function useDisableScroll(open: boolean): void {
  // Disable scrolling when mobile menu is opened
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [open]);
}
