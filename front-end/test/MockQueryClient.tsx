import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  /**
   * Optionally: a QueryClient instance. Use this prop to pass
   * in a spied upon queryClient, which you can assert later. 
   */
  queryClient?: QueryClient;

  /**
   * The tested component, or another mock wrapper
   */
  children: ReactNode;
};

/**
 * The MockQueryClient component can be used to provide a 
 * QueryClientProvider when react-query is used in a test. 
 */
export function MockQueryClient(props: Props) {
  const { children, queryClient = new QueryClient() } = props;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
