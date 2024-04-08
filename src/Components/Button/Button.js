const Button = ({
    buttonRef = null,
    type = "submit",
    btnText = "",
    children,
    className = "",
    disabled = false,
    showLoader = true,
    onClick = () => { },
    id = ''
}) => {
    const onSubmit = (e) => {
        if (type !== "submit") {
            e.preventDefault();
            onClick(e);
        }
    };

    return (
        <button
            id={id}
            ref={buttonRef}
            type={type}
            disabled={disabled}
            className={`${className} ${disabled && !showLoader ? '' : disabled ? 'opacity-70 flex gap-2 items-center justify-center' : ''}`}
            onClick={onSubmit}
        >
            {btnText}
            {children || null}
            {disabled && showLoader ? <div className="inline-block w-4 h-4 rounded-full border-2 border-[rgba(255,255,255,0.5)] border-t-[#fff] animate-spin"></div> : null}
        </button>
    );
};

export default Button;
