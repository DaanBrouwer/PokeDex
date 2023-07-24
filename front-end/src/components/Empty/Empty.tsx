import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
import { MessageBox } from '../MessageBox/MessageBox';

type Props = {
  /**
   * The not found message you want to display to the user.
   */
  children: ReactNode;
};

/**
 * The Empty component renders a version of the
 * MessageBox component and adds a empty icon.
 */
export function Empty({ children }: Props) {
  return (
    <MessageBox>
      <FontAwesomeIcon icon={faDatabase} size="2x" />
      <span className="mt-5 text-lg ">{children}</span>
    </MessageBox>
  );
}
