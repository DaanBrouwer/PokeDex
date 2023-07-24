import { ReactNode } from 'react';
import classNames from 'classnames';
import {
  Link,
  useMatch
} from "react-router-dom";

type Props = {
  to: string;
  children: ReactNode;
};

export function NavLink({ to, children }: Props) {
  const active = useMatch({
    path: `${to}/*`
  });
  
  const className = classNames(
    'justify-self-start w-64 text-center my-5 md:my-0 font-bolder',
    'transition-colors duration-200 ease-in-out hover:text-red-500 lg:hover:text-white',
    {
      'text-red-500': active,
      'lg:text-white': active,
    }
  );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}