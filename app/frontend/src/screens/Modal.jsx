import React from 'react';
import './Modal.css'
const Modal = ({ show, onClose, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
               
                {children}
                <button onClick={onClose} style={{ padding: '12px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Close</button>

            </section>
            
        </div>
    );
};

export default Modal;
