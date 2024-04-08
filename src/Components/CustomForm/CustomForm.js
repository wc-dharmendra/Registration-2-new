import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Svg from "../../../public/Assets/Svg";
import Button from "../Button/Button";
import Utils from "@/Utils/Utils";
import Input from "../InputForm/InputForm";
import useEventStore from "@/Store/useEventStore";

const CustomForm = ({
  id = "",
  name = "Text",
  validation_as = "Text",
  type = "Text",
  isRequired = false,
  fieldName = "",
  isUnique = false,
  options = [{ label: "" }, { label: "" }],
  onDelete = () => { },
  index = 0,
  arr = [],
  isEdit = false,
  customTypeData = [],
}) => {
  //const { eventForm } = useEventStore();
  //console.log(eventForm);
  //console.log(validation_as, arr);
  const dropDownRef = useRef(null);
  const openDropRef = useRef(null);

  const dropdownRef = useRef(null);

  const [inputData, setInputData] = useState({
    isRequired: false,
    fieldName: "",
    type: "Text",
    name: "Text",
    isUnique: false,
    options: [{ label: "" }, { label: "" }],
    validation_as: "Text",
  });
  const [openDrop, setOpenDrop] = useState(false);
  const [styleWidth, setStyleWidth] = useState(0);

  const handleItemClick = useCallback(
    (text, name, validation_as) => {
      setInputData({
        ...inputData,
        type: text,
        name,
        validation_as,
      });
      arr[index]["type"] = text;
      arr[index]["validation_as"] = validation_as;
      setOpenDrop(false);
    },
    [inputData, arr, index]
  );

  const onChange = useCallback(
    (e) => {
      const updatedData = Utils?.onChangeInputData(e, inputData);
      setInputData(Utils?.onChangeInputData(e, inputData));
      arr[index]["fieldName"] = updatedData?.fieldName;
      if (arr[index]["validation_as"] === undefined) {
        arr[index]["validation_as"] = "text";
      }
    },
    [inputData, arr, index]
  );

  const onChecked = useCallback(
    (isChecked) => {
      setInputData({
        ...inputData,
        isRequired: isChecked,
      });
      arr[index]["isRequired"] = isChecked;
    },
    [inputData, arr, index]
  );

  const onUniqueCheck = useCallback(
    (isUniqueCheck) => {
      setInputData({
        ...inputData,
        isUnique: isUniqueCheck,
      });
      arr[index]["isUnique"] = isUniqueCheck;
    },
    [inputData, arr, index]
  );

  const handleDrop = useCallback(() => {
    setOpenDrop(!openDrop);
  }, [openDrop]);

  const onAddMore = useCallback(() => {
    if (inputData?.options?.length < 50) {
      arr[index]["options"] = inputData?.options?.concat({
        label: "",
      });
      setInputData({
        ...inputData,
        options: inputData?.options?.concat({
          label: "",
        }),
      });
    }
  }, [inputData]);

  const updateDivWidth = () => {
    if (dropdownRef?.current) {
      const width = dropdownRef?.current?.clientWidth;
      setStyleWidth(width);
    }
  };

  useEffect(() => {
    setInputData({
      ...inputData,
      type,
      name,
      isRequired,
      fieldName,
      options,
      isUnique,
      validation_as,
    });
  }, [type, isRequired, fieldName, options, isUnique, validation_as]);

  useEffect(() => {
    Utils?.removeModal(dropDownRef, openDropRef, () => {
      setOpenDrop(false);
    });
  }, [dropDownRef, openDropRef]);

  useEffect(() => {
    updateDivWidth();
    const intervalId = setInterval(updateDivWidth, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3" id={`custom${index}`}>
      <div className="flex gap-5 items-center max-md:flex-col max-md:items-end max-md:gap-3">
        <div className="relative w-full">
          <Input
            maxLength={255}
            inputCls="input w-full pr-5 custom-question-input"
            placeholder="Question"
            name="fieldName"
            val={inputData?.fieldName}
            onChange={onChange}
            styles={{ paddingRight: styleWidth + 5 }}
          />
          <div
            ref={dropdownRef}
            className="md:absolute right-1 top-1 max-md:left-0 max-md:top-full max-md:mt-3 width"
          >
            <div className="relative">
              <Button
                buttonRef={dropDownRef}
                type={"button"}
                className="text-sm btn-light justify-between flex items-center gap-5 max-md:gap-2 stroke-[#595C5C] hover:stroke-white hover:fill-white h-[32px] text-dark"
                onClick={handleDrop}
              >
                <div className="w-5">
                  {
                    Svg()?.[
                    id
                      ? Utils?.toTitleCase(
                        validation_as?.replace("_", " ")
                      )?.replace(/\s/g, "")
                      : Utils?.toTitleCase(
                        inputData?.validation_as?.replace("_", " ")
                      )?.replace(/\s/g, "")
                    ]
                  }
                </div>

                {id
                  ? Utils?.toTitleCase(validation_as?.replace("_", " "))
                  : Utils?.toTitleCase(
                    inputData?.validation_as?.replace("_", " ")
                  )}
                {Svg()?.SingleSelect}
              </Button>
              {!isEdit && !id && openDrop ? (
                <div
                  ref={openDropRef}
                  className="boxShadow border p-1 absolute left-0 z-10 mt-3 w-[150px] rounded-md bg-white focus:outline-none"
                >
                  <ul className="cursor-pointer">
                    {customTypeData?.length
                      ? customTypeData?.map((item) => (
                        <li
                          key={item?.name}
                          className="text-[#131517] text-sm flex gap-2 items-center rounded-sm hover:bg-[#DFE0E1] p-1 font-medium"
                          onClick={() =>
                            handleItemClick(
                              item?.type,
                              item?.name,
                              item?.validation_as
                            )
                          }
                        >
                          <div className="shrink-0 stroke-[#595C5C]">
                            {Svg()?.[item?.name?.replace(/\s/g, "")]}
                          </div>{" "}
                          {item?.name}
                        </li>
                      ))
                      : null}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {!isEdit && !id ? (
          <div className="flex items-center gap-5">
            <Button onClick={() => onDelete(index)} type="button">
              {Svg().Delete}
            </Button>
          </div>
        ) : null}
      </div>
      <div className="flex items-center gap-5">
        <div className="py-1 flex items-center gap-2 font-medium text-[#131517]">
          <Input
            wrapperCls={"flex"}
            onChange={(e) => onChecked(e?.target?.checked)}
            checked={inputData?.isRequired}
            type={"checkbox"}
            inputCls="w-5 h-5 accent-black cursor-pointer"
          />
          <label>Required</label>
        </div>
        <div className="py-1 flex items-center gap-2 font-medium text-[#131517]">
          <Input
            wrapperCls={"flex"}
            onChange={(e) => onUniqueCheck(e?.target?.checked)}
            checked={inputData?.isUnique}
            type={"checkbox"}
            inputCls="w-5 h-5 accent-black cursor-pointer"
          />
          <label>Unique</label>
        </div>
      </div>

      {(inputData?.validation_as === "single_select" ||
        inputData?.validation_as === "multiple_select") &&
        inputData?.options?.length ? (
        <div className="options-wrapper bg-[#EFEFF0] p-3 rounded-lg flex flex-col gap-3 ">
          {inputData?.options?.map((e, i) => {
            return (
              <Fragment key={"multiORsingle" + i.toString()}>
                <div className="flex gap-3 relative">
                  <Input
                    maxLength={40}
                    inputCls={`input w-full ${i > 1 ? "pr-override" : ""}`}
                    placeholder={`Answer${i + 1}`}
                    name={Object.keys(inputData?.options[i])[0]}
                    val={e?.label}
                    onChange={(e) => {
                      let copyArr = inputData?.options;
                      if (
                        typeof e.target.value == "string" &&
                        e.target.value !== null &&
                        e.target.value !== " " &&
                        e.target.value.trim() !== " "
                      ) {
                        copyArr[i]["label"] = e.target.value;
                        arr[index]["options"][i]["label"] = e.target.value;
                        setInputData({
                          ...inputData,
                          options: copyArr,
                        });
                      }
                    }}
                  />

                  {i > 1 ? (
                    <Button
                      type="button"
                      className={`absolute right-2 top-3 `}
                      onClick={() => {
                        let copyArr = inputData?.options;
                        copyArr.splice(i, 1);
                        arr[index]["options"] = copyArr;
                        setInputData({
                          ...inputData,
                          options: copyArr,
                        });
                      }}
                    >
                      {Svg().Delete}
                    </Button>
                  ) : null}
                </div>
              </Fragment>
            );
          })}
        </div>
      ) : null}
      {(inputData?.name === "Single Select" ||
        inputData?.name === "Multiple Select")
        && inputData?.options?.length < 50
        ? (
          <div className="CustomFieldsAdd">
            <Button onClick={onAddMore} type="button" className="btn-light">
              + Add
            </Button>
          </div>
        ) : null}
    </div>
  );
};
export default CustomForm;
