import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  errorFlashMessage,
  infoFlashMessage,
  successFlashMessage,
  warningFlashMessage
} from './flash-message-service';
import { FlashMessageViewChannel } from './FlashMessageViewChannel';

describe('FlashMessageViewChannel component', () => {
  it('should render flash messages', () => {
    infoFlashMessage('info');
    successFlashMessage('success');
    warningFlashMessage('warning');
    errorFlashMessage('error');

    render(<FlashMessageViewChannel />);

    screen.getByText('info');
    screen.getByText('success');
    screen.getByText('warning');
    screen.getByText('error');
  });

  it('should when the message duration passes remove the message automatically', async () => {
    expect.hasAssertions();

    jest.useFakeTimers();

    successFlashMessage('success');

    render(<FlashMessageViewChannel />);

    screen.getByText('success');

    await waitFor(
      () => {
        expect(screen.queryByText('success')).not.toBeInTheDocument();
      },
      { timeout: 2500 } // duration + remove animation.
    );
  });

  it('should the user clicks on a flash message remove it', async () => {
    expect.hasAssertions();

    successFlashMessage('success');

    render(<FlashMessageViewChannel />);

    const flash = screen.getByText('success');

    await userEvent.click(flash);

    await waitFor(
      () => {
        expect(screen.queryByText('success')).not.toBeInTheDocument();
      },
      { timeout: 500 } // The time it takes to disappear
    );
  });

  it('should the user hovers over a flash message stop the progress bar', async () => {
    expect.hasAssertions();

    successFlashMessage('success');

    render(<FlashMessageViewChannel />);

    const flash = screen.getByText('success');

    // Pause the removal
    await userEvent.hover(flash);

    // Should do nothing
    await waitFor(
      () => {
        expect(screen.queryByText('success')).toBeInTheDocument();
      },
      { timeout: 2500 }
    );

    // Unpause it
    await userEvent.unhover(flash);

    await waitFor(
      () => {
        expect(screen.queryByText('success')).not.toBeInTheDocument();
      },
      { timeout: 2500 }
    );
  });
});
