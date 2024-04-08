import React, { useCallback, useEffect, useState } from "react";
import Svg from "../../../public/Assets/Svg";
import AddQuestion from "../AddQuestion/AddQuestion";
import Button from "../Button/Button";
import Input from "../InputForm/InputForm";
import ReOrder from "../ReOrder/ReOrder";
import Modal from "../Modal/Modal";
import { GetApiCall } from "@/Api/ApiCall";
import EndPoint from "@/Api/EndPoint";
import useEventStore from "@/Store/useEventStore";
import useCreateEvent from "@/CustomHook/useCreateEvent";
import FormPreview from "./FormPreview";
import SkeletonPreview from "../Skeleton/SkeletonPreview";
import useCommonStore from "@/Store/useCommonStore";

export const CustomisedEmail = () => {
  return (
    <div className="popup-content-wrapper overflow-auto">
      <div className="shadow-lg p-5 rounded-lg border-[1px]">
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
    <div className="flex gap-2 p-3 items-center 1">
      <div className="drag pr-1">{Svg().Drag}</div>
      <div className="question grow">
        <Input inputCls="input w-full" readOnly placeholder={label} />
      </div>
      <Button type="button">{Svg().Delete}</Button>
    </div>
  );
};

const Form = ({ setIsModalOpen }) => {
  const { event, setEventForm, eventForm, questions, setQuestions } =
    useEventStore();
  const {
    saveForm,
    editQuestion,
    handleDeleteQuestion,
    handleOrderChange,
    makeEmailUnique,
  } = useCreateEvent();
  const { isLoading, setIsLoading } = useCommonStore();

  const [openPreview, setOpenPeview] = useState(false);
  const [openAddQuestion, setOpenAddQuestion] = useState(false);

  const [quePopup, setQuePopup] = useState({
    title: "Add Questions",
    isEdit: false,
    editedQue: [],
  });
  const [mandatoryQuestions, setMandatoryQuestion] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const updateQuestion = () => {
    questions?.map((question) => {
      if (question?.options && Array.isArray(question?.options)) {
        question.options = question?.options?.filter((option) => option?.label);
      }
      return question;
    });
    questions?.filter(
      (question) => question?.options && question?.options?.length > 0
    );
    setQuestions([...questions]);
  };

  const handleOpenAddQuestion = useCallback(() => {
    setIsLoading(true);
    setOpenAddQuestion(!openAddQuestion);
    setQuePopup({ title: "Add Questions", isEdit: false });
    if (!openAddQuestion) {
      document.body.classList.add("overflow-hidden");
    } else {
      //   updateQuestion();
      document.body.classList.remove("overflow-hidden");
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [openAddQuestion, questions]);

  const onEdit = useCallback((data = []) => {
    setIsLoading(true);
    let q = mapQuestionFields(data[0]);
    setQuePopup({
      title: "Edit Question",
      isEdit: true,
      editedQue: [q],
    });
    setOpenAddQuestion(true);
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
        ? ques?.options.map((obj) => {
          return {
            label: obj.text,
          };
        })
        : [],
    };
    return obj;
  };

  const getEventForm = () => {
    setIsLoading(true);
    GetApiCall(
      EndPoint?.getForm(event?.id),
      (cbData) => {
        setIsLoading(false);
        if (cbData?.success) {
          setEventForm(cbData?.data?.response);
        }
      },
      () => {
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    //console.log("event form data : ", eventForm);
    if (eventForm?.fields?.length) {
      let mandatory = [];
      let custom_ques = [];
      eventForm?.fields?.map((e) => {
        if (e?.field_type === "default") {
          mandatory.push({
            ...e,
          });
        } else if (e?.field_type === "custom" || e?.field_type === "optional") {
          custom_ques.push({
            ...e,
          });
        }
      });
      setMandatoryQuestion(mandatory);
      setQuestions(custom_ques);
    }
  }, [eventForm]);

  useEffect(() => {
    getEventForm();
  }, []);

  return (
    <div className="pb-8">
      <div className="flex justify-between items-center 1">
        <h2 className="head">Required Questions</h2>
        <Button
          type="button"
          onClick={() => {
            setOpenPeview(true);
          }}
          className="flex items-center gap-2 btn-light text-sm py-1 max-sm:hidden stroke-[#595c5c] hover:stroke-[#fff]"
        >
          {Svg().QrCodeImg}Form Preview
        </Button>
      </div>
      <p>Fields currently present on the Registration form</p>
      <div className="border-b-[1px] pb-5 mt-5">
        {mandatoryQuestions?.length ? (
          mandatoryQuestions?.map(
            ({ id, name, label, required, unique }, index, arr) => {
              return (
                <div
                  className="flex items-center gap-2 justify-between mb-4"
                  key={id}
                >
                  <div className="flex items-center gap-2">
                    <h2 className="flex gap-2 items-center font-semibold text-[#131517] break-all">
                      <div className="w-5 text-center">
                        {Svg()?.[name?.includes("name") ? "Name" : "Email"]}
                      </div>
                      {label}
                    </h2>
                    {required ? (
                      <div className="bg-[#DFE0E1] text-[13px] text-[#969498] rounded-full px-2 py-0.5">
                        Required
                      </div>
                    ) : null}
                  </div>
                  {name === "email" ? (
                    <div className="py-1 flex items-center gap-2 font-medium">
                      <label>Unique</label>
                      <Input
                        wrapperCls="flex"
                        type={"checkbox"}
                        disabled={isLoading}
                        inputCls="w-5 h-5 accent-black cursor-pointer"
                        checked={unique}
                        onChange={(e) => {
                          arr[index]["unique"] = e?.target?.checked;
                          makeEmailUnique(arr[index], () => {
                            getEventForm();
                          });
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              );
            }
          )
        ) : isLoading && !mandatoryQuestions?.length ? (
          <SkeletonPreview />
        ) : null}
      </div>

      <div className="border-b-[1px] pb-8">
        <div className="flex justify-between items-center">
          <h2 className="head mt-4 mb-2">Add Questions</h2>
        </div>
        <p className="text-[#595C5C] text-sm">
          Feel free to include any extra questions you’d like to pose to our
          guests.{" "}
        </p>
        {/* {console.log(questions)} */}
        {questions?.length ? (
          <div className="bg-[#FFFFFF] border border-[#D9E2E5] px-4 py-2 rounded-lg mt-5">
            <ReOrder
              items={questions}
              keyId="id"
              label="label"
              onEdit={onEdit}
              handleDelete={(ques) => handleDeleteQuestion(ques)}
              onPosChange={handleOrderChange}
            />
          </div>
        ) : null}
        <Button
          onClick={handleOpenAddQuestion}
          className="flex items-center gap-2 btn-dark mt-6 fill-[#fff]"
          type="button"
        >
          {Svg()?.Edit}Add Questions
        </Button>
      </div>

      <div className="pb-0">
        <h2 className="head mt-5 mb-2">Registration Email</h2>
        <p className="text-[#595C5C] text-sm">
          Upon Registration, we dispatch a confirmation email that includes a
          calendar invitation to our guests.
        </p>
        {/* <Button className='flex items-center gap-2 btn-dark mt-4' type='button' onClick={openModal}>{Svg()?.CustomizeEmail}Customise Email</Button> */}
        <Button className='flex items-center gap-2 btn-dark mt-4' type='button' 
        onClick={openModal}
       >{Svg()?.ResendEmail}Customise Email</Button>
      </div>
      {openAddQuestion ? (
        <AddQuestion
          saveForm={saveForm}
          editQues={editQuestion}
          isEdit={quePopup?.isEdit}
          addedQue={questions}
          editedQue={quePopup?.editedQue}
          title={quePopup?.title}
          handleOpenAddQuestion={handleOpenAddQuestion}
          suggestiveTypeData={eventForm?.suggestive}
          customTypeData={eventForm?.custom}
        />
      ) : (
        ""
      )}
      <Modal
        btnText="Proceed"
        open={openPreview}
        headerTitle="Form Preview"
        headerCls="px-6 py-2 border-b"
        onClose={() => {
          setOpenPeview(false);
        }}
      >
        {" "}
        {eventForm?.fields?.length ? (
          <FormPreview arr={eventForm?.fields} />
        ) : null}
      </Modal>
    </div>
  );
};

export default Form;
