import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
 * The NotFound component renders a version of the 
 * MessageBox component and adds a search icon.
 */
export function NotFound({ children }: Props) {
  return (
    <MessageBox>
      <FontAwesomeIcon icon={faSearch} size="2x" />
      <span className="mt-5 text-lg ">{children}</span>
    </MessageBox>
  );
}
