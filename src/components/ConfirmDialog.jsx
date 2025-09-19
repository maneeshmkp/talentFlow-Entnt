import React from 'react';
import Modal from './Modal.jsx';

export default function ConfirmDialog({ open, title, message, confirmText='Confirm', cancelText='Cancel', onConfirm, onCancel }) {
  return (
    <Modal open={open} onClose={onCancel} title={title}
      footer={<>
        <button className="btn secondary" onClick={onCancel}>{cancelText}</button>
        <button className="btn" onClick={onConfirm}>{confirmText}</button>
      </>}>
      <p>{message}</p>
    </Modal>
  );
}
