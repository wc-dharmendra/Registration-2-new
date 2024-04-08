import React, { useRef, useState, useEffect, useCallback } from "react";
import Input from "../InputForm/InputForm";
import Button from "../Button/Button";
import Svg from "../../../public/Assets/Svg";
import Utils from "@/Utils/Utils";
import ShowToast from "@/Toaster/Toaster";
import useCommonStore from "@/Store/useCommonStore";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import dayjs from "dayjs";
const EditDiscount = ({
  formData,
  setFormData,
  saveDiscountData,
  catData,
  handleCatSelection = () => {},
  setIsModalOpen = () => {},
  getAllDiscounts,
}) => {
  const dropPercentRef = useRef(null);
  const openPercentRef = useRef(null);
  const [openPercentBox, setOpenPercentBox] = useState(false);
  const dropDiscountRef = useRef(null);
  const openDiscountRef = useRef(null);
  const [openDiscountBox, setOpenDiscountBox] = useState(false);
  const { isLoading } = useCommonStore();
  const handleDrop = () => {
    setOpenPercentBox(!openPercentBox);
  };
  const handleDiscount = () => {
    setOpenDiscountBox(!openDiscountBox);
  };
  const handleInputChange = useCallback(
    (event) => {
      let { name, value } = event.target;
      if ((name === "amount" || name === "ticket_qty") && value && isNaN(value))
        return;
      if (name === "ticket_qty") {
        value = value.replace(/\D/g, "");
      }
      setFormData({
        ...formData,
        [name]: value,
      });
    },
    [formData]
  );

  const handleDiscountType = (type) => {
    let val = "";
    if (type.includes("%")) {
      val = "PER";
    } else {
      val = "FIX";
    }
    setFormData({
      ...formData,
      coupon_type: val,
    });
    setOpenPercentBox(false);
  };

  const handleDiscountUsage = (val) => {
    setFormData({
      ...formData,
      discount_usage: val,
    });
    handleDiscount();
  };

  const isDataValid = () => {
    let isValid = true;
    let errorMessages = {
      code: "Discount Code field is required.",
      amount: "Discount Amount field is required.",
      startDate: "Start Date Time field is required.",
      startTime: "Start Date Time field is required.",
      endDate: "End Date Time field is required.",
      endTime: "End Date Time field is required.",
      ticket_qty: "Discount Quantity field is required.",
      coupon_type: "Discount Type field is required.",
      discount_usage: "Discount Usage field is required",
      description: "",
    };
    for (let key in errorMessages) {
      if (!formData[key] && key !== "description") {
        isValid = false;
        ShowToast({ message: `${errorMessages[key]}`, variant: "error" });
        break;
      } else {
        if (key === "code" || (key === "description" && formData[key])) {
          let len = formData[key]?.length;
          let minLen = key === "code" ? 2 : 20;
          if (len < minLen) {
            isValid = false;
            ShowToast({
              message: `Discount ${key} should be minimum ${minLen} characters long`,
              variant: "error",
            });
            break;
          }
        }
      }
    }
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isDataValid()) {
      let selectedCategories = [];
      for (let i = 0; i < catData?.length; i++) {
        for (let j = 0; j < catData[i]?.subArr?.length; j++) {
          if (catData[i]?.subArr[j]?.isChecked) {
            selectedCategories.push(catData[i]?.subArr[j]?.id);
          }
        }
      }

      let body = {
        code: formData?.code,
        description: formData?.description,
        coupon_type: formData?.coupon_type,
        amount: formData?.amount,
        starting_at: formData?.startDate + " " + formData?.startTime + ":00",
        ending_at: formData?.endDate + " " + formData?.endTime + ":00",
        discount_usage: formData?.discount_usage,
        ticket_qty: formData?.ticket_qty,
        sub_category_select: selectedCategories,
      };
      if (formData?.id) {
        body["id"] = formData?.id;
      }
      saveDiscountData(body, () => {
        setIsModalOpen(false);
        getAllDiscounts();
      });
    }
  };

  useEffect(() => {
    Utils?.removeModal(dropPercentRef, openPercentRef, () => {
      setOpenPercentBox(false);
    });
  }, [dropPercentRef, openPercentRef]);

  useEffect(() => {
    Utils?.removeModal(dropDiscountRef, openDiscountRef, () => {
      setOpenDiscountBox(false);
    });
  }, [dropDiscountRef, openDiscountRef]);

  return (
    <div className="popup-content-wrapper overflow-auto p-1 pr-5">
      <form onSubmit={handleSubmit}>
        <div className="relative mt-1 flex flex-col mb-3">
          <label className="text-[#595C5C] text-[16px] mb-1 font-medium">
            Discount Code
          </label>
          <Input
            type="text"
            name="code"
            inputCls="form-control text-[16px] font-medium"
            placeholder="Enter Code"
            val={formData?.code}
            maxLength={40}
            onChange={handleInputChange}
          />
        </div>

        <div className="relative mt-1 flex flex-col mb-3">
          <label className="text-[#595C5C] text-[16px] mb-1 font-medium">
            Discount Description
          </label>
          <Input
            type="text"
            name="description"
            inputCls="form-control text-[16px] font-medium"
            placeholder="Type here"
            maxLength={160}
            val={formData?.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="relative mt-1 flex flex-col mb-3">
          <label className="text-[#595C5C] text-[16px] mb-1 font-medium">
            Discount Type
          </label>
          <div className="relative mb-4">
            <Button
              type={"button"}
              className="dropdownListCommon"
              buttonRef={dropPercentRef}
              onClick={handleDrop}
            >
              {formData?.coupon_type === ""
                ? "Select Discount Type"
                : formData?.coupon_type === "PER"
                ? "Percent"
                : "Flat"}

              {Svg().SingleSelect}
            </Button>

            {openPercentBox && (
              <div
                ref={openPercentRef}
                className="absolute w-full top-[100%] z-10"
              >
                <ul className="Fontdropdown" style={{ padding: "5px" }}>
                  {["Flat", "Percentage (%)"].map((item, index) => (
                    <li
                      key={index}
                      className="hover:bg-[#f0f0f0] rounded-md"
                      style={{ padding: "4px 8px" }}
                      onClick={() => handleDiscountType(item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Input
            type="text"
            name="amount"
            inputCls="form-control text-[16px] font-medium"
            placeholder="Enter discount%"
            val={formData?.amount}
            onChange={handleInputChange}
          />
        </div>

        <div className="relative mt-1 flex flex-col mb-3">
          <label className="text-[#595C5C] text-[16px] mb-1 font-medium">
            Discount can be availed from
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative block w-full">
              <Input
                type="date"
                name="startDate"
                inputCls="input outline-none bg-transparent top-0 left-0 w-full h-full z-10 absolute opacity-0"
                placeholder="Discount From Date"
                val={formData?.startDate}
                onChange={handleInputChange}
              />
              <div className="text-[#131517] font-medium items-center gap-3 flex justify-between border border-[#EBECED] rounded-lg px-2 h-[40px]">
                {formData?.startDate ? (
                  dayjs(formData?.startDate)?.format("DD/MM/YYYY")
                ) : (
                  <span className="opacity-80">Select Date</span>
                )}{" "}
                {Svg()?.CalendarIcon}
              </div>
            </div>
            <div className="w-full">
              <Input
                type="time"
                name="startTime"
                inputCls="form-control text-[16px] font-medium showClockIcon"
                placeholder="Discount From Time"
                val={formData?.startTime}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <label className="text-[#595C5C] text-[16px] mb-1 font-medium">
            Discount can be availed till
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative block w-full">
              <Input
                type="date"
                name="endDate"
                inputCls="input outline-none bg-transparent top-0 left-0 w-full h-full z-10 absolute opacity-0"
                placeholder="Discount Till Date"
                val={formData?.endDate}
                onChange={handleInputChange}
              />
              <div className="text-[#131517] font-medium items-center gap-3 flex justify-between border border-[#EBECED] rounded-lg px-2 h-[40px]">
                {formData?.endDate ? (
                  dayjs(formData?.endDate)?.format("DD/MM/YYYY")
                ) : (
                  <span className="opacity-80">Select Date</span>
                )}{" "}
                {Svg()?.CalendarIcon}
              </div>
            </div>
            <div className="w-full">
              <Input
                type="time"
                name="endTime"
                inputCls="form-control text-[16px] font-medium showClockIcon"
                placeholder="Discount Till Time"
                val={formData?.endTime}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="relative mt-1 flex flex-col mb-3">
          <label className="text-[#595C5C] text-[16px] mb-1 font-medium">
            Discount Usage
          </label>
          <div className="relative  mb-4">
            <Button
              type={"button"}
              className="dropdownListCommon"
              buttonRef={dropDiscountRef}
              onClick={handleDiscount}
            >
              {formData?.discount_usage === ""
                ? "Select Discount Usage"
                : formData?.discount_usage === "TICKETS"
                ? "Number of tickets"
                : "Number of carts"}

              {Svg().SingleSelect}
            </Button>

            {openDiscountBox && (
              <div
                ref={openDiscountRef}
                className="absolute w-full top-[100%] z-10"
              >
                <ul className="Fontdropdown" style={{ padding: "5px" }}>
                  {[
                    { label: "Number of tickets", val: "TICKETS" },
                    { label: "Number of carts", val: "CARTS" },
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="hover:bg-[#f0f0f0] rounded-md"
                      style={{ padding: "4px 8px" }}
                      onClick={() => handleDiscountUsage(item.val)}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Input
            type="text"
            name="ticket_qty"
            inputCls="form-control text-[16px] font-medium"
            placeholder="Enter discount quantity"
            val={formData?.ticket_qty}
            onChange={handleInputChange}
          />
        </div>

        <CustomDropdown
          labelText="Select Category"
          dropDownText="Choose Category"
          dropDownArr={catData}
          handleSelection={handleCatSelection}
        />

        <div className="popup-footer bg-[#FFFFFF] flex gap-5 p-4 items-center border-t-[1px] absolute bottom-0 left-0 w-full">
          <Button
            className="flex items-center gap-2 btn-dark"
            type="submit"
            disabled={isLoading}
          >
            {Svg()?.CheckCircleIcon}{" "}
            {formData?.id ? "Update Discount" : "Create Discount"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditDiscount;
