import React from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

const CropImgPopup = ({
  onClose = null,
  openModal = false,
  cropBtnText = "Crop & Save",
  changeBtnText = "Change",
  children,
  onClickCrop,
  onClickChange,
  disabled,
}) => {
  return (
    <Modal
      onClose={() => {
        if (onClose) onClose();
      }}
      open={openModal}
      showBtn={false}
    >
      <div className="CropImgInner">
        {children}
      </div>
      <div>
        <div>
          <div className="d-flex alignCenter justifyContent flex-column">
            <div className="PopupAction flex justify-center gap-2">
              <Button
                type="button"
                className="btn-dark flex gap-2 items-center"
                onClick={onClickCrop}
                disabled={disabled}
              >
                {cropBtnText}
              </Button>

              <Button
                type="button"
                className="btn-light text-base"
                onClick={onClickChange}
                disabled={disabled}
                showLoader={false}
              >
                {changeBtnText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default CropImgPopup;
