import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Utils from "@/Utils/Utils";
import Svg from "../../../public/Assets/Svg";
import Button from "../Button/Button";
import Input from "../InputForm/InputForm";
import CustomForm from "../CustomForm/CustomForm";
import ShowToast from "@/Toaster/Toaster";
import useEventStore from "@/Store/useEventStore";
import useCommonStore from "@/Store/useCommonStore";
import Loader from "../Loader/Loader";

function AddQuestion({
  handleOpenAddQuestion = () => { },
  title = "Add Question",
  isEdit = false,
  editedQue = [],
  addedQue = [],
  saveForm = () => { },
  editQues = () => { },
  suggestiveTypeData = [],
  customTypeData = [],
  eventFields = [],
}) {
  const dropDownQuestionRef = useRef(null);
  const openDropQuestionRef = useRef(null);
  const [openDropQuestion, setOpenDropQuestion] = useState(false);
  const [includedArr, setIncludedArr] = useState(["Title"]);

  // const { eventForm } = useEventStore();

  const [suggestiveQuestionArr, setSuggestiveQuestionArr] = useState([]);
  const [customQuestionArr, setCustomQuestionArr] = useState([]);
  const { isLoading } = useCommonStore();

  const handleDropQuestion = () => {
    if (suggestiveTypeData?.length) {
      setOpenDropQuestion(!openDropQuestion);
    }
  };

  const handleItemClickQuestion = useCallback(
    (obj) => {
      if (obj?.label) {
        if (!includedArr?.includes(obj?.label)) {
          setIncludedArr([...includedArr, obj?.label]);
          setSuggestiveQuestionArr([
            ...suggestiveQuestionArr,
            {
              fieldName: obj?.label?.trimEnd(),
              type: obj?.type,
              isRequired: false,
              isCustomField: false,
              validation_as: obj?.validation_as,
            },
          ]);
        }
        setOpenDropQuestion(false);
      }
    },
    [includedArr]
  );

  const onChecked = useCallback(
    (isChecked, type) => {
      const findIndex = suggestiveQuestionArr?.findIndex(
        (e) => e?.fieldName === type
      );
      suggestiveQuestionArr[findIndex]["isRequired"] = isChecked;
      setSuggestiveQuestionArr([...suggestiveQuestionArr]);
    },
    [suggestiveQuestionArr]
  );

  const onUniqueChecked = useCallback(
    (isChecked, type) => {
      const findIndex = suggestiveQuestionArr?.findIndex(
        (e) => e?.fieldName === type
      );
      suggestiveQuestionArr[findIndex]["isUnique"] = isChecked;
      setSuggestiveQuestionArr([...suggestiveQuestionArr]);
    },
    [suggestiveQuestionArr]
  );

  const onDelete = useCallback(
    (type) => {
      const findIndex = suggestiveQuestionArr?.findIndex(
        (e) => e?.fieldName === type
      );
      const index = includedArr?.findIndex((e) => e === type);
      suggestiveQuestionArr.splice(findIndex, 1);
      includedArr.splice(index, 1);
      setSuggestiveQuestionArr([...suggestiveQuestionArr]);
      setIncludedArr([...includedArr]);
    },
    [suggestiveQuestionArr, includedArr]
  );

  const onCustomDelete = useCallback(
    (index) => {
      customQuestionArr.splice(index, 1);
      setCustomQuestionArr([...customQuestionArr]);
    },
    [customQuestionArr]
  );

  const onCustomAdd = useCallback(async () => {
    if (customQuestionArr?.length) {
      if (await isValid()) {
        setCustomQuestionArr([
          ...customQuestionArr,
          {
            fieldName: "",
            type: "text",
            isRequired: false,
            isUnique: false,
            isCustomField: true,
            options: [{ label: "" }, { label: "" }],
          },
        ]);
        setTimeout(() => {
          if (document?.getElementById("custom" + customQuestionArr?.length)) {
            document?.getElementById("custom" + customQuestionArr?.length)?.scrollIntoView({
              behavior: "smooth",
            });
          }
        }, 300);
      }
    } else {
      setCustomQuestionArr([
        {
          fieldName: "",
          type: "text",
          isRequired: false,
          isUnique: false,
          isCustomField: true,
          options: [{ label: "" }, { label: "" }],
        },
      ]);
    }
  }, [customQuestionArr?.length]);

  const isValid = async () => {
    let isValid = true;
    let labelsName = [];
    //let combineArr = [...suggestiveQuestionArr, ...customQuestionArr];
    let combineArr = [...customQuestionArr];
    // if (eventFields?.length) {
    //   for (let i = 0; i < eventFields?.length; i++) {
    //     let obj = {
    //       id: eventFields[i]?.id,
    //       fieldName: eventFields[i]?.label,
    //       validation_as: eventFields[i]?.validation_as,
    //       type: eventFields[i]?.type,
    //       isRequired: eventFields[i]?.required,
    //       display_order: eventFields[i]?.display_order,
    //       isCustomField: eventFields[i]?.field_type === "custom" ? true : false,
    //       isUnique: eventFields[i]?.unique,
    //       is_multiple: eventFields[i]?.is_multiple,
    //       options: eventFields[i]?.options?.length
    //         ? eventFields[i]?.options.map((obj) => {
    //             return {
    //               label: obj.text,
    //             };
    //           })
    //         : [],
    //     };
    //     combineArr.push(obj);
    //   }
    // }
    for (let i = 0; i < combineArr?.length; i++) {
      if (!combineArr[i]["fieldName"]) {
        setTimeout(() => {
          if (document?.getElementById("custom" + i)) {
            document?.getElementById("custom" + i)?.scrollIntoView({
              behavior: "smooth",
            });
          }
        }, 300);
        ShowToast({ message: "Please add question label", variant: "info" });
        isValid = false;
        break;
      } else if (combineArr[i]["type"] === "select") {
        if (!Utils?.isUniqueAndNonEmpty(combineArr[i]["options"])) {
          ShowToast({
            message: "Options must be unique and non-empty ",
            variant: "info",
          });
          setTimeout(() => {
            if (document?.getElementById("custom" + i)) {
              document?.getElementById("custom" + i)?.scrollIntoView({
                behavior: "smooth",
              });
            }
          }, 300);
          isValid = false;
          break;
        }
      }
      // if (combineArr[i]["fieldName"]) {
      //   labelsName.push(combineArr[i]?.fieldName?.toLowerCase());
      //   if (Utils?.isArrayUnique(labelsName)) {
      //     isValid = true;
      //   } else {
      //     isValid = false;
      //     ShowToast({
      //       message: "Please add unique question label",
      //       variant: "info",
      //     });
      //     break;
      //   }
      // }
    }
    return isValid;
  };

  const onSaveChanges = async () => {
    if (await isValid()) {
      if (isEdit) {
        editQues(customQuestionArr, () => {
          handleOpenAddQuestion();
        });
      } else {
        saveForm(suggestiveQuestionArr, customQuestionArr, () => {
          handleOpenAddQuestion();
        });
      }
    }
  };

  useEffect(() => {
    if (isEdit) {
      setCustomQuestionArr(editedQue);
    } else if (!isEdit) {
      let tempCustom = [],
        tempSuggest = [],
        isIncluded = [];
      for (let i = 0; i < addedQue?.length; i++) {
        let obj = {
          id: addedQue[i]?.id,
          fieldName: addedQue[i]?.label,
          validation_as: addedQue[i]?.validation_as,
          type: addedQue[i]?.type,
          isRequired: addedQue[i]?.required,
          display_order: addedQue[i]?.display_order,
          isCustomField: addedQue[i]?.field_type === "custom" ? true : false,
          isUnique: addedQue[i]?.unique,
          is_multiple: addedQue[i]?.is_multiple,
          options: addedQue[i]?.options?.length
            ? addedQue[i]?.options.map((obj) => {
              return {
                label: obj.text,
              };
            })
            : [],
        };
        if (obj?.["isCustomField"]) {
          tempCustom.push(obj);
        } else if (!obj?.["isCustomField"]) {
          tempSuggest.push(obj);
          isIncluded.push(obj?.fieldName);
        }
      }
      setSuggestiveQuestionArr(tempSuggest);
      setCustomQuestionArr(tempCustom);
      setIncludedArr(isIncluded);
    }
  }, [isEdit]);

  useEffect(() => {
    Utils?.removeModal(dropDownQuestionRef, openDropQuestionRef, () => {
      setOpenDropQuestion(false);
    });
  }, [dropDownQuestionRef, openDropQuestionRef]);

  return (
    <div className="addQuestionWrapper fixed left-0 right-0 top-0 h-screen overflow-auto bg-white">
      {isLoading ? <Loader /> : null}
      <div className="border-b-[1px]">
        <div className="container md:w-[820px] lg:w-[820px] mx-auto px-4">
          <div className="flex justify-between  items-center mb-5 mt-4">
            <h1 className="font-semibold text-xl xs:text-xl sm:text-2xl md:text-3xl lg:text-3xl text-[#131517]">
              {title}
            </h1>
            <Button type="button" className="" onClick={handleOpenAddQuestion}>
              {Svg().PopupCross}
            </Button>
          </div>
        </div>
      </div>
      <div className="add-q-height pt-6">
        <div className="container lg:w-[820px] mx-auto px-4">
          {!isEdit ? (

            <div className="suggestive-question-wrapper border-b-[1px] mb-10">
              <div className="flex justify-between items-center mb-5 mt-4 max-md:flex-col max-md:items-start max-md:gap-3">
                <h2 className="head">{Svg()?.Identity}Suggestive Questions</h2>
                <div className="relative">
                  <Button
                    buttonRef={dropDownQuestionRef}
                    type={"button"}
                    className="text-sm btn-light justify-between flex items-center gap-5 stroke-[#595C5C] h-[30px] hover:stroke-white hover:fill-white"
                    onClick={handleDropQuestion}
                  >
                    Add Question
                    {Svg().SingleSelect}
                  </Button>
                  {openDropQuestion ? (
                    <div
                      ref={openDropQuestionRef}
                      className="boxShadow border p-1 absolute left-0 z-10 mt-3 w-[150px] rounded-md bg-white focus:outline-none"
                    >
                      <ul className="cursor-pointer">
                        {suggestiveTypeData?.length
                          ? suggestiveTypeData?.map((item) => (
                            <li
                              key={item?.id}
                              className={`text-[#131517] text-sm flex gap-2 justify-between items-center rounded-sm hover:bg-[#DFE0E1] p-1 font-medium stroke-[#131517] `}
                              onClick={() => handleItemClickQuestion(item)}
                            >
                              {item?.label}{" "}
                              {includedArr?.includes(item?.label)
                                ? Svg().Checkbox
                                : null}
                            </li>
                          ))
                          : null}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
              {suggestiveQuestionArr?.length ? (
                <div className="p-3 border-[1px] rounded-lg mb-10 flex flex-col gap-3">
                  {suggestiveQuestionArr?.length
                    ? suggestiveQuestionArr?.map(
                      ({ fieldName, isRequired, validation_as, isUnique, id }) => {
                        return (
                          <div key={fieldName + isRequired} className="">
                            <div className="flex gap-3 items-center max-md:flex-col max-md:items-start max-md:gap-3 mb-2">
                              <Input
                                inputCls="input w-full"
                                placeholder={fieldName}
                                name="question"
                                disabled
                              />
                              {!id ? (
                                <Button
                                  type="button"
                                  onClick={() => onDelete(fieldName)}
                                >
                                  {Svg().Delete}
                                </Button>
                              ) : null}
                            </div>
                            <div className="flex gap-5 items-center">
                              <div className="py-1 flex items-center gap-2 font-medium">
                                <Input
                                  wrapperCls="flex"
                                  type={"checkbox"}
                                  inputCls="w-5 h-5 accent-black cursor-pointer"
                                  onChange={(e) =>
                                    onChecked(e?.target?.checked, fieldName)
                                  }
                                  checked={isRequired}
                                />
                                <label>Required</label>
                              </div>
                              {validation_as === 'phone' ? <div className="py-1 flex items-center gap-2 font-medium">
                                <Input
                                  wrapperCls="flex"
                                  type={"checkbox"}
                                  inputCls="w-5 h-5 accent-black cursor-pointer"
                                  onChange={(e) =>
                                    onUniqueChecked(e?.target?.checked, fieldName)
                                  }
                                  checked={isUnique}
                                />
                                <label>Unique</label>
                              </div> : null}
                            </div>
                          </div>
                        );
                      }
                    )
                    : null}
                </div>
              ) : (
                <p className="mb-10">There is no suggestive question added.</p>
              )}
            </div>
          ) : null}
          <div className="pb-8">
            <div className="custom-question-wrapper mb-10">
              <div className="flex justify-between items-center mb-5 mt-4 max-md:flex-col max-md:items-start max-md:gap-3">
                <h2 className="head">{Svg()?.Identity}Custom Questions</h2>
                {!isEdit ? (
                  <Button
                    type="button"
                    onClick={onCustomAdd}
                    className="flex items-center gap-2 btn-light text-sm py-1 h-[30px]"
                  >
                    {Svg()?.PlusIcon} Add Question
                  </Button>
                ) : null}
              </div>
              {customQuestionArr?.length ? (
                <div className="p-3 border-[1px] rounded-lg mb-10 flex flex-col gap-3">
                  {customQuestionArr?.length
                    ? customQuestionArr?.map((e, i, arr) => {
                      return (
                        <Fragment key={e?.type + i?.toString()}>
                          <CustomForm
                            isEdit={isEdit}
                            {...e}
                            onDelete={onCustomDelete}
                            index={i}
                            arr={arr}
                            onUpdate={setCustomQuestionArr}
                            customTypeData={customTypeData}
                          />
                        </Fragment>
                      );
                    })
                    : null}
                </div>
              ) : (
                <p className="mb-10">There is no custom question added.</p>
              )}
            </div>
            <div className="max-md:p-4 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:w-full max-md:border-t-[1px] max-md:bg-white">
              <Button
                onClick={onSaveChanges}
                disabled={isLoading}
                className="flex items-center gap-2 btn-dark mt-3 max-md:mt-0"
                type="button"
              >
                {Svg()?.CheckCircleIcon}Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;
