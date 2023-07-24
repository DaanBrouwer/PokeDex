import { render, screen } from '@testing-library/react';
import { NavLink } from './NavLink';
import { MockRouter } from '../../../../test/MockRouter';

describe('NavLink component', () => {
  it('should render a white link when active', () => {
    render(
      <MockRouter>
        <NavLink to="/">Home</NavLink>
      </MockRouter>
    );
    
    const navLink = screen.getByText('Home');
    expect(navLink.classList.contains('lg:text-white')).toBe(true);
  });

  it('should render a black link when inactive', () => {
    render(
      <MockRouter>
        <NavLink to="/about">About</NavLink>
      </MockRouter>
    );

    const navLink = screen.getByText('About');
    expect(navLink.classList.contains('lg:text-white')).toBe(false);
  });

  it('should render a white link when subroute is active', () => {
    render(
      <MockRouter path='/route/subroute' initialRoute='/route/subroute' >
        <NavLink to="/route">Route</NavLink>
      </MockRouter>
    );
    
    const navLink = screen.getByText('Route');
    expect(navLink.classList.contains('lg:text-white')).toBe(true);
  });
});
