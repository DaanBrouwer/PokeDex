import classNames from 'classnames';
import { ReactNode } from 'react';

type Props = {
  /**
   * The contents of the Box.
   */
  children: ReactNode;

  /**
   * Optionally some additional className's for the Box.
   */
  className?: string;
};

/**
 * The Box component renders a simple bordered
 * <div> with a shadow, and a white background.
 * 
 * You are expected to set the content of
 * the Box by providing children.
 * 
 * If you need some padding try the Card component
 * instead.
 */
export function Box({ children, className }: Props) {
  return (
    <div
      className={classNames(
        'border rounded shadow bg-white',
        className
      )}
    >
      {children}
    </div>
  );
}
