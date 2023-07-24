import classNames from 'classnames';
import { MouseEvent, ReactNode } from 'react';

type Props = {
  /**
   * Optionally what needs to happen when the button is clicked.
   *
   * @param {MouseEvent<HTMLButtonElement>} event The mouse event.
   * @returns
   */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;

  /**
   * The text of the button.
   */
  children: ReactNode;
  
  /**
   * Optionally the type of the button.
   *
   * By default it will be a "button".
   */
  type?: 'button' | 'submit';

  /**
   * Whether or not the button is disabled.
   *
   * Can be used to prevent double submits.
   */
  disabled?: boolean;

  /**
   * Optionally some additional className's for the Button.
   */
  className?: string;
};

/**
 * The Button component renders a styled black button
 * which when hovered turns red and does an animation.
 */
export function Button({
  onClick,
  children,
  disabled,
  type = 'button',
  className
}: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={classNames(
        'flex items-center justify-center',
        'p-4 border',
        'bg-black text-white text-lg',
        'transform duration-200 hover:scale-95 hover:bg-red-500',
        className
      )}
    >
      {children}
    </button>
  );
}
