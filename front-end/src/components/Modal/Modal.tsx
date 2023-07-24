import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, MouseEvent, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  /**
   * An onClose callback called whenever the Modal component
   * decides it needs to close.
   */
  onClose(): void;

  /**
   * The optional title for the modal.
   */
  title?: ReactNode;

  /**
   * The content of the modal itself.
   */
  children: ReactNode;
};

/**
 * The Modal component renders a modal with an optional title.
 *
 * It will render via a React portal into the "modal-root div"
 * element. This means that a <div id="modal-root"> must be present
 * in the `index.html` file.
 */
export function Modal({ children, title, onClose }: Props) {
  const backdropEl = useRef<HTMLDivElement | null>(null);

  function closeViaBackdrop(event: MouseEvent) {
    // Only close if the target is the backdrop
    // element, otherwise it will close when 
    // buttons inside of the modal are pressed.
    if (event.target !== backdropEl.current) {
      return;
    }

    closeViaButton(event);
  }

  function closeViaButton(event: MouseEvent) {
    // Stop propagation otherwise clicking the
    // close icon will call onClose twice.
    event.stopPropagation();

    onClose();
  }

  const modal = (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="flex justify-center p-2 text-center sm:p-0"
          data-testid="modal-backdrop"
          ref={backdropEl}
          onClick={closeViaBackdrop}
        >
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
            <FontAwesomeIcon
              icon={faXmarkCircle}
              data-testid="modal-close"
              size="2x"
              className="float-right p-2 cursor-pointer transform duration-200 hover:scale-110"
              onClick={closeViaButton}
            />
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {title ? (
                <strong className="text-4xl block mb-4">{title}</strong>
              ) : null}

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Access the modal root div.
  const modalRoot = document.getElementById('modal-root') as HTMLDivElement;

  /*
    createPortal maakt een portal aan, hij heeft twee params:

    1. Wat hij moet "portalen", aka wat hij moet renderen.

    2. Het html element waar hij in moet renderen.
  */
  return createPortal(modal, modalRoot);
}
