import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MobileMenu } from './MobileMenu';

describe('MobileMenu component', () => {
  it('should display when hamburger button is clicked, and disappear when user clicks navigation item', async () => {
    expect.assertions(4);

    render(
      <MobileMenu>
        <div>Some link</div>
      </MobileMenu>
    );

    // Should not be displayed at first
    let aLink = screen.queryByText('Some link');
    expect(aLink).toBeNull();

    // Open the menu
    await userEvent.click(screen.getByRole('button'));

    expect(document.body.style.overflow).toBe('hidden');

    // Should be there now that the menu is opened, click it
    await userEvent.click(screen.getByText('Some link'));

    // It should now have been closed
    aLink = screen.queryByText('Some link');
    expect(aLink).toBeNull();

    expect(document.body.style.overflow).toBe('visible');
  });
});
