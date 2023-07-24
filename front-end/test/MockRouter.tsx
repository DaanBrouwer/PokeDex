import { ReactNode, useLayoutEffect, useState } from 'react';
import { createMemoryHistory } from 'history';
import { Router, Route, Routes } from 'react-router-dom';

type Props = {
  /**
   * Optionally: the route the mock router should start on
   *
   * @default '/'
   */
  initialRoute?: string;

  /**
   * Optionally: the path that the rendered Route should have. Should
   * match the normal route the component has in the real application.
   *
   * @default '/'
   */
  path?: string;

  /**
   * Optionally: a spy which is called whenever a navigation occurs.
   */
  navigationSpy?: jest.Mock;

  /**
   * The tested component, or another mock wrapper
   */
  children: ReactNode;

  /**
   * Whether or not the MockRouter will render a <Routes> component.
   * This is needed when testing components which render routes
   * themselves.
   *
   * @default true
   */
  renderRoutes?: boolean;
};

/**
 * The MockRouter component can be used to mock the react-router.
 * This way the entire application does not need to be loaded
 * each time the presence of the router is needed in the tests.
 */
export function MockRouter(props: Props) {
  const {
    children,
    initialRoute = '/',
    path = '/',
    navigationSpy = jest.fn(),
    renderRoutes = true
  } = props;

  const history = createMemoryHistory();

  history.push(initialRoute);

  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => {
    history.listen((update) => {
      setState(update);

      navigationSpy({
        action: update.action,
        url: update.location.pathname + update.location.search
      });
    });
  }, [history]);

  return (
    <Router
      navigator={history}
      location={state.location}
      navigationType={state.action}
    >
      {renderRoutes ? (
        <Routes>
          <Route path={path} element={children} />
          <Route
            path="*"
            element="MockRouter: no route found, this is a catch all"
          />
        </Routes>
      ) : (
        children
      )}
    </Router>
  );
}
