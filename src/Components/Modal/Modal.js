import { useCallback, useEffect, useState } from "react";
import Button from "@/Components/Button/Button";
import Svg from "../../../public/Assets/Svg";
import Image from "next/image";

const Modal = ({
    subchildren = null,
    children = null,
    icon = '',
    title = '',
    btnText = 'Submit',
    open = false,
    onClose = () => { },
    showBtn = true,
    btnType = 'submit',
    ModalWrapperCls = "ModalBoxContainer sm:max-w-[345px]",
    headerTitle = "",
    onBtnClick = () => { },
    iconCls = '',
    bodyWrapperCls = 'max-h-[70vh] px-6 pb-6',
    headerCls = 'px-6 py-4',
    headerMarginCls = 'mb-2',
    isBtnDisabled = false,
    headerImg = '',
    btnClass='w-full'
}) => {

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = useCallback(() => {
        setIsOpen(false);

        onClose();
    }, [onClose]);

    const onSubmit = (e) => {
        e.preventDefault();
        onBtnClick(e, () => {
            onClose();
        });
    };

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    return (isOpen ?
        <div className="fixed w-[100%] h-[100%] z-[1070] top-0  bottom-0 left-0">
            <div className="fixed left-0 top-0 bg-black opacity-50 w-[100%] h-[100%] z-[1300] m-auto"></div>
            <div className={`${ModalWrapperCls} `}>
                <header className={`flex items-center justify-between ${headerCls}`}>
                    {icon ? <div className={`mt-[10px] ${iconCls}`}>{Svg()?.[icon]}</div> : null}
                    {/* {headerImg ? <Image width={100} height={30} src={headerImg} className="h-7" style={{ objectFit: 'contain', objectPosition: 'left' }} alt={headerImg} /> : null} */}
                    {headerImg ? <img width={100} height={30} src={headerImg} className="h-7" style={{ objectFit: 'contain', objectPosition: 'left' }} alt={headerImg} /> : null}
                    {headerTitle ? <h2 className={`font-semibold text-[#131517] text-[18px] sm:text-[18px] md:text-[18px] lg:text-[18px] ${headerMarginCls}`}>{headerTitle}</h2> : ''}
                    <Button type='button' onClick={closeModal} className="absolute top-3 right-3 z-10 outline-none">
                        {Svg().PopupCross}
                    </Button>
                </header>
                <div className={`overflow-hidden rounded-br-lg`}>
                <div className={`overflow-auto ${bodyWrapperCls}`}>
                    <article>
                        {title ? <h2 className="font-semibold text-[#311517] text-[18px] mb-2 sm:text-[20px] md:text-[20px] lg:text-[20px]">{title}</h2> : ''}
                        <form onSubmit={onSubmit}>
                            {children}
                            {showBtn ?
                                <Button disabled={isBtnDisabled} type={btnType} onClick={onSubmit} className={`bg-[#333537] text-[#FFFFFF] py-2 px-2 text-[14px] sm:text-[16px] md:text-[16px] lg:text-[16px] rounded-lg mt-5 ${btnClass}`}>
                                    {btnText}
                                </Button>
                                : null}
                        </form>
                        {subchildren}
                    </article>
                </div>
                </div>
            </div>
        </div>
        : null)
};

export default Modal;

