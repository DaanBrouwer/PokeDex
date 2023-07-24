import { RestHandler, RestRequest } from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';
import { ReactNode, useEffect, useState } from 'react';

type Props = {
  /**
   * The back-end request that will be mocked
   */
  mocks: RestHandler[];

  /**
   * The tested component, or another mock wrapper
   */
  children: ReactNode;
};

/**
 * The MockBackend component can be used to mock the back-end server.
 * This way the tests do not actually send request to the back-end
 * and we can respond with the same data every time.
 */
export function MockBackend({ mocks, children }: Props) {
  const [server] = useState<SetupServerApi>(() => {
    return mockBackend(mocks);
  });

  useEffect(() => {
    return () => {
      server.close();
    };
  }, [server]);

  return <>{children}</>;
}

export function mockBackend(mocks: RestHandler[]): SetupServerApi {
  const server = setupServer(...mocks);
  server.listen();

  return server;
}

/**
 * Helper function which takes a request from msw
 * and extracts the query params, it will then 
 * call the spy with those query params.
 * 
 * The spy is optional when no spy is provided 
 * nothing really happens. This is useful for
 * test where the query params do not really
 * matter all that much.
 */
export function spyOnQueryParams(
  req: RestRequest,
  spy?: jest.Mock
): void {
  if (!spy) {
    return;
  }

  const entries = req.url.searchParams.entries();

  const object = Object.fromEntries(entries);

  spy(object);
}
