import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { debounce } from 'lodash';
import { ChangeEvent, KeyboardEvent, useRef } from 'react';
import { Box } from '..';

type Props = {
  /**
   * The initial value to display in the search input.
   * 
   * As per React convention changing the defaultValue
   * after the SearchInput has rendered will not update
   * the value inside of the <input>
   */
  defaultValue: string;

  /**
   * A callback which will inform you of changes to the <input>
   * element. This is however debounced to 500 milliseconds,
   * to prevent spamming the back-end.
   * 
   * @param {string} value What the user typed into the <input>.
   */
  onChange(value: string): void;

  /**
   * The placeholder for the <input> element.
   */
  placeholder: string;

  /**
   * Optionally some additional className's for the <input>.
   */
  className?: string;
};

/**
 * The SearchInput component renders an <input> element which a nice
 * search icon.
 * 
 * The <input> is also debounced, meaning it will only call onChange
 * after the user has stopped typing for an 500 milliseconds. 
 * 
 * This way you can prevent spamming your back-end, otherwise each
 * keystroke would end up as a request to the back-end. 
 */
export function SearchInput({ defaultValue, onChange, className, placeholder }: Props) {
  const debouncer = useRef(debounce(handleOnChange, 500));

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  function handleKeyUp(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;

    if (event.key === 'Enter') {
      onChange(target.value);
    }
  }

  return (
    <Box className={className}>
      <div className="flex items-center p-2">
        <FontAwesomeIcon icon={faSearch} size="lg" className="mr-2 h-8 w-8 text-black" />
        <input
          className="border-0 appearance-none w-full h-12 text-2xl focus:outline-none focus:box-shadow-none"
          type="text"
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={debouncer.current}
          onKeyUp={handleKeyUp}
        />
      </div>
    </Box>
  );
}
