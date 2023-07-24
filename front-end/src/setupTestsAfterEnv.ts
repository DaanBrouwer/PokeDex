// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { flashMessageChannel } from './App/components/FlashMessages/flash-message-service';

// Reset all mocks.
afterEach(() => jest.resetAllMocks());
afterEach(() => jest.restoreAllMocks());

// Use real timers.
afterEach(() => {
  jest.useRealTimers();
});

// Clear all flash messages
beforeEach(() => {
  flashMessageChannel.dismissAll();
});

// Create and or clear the modal-root for the <Modal> component.
beforeEach(() => {
  const modalRoot = document.getElementById('modal-root');

  if (modalRoot) {
    modalRoot.innerHTML = '';
  } else {
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(portalRoot);
  }
});

// Mock ResizeObserver as it is not available in jest-dom
class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

window.ResizeObserver = ResizeObserver;

export {};
