import classNames from 'classnames';
import { MouseEvent, ReactNode } from 'react';

type Props = {
  /**
   * Optionally what needs to happen when the button is clicked.
   *
   * @param {MouseEvent<HTMLButtonElement>} event The mouse event.
   * @returns
   */
  onClick(event: MouseEvent<HTMLButtonElement>): void;

  /**
   * The text of the button.
   */
  children: ReactNode;

  /**
   * Whether or not this GroupButton is active.
   */
  active: boolean;
};

/**
 * The GroupButton component is a button to be rendered
 * inside of a GroupButton.
 */
export function GroupButton({ onClick, children, active }: Props) {
  return (
    <button
      className={classNames(
        ' m-0 p-4 bg-black text-white text-lg hover:bg-red-500',
        { 'bg-red-500': active }
      )}
      onClick={(event) => onClick(event)}
    >
      {children}
    </button>
  );
}
