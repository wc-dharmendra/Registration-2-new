import React, { Fragment, useRef, useEffect, useState, useCallback } from "react";
import Svg from "../../../public/Assets/Svg";
import ToggleButton from "../ToggleButton/ToggleButton";
import useEventStore from "@/Store/useEventStore";
import useEventEmailSettings from "@/CustomHook/useEventEmailSettings";
import Button from "../Button/Button";
import Utils from "@/Utils/Utils";
import Modal from "../Modal/Modal";
import EmailBuilder from "../EmailBuilder/EmailBuilder";
import GuestSelector from "../GuestSelector/GuestSelector";
import dynamic from "next/dynamic";
import Calender from "@/Components/Calender/Calender";
import TimePicker from "../TimePicker/TimePicker";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PostApiCall } from "@/Api/ApiCall";
import EndPoint from '@/Api/EndPoint';
import useCommonStore from "@/Store/useCommonStore";
import ShowToast from "@/Toaster/Toaster";

dayjs.extend(relativeTime);

const EmailEditor = dynamic(() => import('../Editor/QuillEditor/EmailEditor'), { ssr: false });

export const AddReminder = ({
  builderData = {}, setBuilderData = () => { }, isModalOpen,
}) => {
  const { event } = useEventStore();
  const { isLoading, setIsLoading } = useCommonStore();
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [time, setTime] = useState('00:00')
  const [reminderData, setReminderData] = useState({});

  const emailCreation = useCallback(() => {
    const payload = {
      activity: builderData?.mailerData?.activity,
      guest_statuses: builderData?.guest_statuses || [],
      starting_at: `${date} ${time}:00`,
      subject: `${event?.title} is starting ${dayjs(event?.start_date).from(date)}`,
      email_body: builderData?.content || ''
    }
    if (date && builderData?.guest_statuses?.length) {
      setIsLoading(true);
      PostApiCall(EndPoint?.createEmail(event?.id), payload, (cbData) => {
        if (cbData?.success) {
          setReminderData(cbData)
          setIsLoading(false)
        }
      }, (errData) => {
        console.log(errData)
        setIsLoading(false)
      })
    } else if (!builderData?.guest_statuses?.length) {
      ShowToast({ message: "Send to guest is required.", variant: "error" });
    }

  }, [builderData, date, time, event])
  // {console.log(event?.start_date, date )}
  // {console.log(`${date}T${time}:00`)}

  return (
    <div className="popup-content-wrapper overflow-auto">
      <div className="w-full pr-4 pb-5">
        <div className="reminderOut mb-4">
          <h5 className="text-[#595C5C] text-[14px] font-medium mb-1">When should the reminder go out?</h5>
          <div className="inline-block relative z-20 border-[1px] border-[#D4D4D4] rounded-md items-center">
            <div className="inline-block mail-date-picker border-r-[1px] border-r-[#D4D4D4]">

              <Calender
                min={builderData?.mailerData?.activity === 'reminder' ? dayjs().format('YYYY-MM-DD') : builderData?.mailerData?.activity === 'feedback' ? dayjs(event?.end_date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')}
                max={builderData?.mailerData?.activity === 'reminder' ? dayjs(event?.start_date).format('YYYY-MM-DD') : builderData?.mailerData?.activity === 'feedback' ? null : null}
                onDateChange={(e) => setDate(e?.target?.value)}
                value={date}
              />
            </div>
            <div className="mail-time-picker inline-block">
              <TimePicker
                onChange={(time) => { setTime(time) }}
                value={time}
              />
            </div>
          </div>
          {/* <span className="text-[#595C5C] text-[13px] font-normal block mt-1">Reminder will go:{dayjs(date).fromNow()}</span> */}


          <span className="text-[#595C5C] text-[13px] font-normal block mt-1">{dayjs(`${date}T${time}:00`).from(event?.start_date)} before event starts</span>

        </div>
        <div className="multiSelect mb-4">
          <h5 className="text-[#595C5C] text-[16px] mb-1 font-medium">Send to guests who are:</h5>
          <GuestSelector triggerAction={isModalOpen} onChange={(data) => {
            setBuilderData({
              ...builderData,
              guest_statuses: data
            })
          }} arr={builderData?.mailerData?.guest_statuses} />
        </div>
        <div className="reminderOut px-1">
          <div className="autoComplete boxShadow bg-[#fff] mt-2 px-[18px] py-[12px] rounded-[8px]">
            <EmailBuilder reminderDate={date} triggerAction={isModalOpen}>
              <EmailEditor value={builderData?.content} onChange={(e) => {
                setBuilderData({
                  ...builderData,
                  content: e
                })
              }} />
            </EmailBuilder>
          </div>
        </div>
      </div>
      <div className="popup-footer bg-[#FFFFFF] flex gap-5 p-4 items-center border-t-[1px] absolute bottom-0 left-0 w-full">
        <Button
          disabled={isLoading}
          showLoader={false}
          onClick={(e) => emailCreation()}
          className="flex items-center gap-2 btn-dark"
          type="button"
        >
          {Svg()?.Bell}{builderData?.btnText}
        </Button>
      </div>
    </div>
  );
};

const Emails = ({
  isOpen,
  setIsOpen,
  setIsModalOpen = () => { },
  setModalHeading,
  setBuilderData = () => { }
}) => {

  const { event, eventEmailSetting, emailConfig } = useEventStore();
  const { getEmailSettings, updateEmailSettings, configEmail } = useEventEmailSettings();

  const dropDownQuestionRef = useRef(null);
  const openDropQuestionRef = useRef(null);
  const [openDropQuestion, setOpenDropQuestion] = useState(false);

  const handleDropQuestion = () => {
    setOpenDropQuestion(!openDropQuestion);
  };

  const handleBuilderOpen = (title, activity = "reminder", btnText = "Create Reminder") => {
    const findSet = emailConfig?.event_emailers?.find((e) => e?.activity === activity) || {};
    setIsModalOpen(true);
    setModalHeading(title);
    setBuilderData({ title, content: "", mailerData: findSet, btnText });
  };

  useEffect(() => {
    Utils?.removeModal(dropDownQuestionRef, openDropQuestionRef, () => {
      setOpenDropQuestion(false);
    });
  }, [dropDownQuestionRef, openDropQuestionRef]);

  useEffect(() => {
    getEmailSettings();
    configEmail();
  }, []);

  return (
    <Fragment>
      <div className="pb-8">
        <div className="mt-5 mb-6">
          <h1 className="text-[#131517] text-[20px] font-semibold">
            Scheduled Emails
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <Button
            type="button"
            onClick={() => {
              handleBuilderOpen('Add New Reminder', "reminder", "Create Reminder");
            }}
            className="flex items-center border rounded-[10px] py-2 px-2.5 boxShadow gap-3">
            <div className="reminderSvg">{Svg()?.AddReminder}</div>
            <div className="reminderSvg">Add Reminder</div>
          </Button>
          <Button
            onClick={() => {
              handleBuilderOpen('Schedule Feedback Email', 'feedback', 'Schedule Feedback Email');
            }} type="button" className="flex items-center border rounded-[10px] py-2 px-2.5 boxShadow gap-3">
            <div className="reminderSvg">{Svg()?.AddFacebookEmail}</div>
            <div className="reminderSvg">Add Feedback Email</div>
          </Button>
          <Button type="button"
            onClick={() => {
              handleBuilderOpen('New Custom Email', 'custom', "Create Custom Email");
            }} className="flex items-center border rounded-[10px] py-2 px-2.5 boxShadow gap-3">
            <div className="reminderSvg">{Svg()?.AddCustomEmail}</div>
            <div className="reminderSvg">Add Custom Email</div>
          </Button>
        </div>

        <div className="bg-[#FFFFFF] rounded-lg border border-[#D9E2E5]">
          <div className="flex items-center justify-between flex-1 px-4 py-4 border-b border-slate-300">
            <div className="flex items-center gap-3">
              <div className="">{Svg()?.NewRegistration}</div>
              <div className="AcPassword">
                <h3 className="text-base font-medium text-[#131517]">
                  New Registration for {event?.title}
                </h3>
                <p className="text-[13px] font-normal color-[#595C5C]">
                  To: Going, Invited <span> · </span> Not Sent
                </p>
              </div>
            </div>
          </div>

          {eventEmailSetting?.length ? (
            <>
              {eventEmailSetting?.map((obj, index) => {
                return (
                  <Fragment key={index}>
                    <div className="flex items-center justify-between flex-1 px-4 py-4 border-b border-slate-300">
                      <div className="flex items-center">
                        <div className="mr-2">
                          {obj?.name === "reminder"
                            ? Svg()?.TimerIcon
                            : Svg()?.FeedbackEmail}
                        </div>
                        <div className="AcPassword">
                          <h3 className="text-base font-medium text-[#131517]">
                            {obj?.label ? obj?.label : ""}
                          </h3>
                          <p className="text-[13px] font-normal color-[#595C5C]">
                            To: Going, Invited <span> · </span> Not Sent
                          </p>
                          <Button type="button" className="text-[#0E94FF] text-sm underline">Resend Email</Button>
                        </div>
                      </div>
                      <ToggleButton
                        initialVal={obj?.value ? 1 : 0}
                        onChange={(val, cb) => {
                          updateEmailSettings(index, val, cb);
                        }}
                        large={true}
                      />
                    </div>
                  </Fragment>
                );
              })}
            </>
          ) : null}
        </div>


        {/* <div className="border-t  border-slate-300 mt-11">
          <div className="flex justify-between w-full mt-8">
            <div>
              <div className="text-[18px]  text-[Posts] font-medium">Posts</div>
            </div>
            <div className="AddHostInfo">
              <button
                type="submit"
                onClick={() => {
                  setIsOpen(true);
                }}
                className="bg-[#DFE0E1] text-[#595C5C] text-[14px] rounded-lg px-3 py-2 font-medium hover:bg-[#131517] hover:text-[#EFEFF0] flex gap-2 items-center"
              >
                {Svg().AddGrayIcon} New Post
              </button>
            </div>
          </div>
          <div className="bg-[#FFFFFF] rounded-lg border border-[#D9E2E5] mt-5">
            <div className="bg-[#EFEFF0] text-[14px] px-4 py-3 text-[#595C5C]">
              Sent to Going
            </div>
            <div className="">
              <div className="px-4 py-4 ">
                <div className="flex items-center justify-between flex-1 ">
                  <div className="flex-none sm:flex md:flex lg:flex items-center justify-between gap-3">
                    <div className="flex items-center flex-1">
                      <div className="mr-2">
                        <Button className="flex items-center justify-center bg-[#0E94FF] h-7 w-7 rounded-3xl text-sm text-white cursor-pointer">
                          DK
                        </Button>
                      </div>
                      <div className="AcPassword">
                        <h3 className="text-base font-medium">
                          Account Password
                        </h3>
                        <p className="text-sm color-[#595C5C] font-light">
                          Please follow the instructions in the email to finish
                          setting your password.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Button buttonRef={dropDownQuestionRef} type="button" className="flex" onClick={handleDropQuestion}>{Svg().DotsIcon}</Button>
                    {openDropQuestion ? (<div ref={openDropQuestionRef} className="absolute boxShadowBorder py-2 px-2 top-[10px] right-[-4px] z-10 mt-1 w-[120px] rounded-md bg-white focus:outline-none">
                      <ul className="cursor-pointer">
                        <Button type="button" className="w-full text-[#131517] text-sm flex gap-2 justify-start items-center rounded-sm p-1 font-medium fill-[#AFB0B0]">{Svg().Edit} Edit</Button>
                        <Button type="button" className="w-full text-[#131517] text-sm flex gap-2 justify-start items-center rounded-sm p-1 font-medium ">{Svg().Delete} Delete</Button>
                      </ul>
                      <div className="clipPath absolute top-[-5px] right-[10px] w-[10px] h-[5px] bg-[#FFFFFF]"></div>
                    </div>) : null}
                  </div>
                </div>

                <div className=" px-4 py-4 ">
                  <div className="mb-3 text-[#131517] text-[16px]">Welcome Everyone! To our event</div>
                  <div className="flex items-center gap-3">
                    <Button className="bg-[#EFEFF0] rounded-lg px-2 py-1.5">{Svg().HeartIcon}</Button>
                    <Button className="flex items-center gap-1 bg-[#EFEFF0] text-[#595C5C] text-[14px] rounded-lg px-3 py-1.5">{Svg().CommentIcon} Comments</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}


      </div>

      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        headerTitle="New Post"
        showBtn={false}
        ModalWrapperCls={"ModalBoxContainer ChooseImagePopup"}
        headerCls="px-6 py-2 border-b"
        headerMarginCls="py-1 block w-full"
      >
        <div className="w-full pt-4">
          <p className="text[14px] font-medium text[#595C5C]">Guests can find event posts on the event page. We’ll also send each guest an email.</p>
          <div className=""
          >
          </div>
          <div className="editorMsg">
            <p className="text[14px] font-semibold text[#595C5C]">Message</p>
            <EmailBuilder>
              <EmailEditor />
            </EmailBuilder>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <Button className='flex items-center gap-2 btn-dark' type='button'>{Svg()?.SendSvg} Send </Button>
            <Button type="button" className="bg-[#DFE0E1] text-[#595C5C] text-[14px] rounded-lg px-3 py-2 font-medium flex gap-2 items-center ">{Svg()?.TimerIcon} TimerIcon</Button>
            <Button type="button">Preview</Button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
export default Emails;
