import React, { useCallback, useEffect, useRef, useState } from "react";
import Utils from "@/Utils/Utils";
import Svg from "../../../public/Assets/Svg";
import Button from "../Button/Button";
import ToggleButton from "../ToggleButton/ToggleButton";
import Input from "../InputForm/InputForm";
import CalendarInput from "../Calender/Calender";
import Modal from "../Modal/Modal";
import useCategoryMatrix from "@/CustomHook/useCategoryMatrix";
import useCategoryMatrixStore from "@/Store/useCategoryMatrixStore";
import useEventStore from "@/Store/useEventStore";
import { PostApiCall } from "@/Api/ApiCall";
import EndPoint from "@/Api/EndPoint";
import useCommonStore from "@/Store/useCommonStore";
import dayjs from "dayjs";
import ShowToast from "@/Toaster/Toaster";
import ToolTip from "../ToolTip/ToolTip";

function CategorySettings() {
  const dropDownQuestionRef = useRef(null);
  const openDropQuestionRef = useRef(null);
  const dropDownCurrencyRef = useRef(null);
  const openDropCurrencyRef = useRef(null);
  const [openDropQuestion, setOpenDropQuestion] = useState(false);
  const [openDropCurrency, setOpenDropCurrency] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [includedArr, setIncludedArr] = useState(["Title"]);

  const min = "2023-01-01";

  const { categoryData, setCategoryData } = useCategoryMatrix();
  const { selectedCategory, setSelectedCategory } = useCategoryMatrixStore();
  const { event } = useEventStore();
  const { isLoading, setIsLoading } = useCommonStore();

  const [SettingVal, setSettingVal] = useState({
    category_type: "Select Category",
    currency_type: "Select Currency",
    price: "0.00",
    require_approval: false,
    capacity: 0,
    min_qty: 0,
    max_qty: 0,
    over_capacity: false,
    show_counter: false,
    global_capacity: 0,
    start_date: "",
    end_date: "",
    remove_limit: 0,
  });
  const [makeItInfinite, setMakeItInfinite] = useState(0);

  const [min_qty_timeoutID, setMin_qty_timeoutID] = useState(null);
  const [max_qty_timeoutID, setMax_qty_timeoutID] = useState(null);
  const [price_timeoutID, setPrice_timeoutID] = useState(null);
  const [min_qty_loader, setMin_qty_loader] = useState(false);
  const [max_qty_loader, setMax_qty_loader] = useState(false);
  const [price_loader, setPrice_loader] = useState(false);

  const handleDropQuestion = () => {
    setOpenDropQuestion(!openDropQuestion);
  };
  const onModelClose = () => {
    setIsOpen(false);
  };

  const handleDropCurrency = () => {
    setOpenDropCurrency(!openDropCurrency);
  };

  const saveSettings = (data, errcb = null, successCB = null) => {
    let fields = {};
    data.map((obj) => {
      fields[obj.fieldname] = obj.value;
    });
    let body = {
      id: selectedCategory.id,
      ...fields,
    };
    if (event?.id) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.saveCategorySettings(event?.id),
        body,
        (cbData) => {
          if (cbData?.success) {
            if (fields["remove_limit"] === 1) {
              let obj = { ...selectedCategory };
              obj["capacity"] = -1;
              setSelectedCategory(obj);
            } else {
              let obj = { ...selectedCategory, ...fields };
              if (obj?.capacity_unlimited === 1) {
                obj["capacity"] = -1;
              }
              setSelectedCategory(obj);
            }
            setIsLoading(false);
            resetLoader();
            if (successCB) successCB();
          } else {
            if (errcb) errcb();
            resetSetting(data);
            setIsLoading(false);
            resetLoader();
          }
        },
        (errData) => {
          if (errcb) errcb();
          resetSetting(data);
          setIsLoading(false);
          resetLoader();
        }
      );
    }
  };

  const resetSetting = (data) => {
    let fields = {};
    data.map((obj) => {
      fields[obj.fieldname] = selectedCategory[obj.fieldname];
    });
    if (!("capacity" in fields || "remove_limit" in fields)) {
      setSettingVal((curr) => ({
        ...curr,
        ...fields,
      }));
    }

    // setSettingVal((curr) => ({
    //   ...curr,
    //   min_qty: selectedCategory["min_qty"],
    //   max_qty: selectedCategory["max_qty"],
    //   price: selectedCategory["price"],
    //   currency_type: selectedCategory["currency_type"],
    //   category_type: selectedCategory["category_type"],
    //   require_approval: selectedCategory["require_approval"],
    //   start_date: selectedCategory["start_date"],
    //   end_date: selectedCategory["end_date"],
    // }));
  };

  const resetLoader = () => {
    setMin_qty_loader(false);
    setMax_qty_loader(false);
    setPrice_loader(false);
  };

  const handleItemClick = (item, fieldname) => {
    let arr = [];
    arr.push({ fieldname: fieldname, value: item });
    saveSettings(arr);
    setSettingVal((prev) => ({ ...prev, [fieldname]: item }));
    if (fieldname === "category_type") {
      setOpenDropQuestion(false);
    } else if (fieldname === "currency_type") {
      setOpenDropCurrency(false);
    }
  };

  const handleChange = useCallback(
    (e) => {
      if (
        e.target.name == "start_date" ||
        e.target.name === "end_date" ||
        (e.target.name === "capacity" && !isNaN(e.target.value))
      )
        setSettingVal(Utils?.onChangeInputData(e, SettingVal));
      else if (
        (e.target.name === "price" ||
          e.target.name === "min_qty" ||
          e.target.name === "max_qty") &&
        !isNaN(e.target.value)
      ) {
        setSettingVal(Utils?.onChangeInputData(e, SettingVal));
        if (e.target.value != "") {
          const delayFn = setTimeout(() => {
            if (parseFloat(e.target.value) >= 0) {
              let arr = [];
              arr.push({ fieldname: e.target.name, value: e.target.value });
              saveSettings(arr);
            }
          }, 1500);
          if (e.target.name === "min_qty") {
            setMin_qty_loader(true);

            if (min_qty_timeoutID) {
              clearTimeout(min_qty_timeoutID);
            }
            setMin_qty_timeoutID(delayFn);
          } else if (e.target.name === "max_qty") {
            setMax_qty_loader(true);
            if (max_qty_timeoutID) {
              clearTimeout(max_qty_timeoutID);
            }
            setMax_qty_timeoutID(delayFn);
          } else if (e.target.name === "price") {
            setPrice_loader(true);
            if (price_timeoutID) {
              clearTimeout(price_timeoutID);
            }
            setPrice_timeoutID(delayFn);
          }
        }
      }
    },
    [SettingVal]
  );

  const handleInputBlur = (e) => {
    if (e.target.value === "") {
      setSettingVal((curr) => ({
        ...curr,
        [e.target.name]: selectedCategory[e.target.name],
      }));
      resetLoader();
    }
  };

  const setLimit = () => {
    let arr = [];
    ["capacity", "over_capacity", "show_counter", "global_capacity"].forEach(
      (key) => {
        arr.push({
          fieldname: key,
          value: key === "capacity" ? SettingVal[key] : SettingVal[key] ? 1 : 0,
        });
      }
    );
    arr.push({
      fieldname: "capacity_unlimited",
      value: makeItInfinite,
    });
    saveSettings(arr, null, () => {
      onModelClose();
    });
  };

  const removeLimit = () => {
    let arr = [];
    arr.push({ fieldname: "remove_limit", value: 1 });
    saveSettings(arr, null, () => {
      onModelClose();
      setSettingVal((current) => ({
        ...current,
        capacity: 0,
      }));
    });
  };

  const handleToggle = (val, fieldname, cb) => {
    if (
      fieldname === "over_capacity" ||
      fieldname === "show_counter" ||
      fieldname === "global_capacity"
    ) {
      setSettingVal((prev) => ({ ...prev, [fieldname]: val ? 1 : 0 }));
    } else if (
      fieldname === "require_approval"
      // || fieldname === "buyer_detail_only"
    ) {
      let arr = [];
      arr.push({ fieldname: fieldname, value: val ? 1 : 0 });
      saveSettings(arr, () => {
        cb(selectedCategory["require_approval"]);
      });
    }
  };

  const validateDate = (start_date, end_date, key) => {
    let isValid = true;
    if (start_date && end_date) {
      if (end_date < start_date) {
        let message =
          key === "start_date"
            ? "Start date must be on or before the end date"
            : "End date must be on or after the start date";
        ShowToast({
          message: message,
          variant: "info",
        });
        isValid = false;
      }
    }
    return isValid;
  };

  useEffect(() => {
    //console.log("selected category : ", selectedCategory);
    for (let key in SettingVal) {
      if (selectedCategory[key] && selectedCategory[key] !== SettingVal[key]) {
        setSettingVal((prev) => ({ ...prev, [key]: selectedCategory[key] }));
      }
    }
    if (selectedCategory["capacity"] === -1) {
      setMakeItInfinite(1);
    }
  }, []);

  // useEffect(() => {
  //   //console.log("settings : ", SettingVal);
  //   for (let key in SettingVal) {
  //     if (
  //       (key === "start_date" || key === "end_date") &&
  //       SettingVal[key] &&
  //       selectedCategory[key] !== SettingVal[key]
  //     ) {
  //       let arr = [];
  //       arr.push({
  //         fieldname: key,
  //         value: dayjs(SettingVal[key]).format("YYYY-MM-DD HH:mm:ss"),
  //       });
  //       arr.push({
  //         fieldname: "timezone",
  //         value:
  //           event?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
  //       });
  //       if (
  //         validateDate(SettingVal["start_date"], SettingVal["end_date"], key)
  //       ) {
  //         saveSettings(arr);
  //       } else {
  //         setSettingVal((prev) => ({
  //           ...prev,
  //           [key]: selectedCategory[key],
  //         }));
  //       }
  //     }
  //   }
  // }, [SettingVal]);

  useEffect(() => {
    Utils?.removeModal(dropDownQuestionRef, openDropQuestionRef, () => {
      setOpenDropQuestion(false);
    });
    Utils?.removeModal(dropDownCurrencyRef, openDropCurrencyRef, () => {
      setOpenDropCurrency(false);
    });
  }, [
    dropDownQuestionRef,
    openDropQuestionRef,
    dropDownCurrencyRef,
    openDropCurrencyRef,
  ]);

  return (
    <>
      <div className="shadow-md rounded-md">
        <div className="flex justify-between p-3 border-b-[1px] items-center">
          <p className="font-medium text-[#131517]">Category Type</p>
          <div className="relative">
            <Button
              buttonRef={dropDownQuestionRef}
              type={"button"}
              className="text-sm btn-light justify-between flex items-center gap-5 stroke-[#595C5C] h-[30px] hover:stroke-white hover:fill-white"
              onClick={handleDropQuestion}
              disabled={min_qty_loader || max_qty_loader || price_loader}
              showLoader={false}
            >
              {SettingVal?.category_type}
              {Svg().SingleSelect}
            </Button>
            {openDropQuestion ? (
              <div
                ref={openDropQuestionRef}
                className="boxShadow border p-1 absolute left-0 z-10 mt-3 w-[150px] rounded-md bg-white focus:outline-none"
              >
                <ul className="cursor-pointer">
                  {["Paid", "Free"].map((item) => (
                    <li
                      key={item}
                      className={`text-[#131517] text-sm flex gap-2 justify-between items-center rounded-sm hover:bg-[#DFE0E1] p-1 font-medium stroke-[#131517] `}
                      onClick={() => handleItemClick(item, "category_type")}
                    >
                      {item}{" "}
                      {includedArr?.includes(item) ? Svg().Checkbox : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        {SettingVal?.category_type === "Paid" ? (
          <div className="flex justify-between p-3 border-b-[1px] items-center">
            <p className="font-medium text-[#131517]">Currency</p>
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Button
                  buttonRef={dropDownCurrencyRef}
                  type={"button"}
                  className="text-sm btn-light justify-between flex items-center gap-3 stroke-[#595C5C] h-[30px] hover:stroke-white hover:fill-white"
                  onClick={handleDropCurrency}
                >
                  {SettingVal?.currency_type}
                  {Svg().SingleSelect}
                </Button>
                {openDropCurrency ? (
                  <div
                    ref={openDropCurrencyRef}
                    className="boxShadow border p-1 absolute left-0 z-10 mt-3 w-[150px] rounded-md bg-white focus:outline-none"
                  >
                    <ul className="cursor-pointer">
                      {["USD", "INR", "AED"].map((item) => (
                        <li
                          key={item}
                          className={`text-[#131517] text-sm flex gap-2 justify-between items-center rounded-sm hover:bg-[#DFE0E1] p-1 font-medium stroke-[#131517] `}
                          onClick={() => handleItemClick(item, "currency_type")}
                        >
                          {item}{" "}
                          {includedArr?.includes(item) ? Svg().Checkbox : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              {/* <Input
                name="price"
                onChange={handleChange}
                disabled={max_qty_loader || min_qty_loader}
                val={SettingVal.price}
                inputCls="text-sm w-[110px] border border-[#EBECED] rounded-lg h-[30px] px-2 focus:outline-none focus:border-[#000] hover:border-[#595C5C] transition-all outline-none"
                placeholder="Enter Price"
              /> */}
            </div>
          </div>
        ) : null}

        <div className="flex justify-between p-3 border-b-[1px] items-center">
          <p className="font-medium text-[#131517]">Require Approval</p>
          <div id={`approval-${selectedCategory?.id}`}>
            <ToggleButton
              isDisabled={min_qty_loader || max_qty_loader || price_loader}
              large={true}
              onChange={(val, cb) => {
                handleToggle(val, "require_approval", cb);
              }}
              initialVal={selectedCategory?.require_approval}
            />
          </div>
        </div>

        <div className="flex justify-between p-3 border-b-[1px] items-center">
          <p className="font-medium text-[#131517]">Capacity</p>
          <div className="flex gap-2 items-center">
            {selectedCategory?.capacity >= 0 ? (
              selectedCategory?.capacity
            ) : selectedCategory?.capacity === -1 ? (
              <img
                src="../Assets/Images/infinite.png"
                alt="infinite"
                title="infinite"
              />
            ) : (
              <img
                src="../Assets/Images/infinite.png"
                alt="infinite"
                title="infinite"
              />
            )}
            <button
              type="button"
              className="flex items-center gap-2 btn-light text-sm py-1 max-sm:h-[30px] setting-btn-height px-1 hover:stroke-none"
              onClick={() => {
                let obj = { ...SettingVal };
                obj["capacity"] = selectedCategory?.capacity;
                obj["global_capacity"] = selectedCategory?.global_capacity;
                obj["show_counter"] = selectedCategory?.show_counter;
                obj["over_capacity"] = selectedCategory?.over_capacity;
                setSettingVal(obj);
                if (selectedCategory["capacity"] === -1) {
                  setMakeItInfinite(1);
                } else {
                  setMakeItInfinite(0);
                }
                setIsOpen(true);
              }}
            >
              {Svg().Edit}
            </button>
          </div>
        </div>

        <div className="flex justify-between p-3 border-b-[1px] items-center gap-2">
          <div className="flex gap-2 items-center flex-shrink">
            <p className="font-medium text-[#131517] inline flex-shrink">
              Quantity Per Booking
            </p>
            <ToolTip icon={true}>
              <div className="flex justify-between gap-3 text-sm w-[200px] mb-1">
                <p>
                  This setting allows you to control the number of tickets a
                  guest can purchase in a single transaction by setting both a
                  minimum and a maximum quantity.
                </p>
              </div>
            </ToolTip>
          </div>
          <div className="flex-col sm:flex-row flex items-center gap-1 sm:gap-5">
            <div className="flex items-center gap-1">
              <label>Min</label>
              <Input
                name="min_qty"
                onChange={handleChange}
                disabled={max_qty_loader || price_loader}
                onBlur={handleInputBlur}
                val={SettingVal.min_qty}
                inputCls="text-sm w-[110px] border border-[#EBECED] rounded-lg h-[30px] px-2 focus:outline-none focus:border-[#000] hover:border-[#595C5C] transition-all outline-none"
                placeholder="Enter Qty"
              />
            </div>
            <div className="flex items-center gap-1">
              <label>Max</label>
              <Input
                name="max_qty"
                disabled={min_qty_loader || price_loader}
                onChange={handleChange}
                onBlur={handleInputBlur}
                val={SettingVal.max_qty}
                inputCls="text-sm w-[110px] border border-[#EBECED] rounded-lg h-[30px] px-2 focus:outline-none focus:border-[#000] hover:border-[#595C5C] transition-all outline-none"
                placeholder="Enter Qty"
              />
            </div>
          </div>
        </div>
        {/* <div className="flex justify-between p-3 border-b-[1px] items-center">
          <p className="font-medium text-[#131517]">Buyer Details Only</p>
          <div>
            <ToggleButton
              large={true}
              onChange={(val) => {
                handleToggle(val, "buyer_detail_only");
              }}
              initialVal={selectedCategory?.buyer_detail_only}
            />
          </div>
        </div> */}
        {/* <div className="flex justify-between p-3 border-b-[1px] items-center">
          <p className="font-medium text-[#131517]">Sale Start Date & Time</p>
          <div>
            <div className="relative inline-block">
              <input
                className="outline-none bg-transparent absolute top-0 left-0 w-full h-full z-10 opacity-0"
                type="datetime-local"
                name="start_date"
                disabled={selectedCategory?.subcategory?.length}
                value={SettingVal?.start_date ? SettingVal?.start_date : ""}
                //min={dayjs(event?.start_date).format("YYYY-MM-DDTHH:mm")}
                min={dayjs().format("YYYY-MM-DD HH:mm")}
                max={dayjs(event?.end_date).format("YYYY-MM-DD HH:mm")}
                onChange={handleChange}
              />
              <div className="text-[#131517] font-medium flex items-center gap-3">
                {SettingVal?.start_date ? (
                  dayjs(SettingVal?.start_date)?.format("DD/MM/YYYY - HH:mm")
                ) : (
                  <span className="opacity-80">Select Date</span>
                )}{" "}
                {Svg()?.CalendarIcon}
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="flex justify-between p-3 border-b-[1px] items-center">
          <p className="font-medium text-[#131517]">Sale End Date & Time</p>
          <div>
            <div className="relative inline-block">
              <input
                className="outline-none bg-transparent absolute top-0 left-0 w-full h-full z-10 opacity-0"
                type="datetime-local"
                name="end_date"
                disabled={selectedCategory?.subcategory?.length ? true : false}
                value={SettingVal?.end_date ? SettingVal?.end_date : ""}
                //min={dayjs(event?.start_date).format("YYYY-MM-DDTHH:mm")}
                min={dayjs().format("YYYY-MM-DD HH:mm")}
                max={dayjs(event?.end_date).format("YYYY-MM-DD HH:mm")}
                onChange={handleChange}
              />
              <div className="text-[#131517] font-medium flex items-center gap-3">
                {SettingVal?.end_date ? (
                  dayjs(SettingVal?.end_date)?.format("DD/MM/YYYY - HH:mm")
                ) : (
                  <span className="opacity-80">Select Date</span>
                )}{" "}
                {Svg()?.CalendarIcon}
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <Modal
        open={isOpen}
        onClose={onModelClose}
        icon="MaxCapacity"
        iconCls="bg-[#EFEFEF] w-10 h-10 flex items-center justify-center rounded-full"
        showBtn={false}
        title="Max Capacity"
      >
        <p className="mb-5">
          Auto-Close Registration When The Capacity Is Reached. Only Approved
          Guests Count Toward The Cap.
        </p>
        <div>
          <div className="flex justify-between">
            <label className="font-medium mb-1 text-sm text-[#595C5C]">
              Capacity
            </label>
            <div className="font-medium mb-1 text-sm text-[#595C5C]">
              <Input
                label="Make it infinite"
                wrapperCls="flex"
                type={"checkbox"}
                inputCls="w-4 h-4 accent-black cursor-pointer ml-2"
                onChange={(e) => {
                  let obj = { ...SettingVal };
                  if (!e?.target?.checked && obj?.capacity === -1) {
                    obj["capacity"] = 0;
                    setSettingVal(obj);
                  }
                  setMakeItInfinite(e?.target?.checked ? 1 : 0);
                }}
                checked={makeItInfinite ? (makeItInfinite === 1 ? 1 : 0) : ""}
              />
            </div>
          </div>

          {makeItInfinite === 1 ? (
            <div className="relative">
              {makeItInfinite === 1 ? (
                <img
                  alt="infinite"
                  title="infinite"
                  src="../Assets/Images/infinite.png"
                  style={{
                    position: "absolute",
                    left: "6px",
                    top: "5px",
                    background: "#ffffff",
                  }}
                />
              ) : null}

              <Input inputCls="input " />
            </div>
          ) : (
            <Input
              inputCls="input "
              name="capacity"
              onChange={handleChange}
              val={SettingVal.capacity}
            />
          )}
        </div>

        <div className="flex justify-between items-center mb-2 mt-3">
          <p>Make this limit the global for the category</p>
          <div>
            <ToggleButton
              onChange={(val) => {
                handleToggle(val, "global_capacity");
              }}
              initialVal={SettingVal?.global_capacity}
            />
          </div>
        </div>
        <div className="flex justify-between items-center mb-2 mt-3">
          <p>Over-Capacity Waitlist</p>
          <ToggleButton
            initialVal={SettingVal?.over_capacity}
            onChange={(val) => {
              handleToggle(val, "over_capacity");
            }}
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <p>Show Counter</p>
          <ToggleButton
            initialVal={SettingVal?.show_counter}
            onChange={(val) => {
              handleToggle(val, "show_counter");
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            className="btn-dark"
            onClick={setLimit}
            disabled={
              isLoading || min_qty_loader || max_qty_loader || price_loader
            }
          >
            Set Limit
          </Button>
          <Button
            type="button"
            className="btn-light grow"
            onClick={removeLimit}
            disabled={
              isLoading || min_qty_loader || max_qty_loader || price_loader
            }
          >
            Remove Limit
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default CategorySettings;
