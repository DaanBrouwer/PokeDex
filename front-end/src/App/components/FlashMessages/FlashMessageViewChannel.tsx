import { useViewChannel } from '@uiloos/react';
import { flashMessageChannel } from './flash-message-service';
import { FlashMessage } from './FlashMessage';
import { TransitionGroup } from 'react-transition-group';

import './flash-messages.css';

export function FlashMessageViewChannel() {
  // Via useViewChannel we make sure this component re-renders
  // whenever the ViewChannel changes.
  const flashMessages = useViewChannel(flashMessageChannel);

  return (
    <div className="flash-messages max-w-lg z-50">
      <div
        className="flash-messages-container"
        role="status"
        aria-live="polite"
      >
        <TransitionGroup>
          {flashMessages.views.map((view) => (
            <FlashMessage key={view.data.id} view={view} />
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
}
