import { FlashMessageData } from './flash-message-types';
import { ViewChannelView } from '@uiloos/core';
import { useEffect, useRef } from 'react';

type Props = {
  view: ViewChannelView<FlashMessageData, void>;
};

export function FlashMessageProgressBar({ view }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { duration, isPlaying } = view.autoDismiss;
  const type = view.data.type;

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;

      element.style.animation = `progress ${duration}ms ease-out`;
    }
  }, [ref, duration]);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;

      if (isPlaying) {
        element.style.animationPlayState = 'running';
      } else {
        element.style.animationPlayState = 'paused';
      }
    }
  }, [ref, isPlaying]);

  return (
    <div
      ref={ref}
      className={`flash-message-progress flash-message-progress-${type}`}
    ></div>
  );
}
