import { Children, ReactNode, useState } from 'react';

import { HamburgerMenu } from './components/HamburgerMenu/HamburgerMenu';
import { useDisableScroll } from './hooks/useDisableScroll/useDisableScroll';
import './mobile-menu.css';

type Props = {
  children: ReactNode;
};

export function MobileMenu({ children }: Props) {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }
  
  useDisableScroll(open);

  return (
    <>
      <div className="lg:hidden my-8 z-50 ml-16">
        <HamburgerMenu key="menu" open={open} onClick={setOpen} />
      </div>

      {open ? (
        <div className="fixed inset-x-0 top-0 z-40 h-screen bg-gray-50">
          <div className="mobile-menu flex flex-col gap-8 justify-center h-full">
            {Children.map(children, (nav) => (
              <div className="text-center" onClick={close}>
                {nav}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
