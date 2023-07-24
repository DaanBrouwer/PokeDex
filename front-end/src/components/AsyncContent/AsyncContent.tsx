import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useEffect, useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { Spinner } from '../Spinner/Spinner';
import { MessageBox } from '../MessageBox/MessageBox';

type Props<T> = {
  /**
   * The result of a `useQuery()` call
   */
  result: UseQueryResult<T>;

  /**
   * A render prop to which you are given
   * the `data` from  the `useQuery()` result.
   *
   * Here you should render something useful.
   *
   * @param {T} data The data which useQuery loaded.
   * @returns {ReactNode} Something useful based on the data.
   */
  children: (data: T) => ReactNode;
};

/**
 * The AsyncContent component is an abstraction around
 * handling asynchronous content. Which is content
 * which is loaded from the back-end.
 *
 * It is basically a companion to the `useQuery` hook.
 *
 * You give it the result of a `useQuery` and it will
 * handle the following things for you:
 *
 *    1. Displaying a loading indicator. Which it will
 *       do only after 200 milliseconds to prevent
 *       loading spinners to be visible for really
 *       fast request.
 *
 *    2. Handle any errors by showing an error message.
 *
 *    3. Re-assuring TypeScript by making sure that
 *       the data is not of type "undefined".
 *
 * You are expected to provide a children "render prop"
 * which takes the "data" and renders something useful.
 */
export function AsyncContent<T>({ result, children }: Props<T>) {
  /* 
    Showing a flashing loading indicator is annoying.
    So only show the loading indicator when the loading
    takes a little while.
  */
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      /*
        The line below is known to cause:

        Warning: An update to AsyncContent inside a test was not wrapped

        This happens when a test is long running, it can be ignored.
      */
      setShowLoading(true);
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const { data, error, isLoading, isError } = result;

  if (isError) {
    console.error(error);
    return (
      <MessageBox>
        <FontAwesomeIcon
          icon={faExclamation}
          className="text-red-400 h-32 w-32"
        />
        <span className="mt-5 text-lg ">Something went wrong!</span>
      </MessageBox>
    );
  } else if (isLoading || !data) {
    if (!showLoading) {
      return null;
    }

    return (
      <MessageBox>
        <Spinner />
        <span className="mt-5 text-lg">Loading...</span>
      </MessageBox>
    );
  } else {
    return <>{children(data)}</>;
  }
}
