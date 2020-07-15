import React, { useRef, useLayoutEffect } from 'react';

import './styles.scss';
import { createPortal } from 'react-dom';

let modalRoot = document.getElementById('modal-root');
if (!modalRoot) {
  modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
}

// don't use this for your modals.
// you need to think about accessibility and styling.
// Look into: https://ui.reach.tech/dialog
const Modal: React.FC = ({ children }) => {
  const el = useRef(document.createElement('div'));
  useLayoutEffect(() => {
    const currentEl = el.current;
    modalRoot?.appendChild(currentEl);
    return () => {
      modalRoot?.removeChild(currentEl);
    };
  });
  return createPortal(children, el.current);
};

export default Modal;
