import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

const wrapperStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const maskStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 100000
};

const containerStyle = {
  position: 'relative',
  zIndex: 100001
};

const Modal = ({ children, isOpen = false, close, elementId = 'root' }) => {
  if (isOpen === false) {
    return null;
  }
  return createPortal(
    <div style={wrapperStyle}>
      <div style={maskStyle} onClick={close} />
      <div style={containerStyle}>{children}</div>
    </div>,
    document.getElementById(elementId)
  );
};

const useModal = elementId => {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);

  const ModalWrapper = ({ children }) => (
    <Modal isOpen={isOpen} close={close} elementId={elementId}>
      {children}
    </Modal>
  );

  return [ModalWrapper, open, close];
};

export default useModal;