import { FlashMessageData, FlashMessageType } from './flash-message-types';
import { ViewChannelView } from '@uiloos/core';
import { CSSTransition } from 'react-transition-group';
import { FlashMessageProgressBar } from './FlashMessageProgressBar';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBug, faCheck, faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons';

const ANIMATION_DURATION = 200;

type Props = {
  view: ViewChannelView<FlashMessageData, void>;
};

export function FlashMessage({ view }: Props) {
  const ref = useRef(null);

  // Make sure the CSS and JavaScript are always using
  // the same animation duration, so they cannot go
  // out of sync.
  document.documentElement.style.setProperty(
    '--flash-message-animation-duration',
    `${ANIMATION_DURATION}ms`
  );

  const flashMessage = view.data;

  // Give more important messages a higher CSS z-index,
  // so they slide underneath each other. The expression
  // below inverts the index, for example if the length
  // of the views is 5:
  //
  // 5 - 0 = 5
  // 5 - 1 = 4
  // 5 - 2 = 3
  // 5 - 3 = 2
  // 5 - 4 = 1
  const zIndex = view.viewChannel.views.length - view.index;

  return (
    <CSSTransition
      nodeRef={ref}
      in={view.isPresented}
      timeout={ANIMATION_DURATION}
      classNames="flash-message"
      unmountOnExit
    >
      <div
        ref={ref}
        className={`flash-message flash-message-${flashMessage.type}`}
        style={{ zIndex }}
        onClick={() => view.dismiss()}
        onMouseOver={() => view.pause()}
        onMouseLeave={() => view.play()}
      >
        <div className="flash-message-row">
          <div className="flash-message-content">
            <span className="flash-message-icon">
              <FontAwesomeIcon icon={typeToIcon(flashMessage.type)} size="xs" />
            </span>
            <p>{flashMessage.text}</p>
          </div>
          <span className="flash-message-close">𐄂</span>
        </div>

        <FlashMessageProgressBar view={view} />
      </div>
    </CSSTransition>
  );
}

export function typeToIcon(type: FlashMessageType): IconProp {
  switch (type) {
    case 'info':
      return faInfoCircle;

    case 'warning':
      return faWarning;

    case 'error':
      return faBug;

    case 'success':
      return faCheck;
  }
}

