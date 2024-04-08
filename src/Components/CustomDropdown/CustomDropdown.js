import React, { Fragment, useRef, useState } from "react";
import Button from "../Button/Button";
import Svg from "../../../public/Assets/Svg";
import Input from "../InputForm/InputForm";

const CustomDropdown = ({
  labelText = "",
  dropDownText = "Select",
  dropDownArr = [],
  handleSelection = () => {},
}) => {
  const dropDownRef = useRef(null);
  const openDropDownRef = useRef(null);
  const [openDropDownBox, setOpenDropDownBox] = useState(false);

  const handleDropSubcategories = () => {
    setOpenDropDownBox(!openDropDownBox);
  };

  return (
    <div className="mb-2">
      <label className="text-[#595C5C] text-sm font-semibold mb-2 block">
        {labelText}
      </label>
      <div className="relative ">
        <Button
          type={"button"}
          className="dropdownListCommon"
          buttonRef={dropDownRef}
          onClick={handleDropSubcategories}
        >
          {dropDownText}
          <span className={`${openDropDownBox ? "rotate-180" : ""}`}>
            {Svg().SingleSelect}
          </span>
        </Button>

        {openDropDownBox && (
          <div
            ref={openDropDownRef}
            className="absolute w-full top-[100%] z-10"
          >
            <ul className="ChooseCatDropdown bg-[#fff] max-h-[150px] overflow-auto" style={{ padding: "5px" }}>
              {dropDownArr?.length > 0 &&
                dropDownArr?.map((item, index) => (
                  <Fragment key={item?.id}>
                    <div className="flex justify-between">
                      <li
                        className="rounded-md font-medium text-[#131517]"
                        style={{ padding: "4px 8px" }}
                      >
                        {item?.title}
                      </li>
                      <div className="font-medium mb-2 mt-2 mr-2 text-[#131517]">
                        <Input
                          wrapperCls="flex"
                          type={"checkbox"}
                          inputCls="w-4 h-4 accent-black cursor-pointer ml-2"
                          onChange={(e) => {
                            handleSelection(item?.id, e?.target?.checked);
                          }}
                          checked={dropDownArr[index]?.isChecked}
                        />
                      </div>
                    </div>
                   
                    {item?.subArr?.length &&
                      item?.subArr?.map((obj, ind) => (
                        <Fragment key={obj?.id}>
                          <div className="flex justify-between">
                            <li
                              className="rounded-md font-medium text-sm text-[#595C5C]"
                              style={{ padding: "4px 8px" }}
                            >
                              {obj?.title}
                            </li>
                            <div className="font-medium mb-2 mt-2 mr-2 text-sm text-[#595C5C]">
                              <Input
                                wrapperCls="flex"
                                type={"checkbox"}
                                inputCls="w-4 h-4 accent-black cursor-pointer ml-2"
                                onChange={(e) => {
                                  handleSelection(
                                    obj?.id,
                                    e?.target?.checked,
                                    item?.id
                                  );
                                }}
                                checked={item?.subArr[ind]?.isChecked}
                              />
                            </div>
                          </div>
                        </Fragment>
                      ))}
                  </Fragment>
                ))}
            </ul>
          </div>
        )}
      </div>

      <div className="w-full flex items-center">
        <div className="tags-input">
          {dropDownArr?.length > 0 &&
            dropDownArr?.map((item) => (
              <Fragment key={item?.id}>
                {item?.isChecked ? (
                  <span className="tag">
                    {item?.title}
                    <Button
                      type="button"
                      onClick={() => {
                        handleSelection(item?.id, false);
                      }}
                    >
                      {Svg().CloseIcon}
                    </Button>
                  </span>
                ) : null}

                {item?.subArr?.length > 0 &&
                  item?.subArr?.map((obj) =>
                    obj?.isChecked ? (
                      <span key={obj?.id} className="tag">
                        {obj?.title}
                        <Button
                          type="button"
                          onClick={() => {
                            handleSelection(obj?.id, false, item?.id);
                          }}
                        >
                          {Svg().CloseIcon}
                        </Button>
                      </span>
                    ) : null
                  )}
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CustomDropdown;
