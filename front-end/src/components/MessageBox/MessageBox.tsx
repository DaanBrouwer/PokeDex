
import { ReactNode } from 'react';
import { Box } from '../';

type Props = {
  /**
   * The content of the MessageBox.
   */
  children: ReactNode;
};

/**
 * The MessageBox component renders a version of the 
 * Box component which centers the content. Used
 * to render error, loading and empty messages.
 */
export function MessageBox({ children }: Props) {
  return (
    <Box className="flex flex-col justify-center items-center py-5">
      {children}
    </Box>
  );
}
