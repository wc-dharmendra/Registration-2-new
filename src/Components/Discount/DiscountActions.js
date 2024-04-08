import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import Utils from "@/Utils/Utils";
import Svg from "../../../public/Assets/Svg";
import dayjs from "dayjs";
import useCommonStore from "@/Store/useCommonStore";

const DiscountActions = ({
  editModel = () => {},
  discount = {},
  setDiscountFormData = () => {},
  duplicateDiscount = () => {},
  deleteDiscount = () => {},
  prefillSelectedCategories = () => {},
}) => {
  const dropDownRef = useRef(null);
  const openDropRef = useRef(null);
  const [openDropBox, setOpenDropBox] = useState(false);
  const { isLoading } = useCommonStore();

  const handleDrop = () => {
    setOpenDropBox(!openDropBox);
  };
  useEffect(() => {
    Utils?.removeModal(dropDownRef, openDropRef, () => {
      setOpenDropBox(false);
    });
  }, [dropDownRef, openDropRef]);
  return (
    <div className="">
      <div className="relative">
        <Button
          className="flex items-center gap-[2px] text-sm py-1 max-sm:h-[30px]"
          type="button"
          buttonRef={dropDownRef}
          onClick={() => {
            handleDrop();
          }}
        >
          <div className="w-1 h-1 bg-[#838485] rounded-full"></div>
          <div className="w-1 h-1 bg-[#838485] rounded-full"></div>
          <div className="w-1 h-1 bg-[#838485] rounded-full"></div>
        </Button>

        {openDropBox ? (
          <div
            ref={openDropRef}
            className="absolute boxShadowBorder py-2 px-2  right-[-4px] z-10 mt-1 w-[120px] rounded-md bg-white focus:outline-none"
          >
            <ul className="cursor-pointer">
              <Button
                type="button"
                className="w-full text-[#131517] text-sm flex gap-2 justify-start items-center rounded-sm p-1 font-medium stroke-[#131517]  "
                disabled={isLoading}
                onClick={() => {
                  editModel(true);
                  let obj = {
                    ...discount,
                    startDate: dayjs(discount?.starting_at).format(
                      "YYYY-MM-DD"
                    ),
                    endDate: dayjs(discount?.ending_at).format("YYYY-MM-DD"),
                    startTime: dayjs(discount?.starting_at).format("HH:mm"),
                    endTime: dayjs(discount?.ending_at).format("HH:mm"),
                  };
                  setDiscountFormData(obj);
                  prefillSelectedCategories(discount);
                  handleDrop();
                }}
              >
                <div className="fill-[#AFB0B0] stroke-none">{Svg().Edit}</div>
                Edit
              </Button>
              <Button
                type="button"
                className="w-full text-[#131517] text-sm flex gap-2 justify-start items-center rounded-sm p-1 font-medium stroke-[#131517]  "
                disabled={isLoading}
                onClick={() => {
                  duplicateDiscount();
                }}
              >
                <div className="fill-[#AFB0B0] stroke-[#AFB0B0]">
                  {Svg().CopyLink}
                </div>
                Duplicate
              </Button>
              <Button
                type="button"
                className="w-full text-[#131517] text-sm flex gap-2 justify-start items-center rounded-sm p-1 font-medium stroke-[#131517]  "
                disabled={isLoading}
                onClick={() => {
                  deleteDiscount(discount?.id);
                }}
              >
                <div className="fill-[#AFB0B0] stroke-none">{Svg().Delete}</div>
                Delete
              </Button>
            </ul>
            <div className="clipPath absolute top-[-5px] right-[10px] w-[10px] h-[5px] bg-[#FFFFFF]"></div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DiscountActions;
