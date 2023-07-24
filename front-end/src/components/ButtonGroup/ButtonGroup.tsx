import { ReactNode } from 'react';

type Props = {
  /**
   * The GroupButtons you want to render as a group.
   */
  children: ReactNode;
};

/**
 * The ButtonGroup component renders GroupButtons in the
 * center of a div, without any space in between
 * the buttons.
 * 
 * The idea is that only one of the ButtonGroup buttons
 * is active at a time. This indicates to the user which
 * "mode" is active. 
 * 
 * For example when using a text editor you can often
 * align the text to the left, right or center. This
 * component would be ideal to represent this situation.
 */
export function ButtonGroup({ children }: Props) {
  return <div className="flex justify-center p-2">{children}</div>;
}
