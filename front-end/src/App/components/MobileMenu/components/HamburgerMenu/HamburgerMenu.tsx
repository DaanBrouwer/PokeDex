import classNames from 'classnames';
import React from 'react';

import './hamburger.css';

type Props = {
  open: boolean;
  onClick: (open: boolean) => void;
};

export function HamburgerMenu({ open, onClick }: Props) {
  return (
    <ul
      key="hamburger"
      onClick={() => onClick(!open)}
      className={classNames('hamburger-menu', { active: open })}
      role="button"
    >
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
}
