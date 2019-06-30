import React from 'react';
import ReactDOM from 'react-dom';
import history from '../history';

const Modal = props => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className={props.className}>
      <div onClick={e => e.stopPropagation()} className="modal2">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <div className="action">
          {props.actions}
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
