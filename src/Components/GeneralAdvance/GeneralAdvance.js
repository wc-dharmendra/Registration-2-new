import React, { useCallback, useEffect, useState } from "react";
import Button from "@/Components/Button/Button";
import Svg from "../../../public/Assets/Svg";
import dayjs from "dayjs";
import Modal from "../Modal/Modal";
import Input from "../InputForm/InputForm";
import Utils from "@/Utils/Utils";
import FileUploader from "../FileUploader/FileUploader";
import Tabbing from "../Tabbing/Tabbing";
import useCreateEvent from "@/CustomHook/useCreateEvent";
import { Theme, LayOut } from "@/Components/Shared/Theme/Theme";
import Calender from "@/Components/Calender/Calender";
import TimePicker from "../TimePicker/TimePicker";
import useEventStore from "@/Store/useEventStore";
import useCommonStore from "@/Store/useCommonStore";
import GoogleMapComponent from "@/Components/GoogleMap/GoogleMap";
import ShowToast from "@/Toaster/Toaster";
import Editor from "../Editor/Editor";


const GeneralEvent = ({
  inputData,
  onChange,
  setInputData,
  onCreateEvent,
  onEventTabChange
}) => {
  const {
    currentTab,
    onTabChange,
    tabData,
    setIsOpen,
    isOpen,
    btnRef,
    modalRef,
    openProfile,
    handleClickOpen
  } = useCreateEvent();

  const { event, isEditEvent, createEventSetting } = useEventStore();
  const { isLoading } = useCommonStore();

  useEffect(() => {
    if (isEditEvent) {
      setInputData({
        event_id: event?.id || "",
        title: event?.title || "",
        description: event?.description || "",
        start_date: event?.start_date
          // ? dayjs(event?.start_date)?.format("YYYY-MM-DD")
          ? Utils?.getFormattedDateTimeData(event?.start_date, event?.timezone, "YYYY-MM-DD")
          : dayjs()?.format("YYYY-MM-DD"),
        end_date: event?.end_date
          // ? dayjs(event?.end_date)?.format("YYYY-MM-DD")
          ? Utils?.getFormattedDateTimeData(event?.end_date, event?.timezone, "YYYY-MM-DD")
          : dayjs()?.format("YYYY-MM-DD"),
        start_time: event?.start_date
          // ? dayjs(event?.start_date)?.format("HH:mm")
          ? Utils?.getFormattedDateTimeData(event?.start_date, event?.timezone, "HH:mm")
          : "00:00",
        end_time: event?.end_date
          // ? dayjs(event?.end_date)?.format("HH:mm")
          ? Utils?.getFormattedDateTimeData(event?.end_date, event?.timezone, "HH:mm")
          : "00:30",
        location: event?.location || "",
        timezone: event?.timezone || "Asia/Kolkata",
        map_data: event?.map_data || {},
        address: event?.address || "",
        address_1: event?.address_1 || "",
        event_type: event?.event_type || "",
        categories: event?.categories || [],
        pattern: event?.pattern || "Cross",
        color: event?.color || "#e8e8e8",
        font: event?.font || "inter",
        layout: event?.layout || "Top/Bottom",
        theme: event?.theme || "minimal",
        catName: "",
        catDes: "",
        banner: event?.banner || "",
        country_code: event?.support_details?.country_code || 'IN#91',
        phone: event?.support_details?.phone || '',
        email: event?.support_details?.email || '',
      });
      onTabChange({ activeTab: 0 });
    }
  }, [isEditEvent]);

  const switchTab = (tab) => {
    switch (tab) {
      case 0:
        return (
          <LayOut
            inputData={inputData}
            url={inputData?.banner}
            setIsOpen={setIsOpen}
            onLayoutChange={onChange}
            value={inputData?.layout}
          />
        );
      case 1:
        return (
          <Theme
            inputData={inputData}
            setIsOpen={setIsOpen}
            onThemeChange={onChange}
            value={inputData?.theme}
          />
        );
    }
  };

  return (
    <div className="popup-evemt-wrapper overflow-auto p-1 pr-5">
      <h2 className="font-semibold mb-5 text-[18px] text-[#131517]">
        Basic Info
      </h2>
      <div className="w-full">
        <Input
          name="title"
          inputCls="form-control text-[16px] font-medium"
          placeholder=""
          val={inputData?.title}
          onChange={onChange}
        />
      </div>
      {/* <div className="w-full mt-1">
        <div className="flex items-center justify-between mb-1">
          <div className="text-[#595C5C] text-[14px] font-medium">
            Description
          </div>
        </div>
        <textarea
          maxLength={1000}
          value={inputData?.description}
          name="description"
          onChange={onChange}
          className="form-control h-[88px]"
          placeholder="Who should come? What’s the event about"
        ></textarea>
      </div> */}

      <div className="relative mt-1 flex flex-col mb-3">
        <label className="font-medium block relative mb-1 text-sm text-[#595C5C]">
          Event Type
        </label>
        <Button buttonRef={btnRef} onClick={handleClickOpen} type={'button'} className={`relative bg-[#fff] border px-3 py-3 rounded-lg text-left  text-[14px] font-medium flex justify-between items-center ${(inputData?.event_type) ? 'text-[#131517]' : 'text-[#595C5C]'}`}>{!(inputData?.event_type) ? '-- Select --' : (inputData?.event_type === 'registration') ? 'Registration Based' : 'Ticketing Based'}<div className={`${openProfile ? 'rotate-180' : ''}`}>{Svg().DownArrow}</div></Button>
        {openProfile ? <div ref={modalRef} className="EventTypeInfo absolute top-[70px] z-[9] boxShadow shadow-md mt- w-[100%] origin-top-right rounded-md bg-white mt-2 ring-1 ring-black ring-opacity-5 focus:outline-none border-[1px] border-[#DFE0E1]">
          <ul>
            {createEventSetting?.theme_meta?.event_type?.length && createEventSetting?.theme_meta?.event_type?.map((e) => {
              return (
                <Button key={e?.label} type="button" className="block text-sm font-medium px-4 py-2 w-full text-left" onClick={() => { setInputData({ ...inputData, event_type: e?.value }); handleClickOpen() }}>{e?.label}</Button>
              )
            })}
          </ul>
          <div className="clipPath absolute top-[-7px] right-[10px] w-[10px] h-[5px] bg-[#DFE0E1]"></div>
          <div className="clipPath absolute top-[-5px] right-[10px] w-[10px] h-[5px] bg-[#FFFFFF]"></div>
        </div> : null}
      </div>

      <div className="w-full">
        <div className="AppearanceTheme">
          <h2 className="font-semibold mb-4 text-[18px] text-[#131517]">
            Appearance
          </h2>
          <Tabbing
            tabData={tabData}
            tabHandler={(tab) => onTabChange(tab)}
            tabIndex={currentTab?.activeTab}
            containerWidth="xl:w-[100%]"
            containerPadding="px-0"
          >
            {switchTab(currentTab?.activeTab)}
          </Tabbing>
        </div>
      </div>
      {/* <div className="w-full mt-5 mb-6">
          <div className="bg-[#FFFFFF] border border-[#DDDFDF] w-full rounded-lg py-2">
            <PatternColorAndFont inputData={inputData} onChange={onChange} />
          </div>
        </div> */}

      <div className="w-full mt-3">
        <div className="AppearanceTheme pb-5">
          <h2 className="font-semibold mb-4 text-[18px] text-[#131517]">Time</h2>
          <div className="TimeEditEvent border rounded-lg inline-block">
            <div className="px-3 pt-4 pb-4 border-b-[1px]">
              {/* <div className="flex justify-between items-center gap-2">
                  
                  {(Utils?.getFormattedDateTimeData(event?.start_date, event?.timezone, "YYYY-MM-DD") !== Utils?.getFormattedDateTimeData(event?.end_date, event?.timezone, "YYYY-MM-DD")) ? 
                  
                  : null}
                </div> */}
              <div className="flex items-center gap-8 max-sm:gap-4 text-left">
                <div className=" w-[100px]">
                  <Calender
                    preVal={Utils?.getFormattedDateTimeData(event?.start_date, event?.timezone, "YYYY-MM-DD")}
                    name="start_date"
                    editEvent={true}
                    value={inputData?.start_date}
                    onDateChange={onChange}
                    disabled={Utils?.isPastDate(event?.start_date)}
                  />
                  <TimePicker
                    value={inputData?.start_time}
                    onChange={(val) => {
                      setInputData({
                        ...inputData,
                        start_time: val,
                      });
                    }}
                    editEvent={true}
                    disabled={Utils?.isPastDate(event?.start_date)}
                  />
                </div>

                <div className="self-end relative bottom-1">{Svg().EditCalendarIcon}</div>
                <div className=" w-[100px]">
                  <Calender
                    preVal={Utils?.getFormattedDateTimeData(event?.end_date, event?.timezone, "YYYY-MM-DD")}
                    name="end_date"
                    editEvent={true}
                    value={inputData?.end_date}
                    onDateChange={onChange}
                  // disabled={Utils?.isPastDate(event?.end_date) }
                  />
                  <TimePicker
                    value={inputData?.end_time}
                    onChange={(val) => {
                      setInputData({
                        ...inputData,
                        end_time: val,
                      });
                    }}
                    editEvent={true}
                  // disabled={Utils?.isPastDate(event?.end_date)}
                  />
                </div>
              </div>
            </div>
            <div className="text-[#595C5C] text-sm font-medium flex gap-1 items-center px-3 py-2">
              {Svg().Globe}
              {inputData?.timezone}{" "}
            </div>
          </div>
        </div>
      </div>

      <h2 className="font-medium mb-2 text-[14px] text-[#595C5C]">
        Location
      </h2>
      <div className="flex flex-start gap-3.5">
        <div className="flex flex-col items-center border-[#EBECED] rounded-lg w-[40px] h-[40px]">
          {Svg()?.LocationIcon}
        </div>
        <div className="w-full">
          <GoogleMapComponent
            inputData={inputData}
            onMapChange={onChange}
          />
        </div>
      </div>
      <div className="popup-footer bg-[#FFFFFF] flex gap-5 p-4 items-center border-t-[1px] absolute bottom-0 left-0 w-full">
        <Button
          disabled={isLoading}
          onClick={(e) => onCreateEvent(e, "updateEvent", false, () => {
            if (onEventTabChange) onEventTabChange({ activeTab: 0 })
          })}
          className="flex items-center gap-2 btn-dark"
          type="button"
        >
          {Svg()?.CheckCircleIcon}Update Event
        </Button>
      </div>

      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        headerTitle="Choose Image"
        showBtn={false}
        ModalWrapperCls={"ModalBoxContainer ChooseImagePopup"}
        headerCls="px-6 py-3 grow text-center"
        headerMarginCls='mb-2 block w-full'
      >
        <div className="relative bg-[#EFEFF0] border border-dashed border-[#D4D4D4] p-7 rounded-lg text-center">
          <p className="text-[#595C5C] text-base">
            Drag & drop or click here to upload.
          </p>
          <p className="text-[#969498] text-sm pb-0">
            Or choose an image below. The ideal aspect ration is 16:9
          </p>
          <FileUploader
            avatar={inputData?.banner}
            id="chooseImage"
            cls="absolute w-full h-full opacity-0 z-10 cursor-pointer overflow-hidden text-[0] left-0 top-0"
            imgCls="absolute w-full h-full overflow-hidden cursor-pointer hidden"
          />
        </div>
        {/* <SearchBox /> */}
      </Modal>
    </div>
  )
}
const AdvanceEvent = ({
  inputData,
  setInputData,
  onCreateEvent,
  onEventTabChange
}) => {

  const { isLoading } = useCommonStore();
  const [isDeleted, setIseleted] = useState(false);

  const addTabs = useCallback(() => {
    const shouldAdd = inputData?.description?.filter((e) => !e?.name?.trim() || !e?.content?.trim());
    if (!shouldAdd?.length) {
      setInputData({
        ...inputData,
        description: [...inputData?.description, { name: "", content: "", status: 0 }]
      });
      setTimeout(() => {
        const element = document.getElementById(`tab${inputData?.description?.length}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
      }, 300);
    } else {
      ShowToast({ message: "Please provide tab name and tab description.", variant: "info" });
    }
  }, [inputData]);

  return (
    <div className="popup-evemt-wrapper">
      <div className="flex items-center mb-5 justify-between pl-1 pr-5">
        <h3 className="text-[#131517] font-semibold text-[18px]">Total {inputData?.description?.length} Tab{inputData?.description?.length > 1 ? "s" : null}</h3>
        <Button onClick={addTabs} type="button" className="buttonStyle">Add Tab</Button>
      </div>
      
      <div className="overflow-auto description-tabs-wrapper pr-5 pl-1 pb-6">
        {
          inputData?.description?.length ?
            inputData?.description?.map((e, i, arr) => {
              return (
                !isDeleted ? <Editor key={`tab${i}`} i={i} e={e} arr={arr} setInputData={setInputData} inputData={inputData} setIseleted={setIseleted} /> : null
              )
            })
            : null
        }
      </div>
      <div className="popup-footer bg-[#FFFFFF] flex gap-5 p-4 items-center border-t-[1px] absolute justify-between bottom-0 left-0 w-full">
        <Button
          disabled={isLoading}
          onClick={(e) => onCreateEvent(e, "updateEvent", false, () => {
            if (onEventTabChange) onEventTabChange({ activeTab: 0 })
          })}
          className="flex items-center gap-2 btn-dark"
          type="button"
        >
          {Svg()?.CheckCircleIcon} Update Event
        </Button>
      </div>
    </div>
  )
}
export { GeneralEvent, AdvanceEvent };