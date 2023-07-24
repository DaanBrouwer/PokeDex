import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { Page } from '../../types';

type Props = {
  /**
   * Callback which provides you with the new page number.
   * 
   * @param {number} pageNumber The new page number.
   * @returns {void} Nothing
   */
  onChange: (pageNumber: number) => void;

  /**
   * The Page object to initialize the Pager with.
   */
  page: Page<unknown>;
};

/**
 * The Pager component can be used to move through
 * a paginated back-end endpoint. 
 * 
 * It accepts a Page as the input and renders 
 * next and previous buttons, it will automatically
 * disable the buttons if there is no next or previous.
 * 
 * It will render nothing if there is only one page.
 */
export function Pager({ page, onChange }: Props) {
  if (page.first && page.last) {
    return null;
  }

  function prevClicked() {
    return onChange(page.number - 1);
  }

  function nextClicked() {
    return onChange(page.number + 1);
  }

  return (
    <div className="flex justify-center p-4">
      <PagerButton disabled={page.first} onClick={prevClicked} testId="prev">
        <FontAwesomeIcon icon={faChevronLeft} size="2x" className="color-black mr-2" />
      </PagerButton>
      <PagerButton disabled={page.last} onClick={nextClicked} testId="next">
        <FontAwesomeIcon icon={faChevronRight} size="2x" className="color-black ml-2" />
      </PagerButton>
    </div>
  );
}

function PagerButton({
  children,
  disabled,
  onClick,
  testId
}: {
  children: ReactNode;
  disabled: boolean;
  onClick: () => void;
  testId: string;
}) {
  return (
    <button
      className={classNames({
        'hover:text-red-500': !disabled,
        'cursor-default text-gray-400': disabled
      })}
      disabled={disabled}
      onClick={onClick}
      data-testid={testId}
    >
      {children}
    </button>
  );
}
