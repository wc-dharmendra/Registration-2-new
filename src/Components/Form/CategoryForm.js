import React, { Fragment, useCallback, useEffect, useState } from "react";
import Svg from "../../../public/Assets/Svg";
import AddQuestion from "../AddQuestion/AddQuestion";
import Button from "../Button/Button";
import Input from "../InputForm/InputForm";
import ReOrder from "../ReOrder/ReOrder";
import useCategoryMatrixStore from "@/Store/useCategoryMatrixStore";
import useCategoryForm from "@/CustomHook/useCategoryForm";
import Modal from "../Modal/Modal";
import Utils from "@/Utils/Utils";
import FormPreview from "./FormPreview";
import useCommonStore from "@/Store/useCommonStore";



export const CustomisedEmail = () => {
  return (
    <div className="popup-content-wrapper overflow-auto">
      <div className="shadow-lg p-5 rounded-lg border border-[1px]">
        <h2 className="font-semibold mb-5">
          Registration Confirmed For Event Name
        </h2>
        <div className="relative">
          <textarea
            className="form-control h-[150px]"
            placeholder="Add your custom message here."
          ></textarea>
          <div className="absolute top-1 left-[-20px]">{Svg().TextboxPlus}</div>
        </div>
        <p className="text-light">You can insert variables by typing</p>
      </div>
      <div className="popup-footer flex gap-5 p-4 items-center border-t-[1px] absolute bottom-0 left-0 w-full">
        <Button className="flex items-center gap-2 btn-dark" type="button">
          {Svg()?.CheckCircleIcon}Update Email
        </Button>
        <Button className="text-[#969498] font-semibold" type="button">
          Send a Preview
        </Button>
      </div>
    </div>
  );
};

const OrderContent = ({ label = "" }) => {
  return (
    <div className="flex gap-2 p-3 items-center">
      <div className="drag pr-1">{Svg().Drag}</div>
      <div className="question grow">
        <Input inputCls="input w-full" readOnly placeholder={label} />
      </div>
      <Button type="button">{Svg().Delete}</Button>
    </div>
  );
};

const CategoryForm = ({ setIsModalOpen }) => {
  const { selectedCategory, setSelectedCategory } = useCategoryMatrixStore();
  const {
    getCategoryFormData,
    categoryFormData,
    categoryFields,
    handleDeleteQuestion,
    handleOrderChange,
    saveQuestions,
    editQuestion,
  } = useCategoryForm();
  const { setIsLoading } = useCommonStore();
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [quePopup, setQuePopup] = useState({
    title: "Add Questions",
    isEdit: false,
    editedQue: [],
  });
  const [openPreview, setOpenPeview] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  //console.log(categoryFormData);
  const handleOpenAddQuestion = () => {
    setIsLoading(true);
    setOpenAddQuestion(!openAddQuestion);
    setQuePopup({ title: "Add Question", isEdit: false });
    if (!openAddQuestion) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  // console.log("---------", { categoryFields });

  const onEdit = useCallback((data = []) => {
    setIsLoading(true);
    let q = mapQuestionFields(data[0]);
    setQuePopup({ title: "Edit Question", isEdit: true, editedQue: [q] });
    setOpenAddQuestion(!openAddQuestion);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  const mapQuestionFields = (ques) => {
    let obj = {
      id: ques?.id,
      fieldName: ques?.label,
      validation_as: ques?.validation_as,
      type: ques?.type,
      isRequired: ques?.required,
      display_order: ques?.display_order,
      isCustomField: ques?.field_type === "custom" ? true : false,
      isUnique: ques?.unique,
      is_multiple: ques?.is_multiple,
      options: ques?.options?.length
        ? ques?.options?.map((obj) => {
          return {
            label: obj.text,
          };
        })
        : [],
    };
    return obj;
  };
  //console.log(categoryFields);
  useEffect(() => {
    if (selectedCategory?.id) getCategoryFormData();
    setIsClient(true);
  }, []);

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <h2 className="head">Universal Questions</h2>
        <Button
          className="flex items-center gap-2 btn-light text-sm py-1 max-sm:hidden stroke-[#595c5c] hover:stroke-[#fff]"
          type="button"
          onClick={() => {
            setOpenPeview(true);
          }}
        >
          {Svg().EyeIcon}Form Preview
        </Button>
      </div>
      <p>Fields currently present on the Registration form</p>
      {isClient ? (
        <Fragment>
          <div className="border-b-[1px] pb-5 mt-5">
            {categoryFormData &&
              categoryFormData?.event_fields?.map((item) => {
                return (
                  <div
                    className="flex items-center gap-2 mb-4 justify-between"
                    key={item?.id}
                  >
                    <h2 className="flex gap-2 items-center font-semibold text-[#131517] break-all">
                      <div className="w-5 text-center">
                        {item?.label === "Email Address"
                          ? Svg().Email
                          : item?.label === "First Name" ||
                            item?.label === "Last Name"
                            ? Svg().Name
                            : Svg().CustomQuestion}
                      </div>
                      {item?.label}
                    </h2>
                    <div className="bg-[#DFE0E1] text-[13px] text-[#969498] rounded-full px-2 py-0.5">
                      {item?.required ? "Required" : "Optional"}
                    </div>
                  </div>
                );
              })}
            {/* <div className="flex items-center gap-2 mb-4 justify-between">
              <h2 className="flex gap-2 items-center font-semibold">
                <div className="w-5 text-center">{Svg().CustomQuestion}</div>
                Custom Question
              </h2>
              <div className="bg-[#DFE0E1] text-[13px] text-[#969498] rounded-full px-2 py-0.5">
                Optional
              </div>
            </div> */}
          </div>
          <div className="border-b-[1px] pb-5">
            <div className="flex justify-between items-center">
              <h2 className="head mt-4 mb-2">Category Add-On Questions</h2>
            </div>
            {!categoryFields?.length ? (
              <p className="text-[#595C5C] text-sm">
                Feel free to include any extra questions you’d like to pose to
                our guests.
              </p>
            ) : null}
            {categoryFields?.length ? (
              <div className="bg-white border rounded-lg px-4 py-2">
                <ReOrder
                  items={categoryFields}
                  keyId="id"
                  label="label"
                  onPosChange={handleOrderChange}
                  handleDelete={(ques) => handleDeleteQuestion(ques)}
                  onEdit={onEdit}
                />
              </div>
            ) : null}

            <Button
              onClick={handleOpenAddQuestion}
              className="flex items-center gap-2 btn-dark mt-3 fill-[#fff]"
              type="button"
            >
              {Svg()?.Edit}Add Questions
            </Button>
          </div>
          <div className="pb-5">
            <h2 className="head mt-4 mb-2">Registration Email</h2>
            <p className="text-[#595C5C] text-sm">
              Upon Registration, we dispatch a confirmation email that includes
              a calendar invitation to our guests.
            </p>
            {/* <Button className='flex items-center gap-2 btn-dark mt-4' type='button' onClick={openModal}>{Svg()?.CustomizeEmail}Customise Email</Button> */}
            <Button className='flex items-center gap-2 btn-dark mt-4' type='button' 
             onClick={openModal}
            >{Svg()?.ResendEmail}Customise Email</Button>
          </div>
          {openAddQuestion ? (
            <AddQuestion
              addedQue={categoryFields}
              saveForm={saveQuestions}
              editQues={editQuestion}
              isEdit={quePopup?.isEdit}
              editedQue={quePopup?.editedQue}
              title={quePopup?.title}
              handleOpenAddQuestion={handleOpenAddQuestion}
              suggestiveTypeData={categoryFormData?.suggestive}
              customTypeData={categoryFormData?.custom}
              eventFields={categoryFormData?.event_fields}
            />
          ) : (
            ""
          )}

          <Modal
            onBtnClick={() => setOpenPeview(false)}
            btnText="Proceed"
            open={openPreview}
            headerTitle="Form Preview"
            headerCls="px-6 py-2 border-b"
            onClose={() => {
              setOpenPeview(false);
            }}
          >
            {categoryFormData?.event_fields?.length ? (
              <FormPreview arr={categoryFormData?.event_fields} />
            ) : null}
            {categoryFields?.length ? (
              <FormPreview arr={categoryFields} />
            ) : null}
            {/* {categoryFields?.length ?
              categoryFields?.map(({ label }, index) => (
                <div key={name + index?.toString()}>
                  <div className="flex gap-2 p-3 items-center 2">
                    <div className="question grow">
                      <Input
                        inputCls="input w-full"
                        readOnly
                        placeholder={label}
                      />
                    </div>
                  </div>
                </div>
              )):null} */}
          </Modal>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default CategoryForm;
