import Utils from "@/Utils/Utils";
import React, { useEffect, useRef, useState } from "react";
import Svg from "../../../public/Assets/Svg";
import Button from "../Button/Button";
import useCommonStore from "@/Store/useCommonStore";

function SubCategoryAction({
  subcategory = {},
  category = {},
  duplicate = () => { },
  deleteSubCat = () => { },
  openEditModel = () => { },
  openDeleteModel = () => { },
  duplicateSuccessCB = () => { },
}) {
  const { isLoading } = useCommonStore();
  const dropDownRef = useRef(null);
  const openDropRef = useRef(null);
  const [openDropBox, setOpenDropBox] = useState(false);

  const handleDrop = () => {
    setOpenDropBox(!openDropBox);
  };
  useEffect(() => {
    Utils?.removeModal(dropDownRef, openDropRef, () => {
      setOpenDropBox(false);
    });
  }, [dropDownRef, openDropRef]);
  return (
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
          className="boxShadow border p-1 absolute right-0 z-10 mt-3 w-[150px] rounded-md bg-white focus:outline-none"
        >
          <ul className="cursor-pointer">
            <Button
              type="button"
              disabled={isLoading}
              showLoader={false}
              className={`w-full text-[#131517] text-sm flex gap-2 items-center rounded-sm hover:bg-[#DFE0E1] p-1 font-medium stroke-[#131517] `}
              onClick={() => openEditModel(category, subcategory)}
            >
              {" "}
              <div className="fill-[#AFB0B0] stroke-none">
                {Svg().Edit}
              </div>{" "}
              Edit{" "}
            </Button>
            <Button
              type="button"
              disabled={isLoading}
              showLoader={false}
              className={`w-full text-[#131517] text-sm flex gap-2 items-center rounded-sm hover:bg-[#DFE0E1] p-1 font-medium stroke-[#131517] `}
              onClick={() =>
                duplicate(category, subcategory, handleDrop, duplicateSuccessCB)
              }
            >
              {" "}
              <div className="fill-[#AFB0B0] stroke-[#AFB0B0]">
                {Svg().CopyLink}
              </div>{" "}
              Duplicate{" "}
            </Button>
            <Button
              type="button"
              disabled={isLoading}
              showLoader={false}
              className={`w-full text-[#131517] text-sm flex gap-2 items-center rounded-sm hover:bg-[#DFE0E1] p-1 font-medium stroke-[#131517] `}
              onClick={() => {
                deleteSubCat(category?.id, subcategory?.id);
              }}
            >
              {" "}
              {Svg().Delete} Delete{" "}
            </Button>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default SubCategoryAction;
