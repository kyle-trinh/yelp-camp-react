import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className={props.className}>
      <div onClick={e => e.stopPropagation()} className="modal-content">
        <h1 className="modal-title">{props.title}</h1>
        <p className="modal-detail">{props.content}</p>
        <div className="action">{props.actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
