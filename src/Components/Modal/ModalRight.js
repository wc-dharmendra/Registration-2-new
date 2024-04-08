import React from 'react';
import Svg from '../../../public/Assets/Svg';

const ModalRight = ({ isOpen = false, onClose = () => { }, children = null, title = '', status='' }) => {

    const closeModal = () => {
        onClose();
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="overlay" onClick={closeModal}></div>
            <div className="modal-content">
                <div className='modal-header-right border-b-[1px] p-4 flex gap-3 items-center'>
                    <div id="close-btn" className="close-btn" onClick={closeModal}>
                        {Svg().PopupArrow}
                    </div>
                    {title ? <h2 className='text-base font-semibold text-[#131517]'>{title}</h2> : ''}
                    {status ? <h2 className='text-base font-semibold text-[#131517]'>{status}</h2> : ''}
                </div>
                <div className="modal-body p-4 pr-0">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalRight;