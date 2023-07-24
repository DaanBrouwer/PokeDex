import classNames from 'classnames';
import { ReactNode } from 'react';
import { Box } from '../Box/Box';

type Props = {
  /**
   * The contents of the Card.
   */
  children: ReactNode;

  /**
   * Optionally some additional className's for the Card.
   */
  className?: string;
};

/**
 * The Card component renders a Box but with
 * some sensible padding applied to it.
 * 
 * You are expected to set the content of
 * the Card by providing children.
 */
export function Card({ children, className }: Props) {
  return (
    <Box
      className={classNames(
        'p-4',
        className
      )}
    >
      {children}
    </Box>
  );
}
