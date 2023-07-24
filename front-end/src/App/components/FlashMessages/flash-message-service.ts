import { ViewChannel } from '@uiloos/core';
import { FlashMessageData } from './flash-message-types';

export const flashMessageChannel = new ViewChannel<FlashMessageData>();

export function infoFlashMessage(text: string): void {
  flashMessageChannel.present({
    data: {
      id: Math.random(),
      text,
      type: 'info'
    },
    priority: 4,
    autoDismiss: {
      duration: 2000,
      result: undefined
    }
  });
}

export function warningFlashMessage(text: string): void {
  flashMessageChannel.present({
    data: {
      id: Math.random(),
      text,
      type: 'warning'
    },
    priority: 1,
    autoDismiss: {
      duration: 3000,
      result: undefined
    }
  });
}

export function errorFlashMessage(text: string): void {
  flashMessageChannel.present({
    data: {
      id: Math.random(),
      text,
      type: 'error'
    },
    priority: 0,
    autoDismiss: {
      duration: 5000,
      result: undefined
    }
  });
}

export function successFlashMessage(text: string): void {
  flashMessageChannel.present({
    data: {
      id: Math.random(),
      text,
      type: 'success'
    },
    priority: 2,
    autoDismiss: {
      duration: 2000,
      result: undefined
    }
  });
}
