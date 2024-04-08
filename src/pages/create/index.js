import React, { Fragment, useEffect, useRef, useState } from "react";
import GlobalLayout from "@/Components/Layout/GlobalLayout";
import Svg from "../../../public/Assets/Svg";
import Utils from "@/Utils/Utils";
import MetaData from "@/Components/MetaData/MetaData";
import Input from "@/Components/InputForm/InputForm";
import Button from "@/Components/Button/Button";
import Header from "@/Components/Header/Header";
import Tabbing from "@/Components/Tabbing/Tabbing";
import useCreateEvent from "@/CustomHook/useCreateEvent";
import { Theme, LayOut } from "@/Components/Shared/Theme/Theme";
import CalendarInput from "@/Components/Calender/Calender";
import GoogleMapComponent from "@/Components/GoogleMap/GoogleMap";
import Modal from "@/Components/Modal/Modal";
import SearchBox from "@/Components/SearchBox/SearchBox";
import FileUploader from "@/Components/FileUploader/FileUploader";
import dayjs from "dayjs";
import TimePicker from "@/Components/TimePicker/TimePicker";
import { FontList } from "@/Utils/FontList";
import EndPoint from "@/Api/EndPoint";
import useEventStore from "@/Store/useEventStore";
import { GetApiCall } from "@/Api/ApiCall";
import UploadLoader from "@/Components/Loader/UploadLoader";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useCommonStore from "@/Store/useCommonStore";

const Create = () => {
  const {
    openProfile,
    currentTab,
    onTabChange,
    handleClickOpen,
    tabData,
    user,
    isClient,
    btnRef,
    modalRef,
    inputData,
    onChange,
    onCreateEvent,
    onAddCategory,
    openCatModal,
    setOpenCatModal,
    onCloseCatModal,
    isOpen,
    setIsOpen,
    isLoading,
    setInputData,
    timeZoneList,
    handleTimeZone,
    btnTimeRef,
    modalTimeRef,
    showTimeZone,
    setShowTimeZone,
    onChangeFile,
  } = useCreateEvent();

  const { setCreateEventSetting, createEventSetting } = useEventStore();
  const { timezones } = useCommonStore();

  const dropEventTypeRef = useRef(null);
  const openEventTypeRef = useRef(null);
  const [openEventType, setOpenEventType] = useState(false);

  const handleEventType = () => {
    setOpenEventType(!openEventType);
  };

  useEffect(() => {
    Utils?.removeModal(dropEventTypeRef, openEventTypeRef, () => {
      setOpenEventType(false);
    });
  }, [dropEventTypeRef, openEventTypeRef, openEventType, setOpenEventType]);

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
            url={inputData?.banner}
            setIsOpen={setIsOpen}
            onThemeChange={onChange}
            value={inputData?.theme}
          />
        );
    }
  };

  const [showDescription, setShowDescription] = useState(false);

  const [descriptionCount, setDescriptionCount] = useState(0);

  const handleDescriptionChange = (e) => {
    const description = e.target.value;
    setInputData({ ...inputData, description: [{ name: "Description", content: description, status: 1 }] });
    setDescriptionCount(description.length);
  };

  //   const handleTextareaInput = (event) => {
  //     const title = event.target.value;
  //     setInputData({ ...inputData, title })
  //     event.target.rows = 1;
  //     event.target.rows = Math.ceil(event.target.scrollHeight / 40);
  //   };

  useEffect(() => {
    GetApiCall(
      EndPoint?.createEventSetting,
      (cbData) => {
        if (cbData?.success) {
          setCreateEventSetting(cbData?.data?.response);
        }
      },
      () => { },
      false
    );
  }, []);

  return (
    <GlobalLayout pattern={inputData?.pattern} bg={inputData?.color}>
      {/* <Loader /> */}
      <div className="container xs:w-[100%] sm:w-[100%] md:w-[820px] lg:w-[820px] mx-auto">
        <Header />
      </div>
      <MetaData title="Create Event" />
      {isClient ? (
        <Fragment>
          <div className="container xs:w-[100%] sm:w-[100%] md:w-[820px] lg:w-[820px] mx-auto pb-8">
            <div className="bg-[#FAFAFA] rounded-lg boxShadow px-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="w-full">
                  <div className="py-1" role="none">
                    <div className="relative w-[250px] mb-3">
                      <Button
                        type="button"
                        buttonRef={btnRef}
                        onClick={handleClickOpen}
                        className="w-full cursor-pointer flex items-center flex-1 py-2 px-2 hover:bg-[#EBEBEB] focus:bg-[#EBEBEB] rounded-lg"
                      >
                        <div className="bg-gradient-to-r from-[#E0DEFA] from-0% via-[#D0DAFE] via-30% to-[#E0DEFA] to-90% mr-2 flex items-center justify-center h-7 w-7 rounded-md text-sm text-[#131517] font-medium cursor-pointer min-w-[28px] min-h-[28px] ">
                          {/* {isClient ? (
                            user?.avatar ? (
                              <img
                                src={user?.avatar}
                                className="w-7 h-7 object-cover object-center rounded-md"
                              />
                            ) : user?.short_name ? (
                              `${user?.short_name}`
                            ) : (
                              Svg().HostImg
                            )
                          ) : null} */}
                          {Svg().HostImg}
                        </div>
                        <div className="w-full relative text-left pr-6">
                          <p className="text-xs color-[#969498] font-extralight">
                            Hosted By
                          </p>
                          {isClient && user?.host_name ? (
                            <h3 className="text-sm font-medium break-all line-clamp-2">{` ${user?.host_name}`}</h3>
                          ) : null}
                          <div className="absolute right-2 top-[50%] translate-y-[-50%]">
                            {Svg().DownArrow}
                          </div>
                        </div>
                      </Button>

                      {openProfile && isClient ? (
                        <div
                          ref={modalRef}
                          className="box-shadow absolute top-[52px] left-0 z-10 w-[280px] origin-top-right rounded-md bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <form className="form w-full">
                            <div className="flex flex-col p-3">
                              <Input
                                val={user?.host_name}
                                placeholder="Name/Company name"
                                inputCls={"form-control mb-3 mt-1"}
                                label="Host Display Name"
                                name="host_name"
                                disabled={true}
                                readOnly={true}
                              />
                              {/* <input type='text' placeholder="something" className="border-[1px] border-[#ccc] outline-none" readOnly ></input> */}
                              <Input
                                val={user?.link}
                                placeholder="https://"
                                inputCls={`form-control ${Utils?.capitalizeFirstWord(user?.profile === "company" ? "website" : user?.profile) ? 'paddCustomLeft' : ''}`}
                                wrapperCls="relative"
                                name="link"
                                showIcon={true}
                                disabled={true}
                                readOnly={true}
                                iconName={Utils?.capitalizeFirstWord(user?.profile === "company" ? "website" : user?.profile)}
                              />
                            </div>
                          </form>
                        </div>
                      ) : null}
                    </div>
                    <form>
                      <div className="eventTextarea mb-3">
                        <textarea
                          maxLength={80}
                          value={inputData?.title}
                          autoFocus={true}
                          name="title"
                          placeholder="Event Name"
                          className={`input2 ${FontList?.find((e) => e?.name === inputData?.font)
                            ?.fontFamily?.className
                            }`}
                          onChange={onChange}
                        ></textarea>
                      </div>
                      <div className="relative textarea2" style={{ padding: '0 0 20px' }}>
                        <textarea
                          maxLength={3000}
                          name="description"
                          value={inputData?.description?.[0]?.content}
                          onChange={handleDescriptionChange}
                          rows="3"
                          className="textarea2"
                          placeholder="Enter Description" style={{ border: 0 }}>
                        </textarea>
                        <div className="progressbar flex justify-between absolute bottom-1 right-2 w-[95px]">
                          <CircularProgressbar
                            value={(descriptionCount / 3000) * 100}
                            text={`${descriptionCount}/${3000}`} // Display current character count / max characters
                            styles={buildStyles({
                              textSize: "0",
                              pathColor: `rgba(0,0,0,1)`,
                              textColor: "#555",
                            })}
                          />
                          <span className="bounded-input__character-count flex text-[#969498] text-[12px]">
                            {descriptionCount} \ 3000
                          </span>
                        </div>
                      </div>
                    </form>
                    <div className="flex flex-start gap-2 lg:gap-3.5 mt-3">
                      <div className="flex flex-col items-center  w-[40px] h-[40px]">
                        <div className="w-[40px] h-[40px] border border-[#EBECED] rounded-lg overflow-hidden">
                          <div className="bg-[#e6e7e7] text-[#afb0b0] text-[10px] w-full text-center">
                            {dayjs()?.format("MMM")}
                          </div>
                          <div className="text-[#969498] text-[14px] text-center">
                            {dayjs()?.format("DD")}
                          </div>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="bg-[#EFEFF0] w-full pt-1 rounded-lg">
                          <div className="flex justify-between items-baseline mb-1 px-3 gap-1">
                            <div className="text-[16px] text-[#131517] font-medium">
                              Start
                            </div>
                            <div className="flex items-center gap-0.5">
                              {isClient ? (
                                <Fragment>
                                  <CalendarInput
                                    name="start_date"
                                    onDateChange={onChange}
                                    value={inputData?.start_date}
                                  />
                                  <TimePicker
                                    value={inputData.start_time}
                                    onChange={(val) => {
                                      setInputData({
                                        ...inputData,
                                        start_time: val,
                                      });
                                    }}
                                  />
                                </Fragment>
                              ) : null}
                            </div>
                          </div>
                          <div className="flex justify-between items-baseline px-3">
                            <div className="text-[16px] text-[#131517] font-medium">
                              End
                            </div>
                            <div className="flex items-center gap-0.5">
                              {isClient ? (
                                <Fragment>
                                  <CalendarInput
                                    name="end_date"
                                    onDateChange={onChange}
                                    min={dayjs(inputData?.start_date).format(
                                      "YYYY-MM-DD"
                                    )}
                                    value={inputData?.end_date}
                                  />
                                  <TimePicker
                                    value={inputData?.end_time}
                                    onChange={(val) => {
                                      setInputData({
                                        ...inputData,
                                        end_time: val,
                                      });
                                    }}
                                  />
                                </Fragment>
                              ) : null}
                            </div>
                          </div>
                          <div className="border-t py-2 border-slate-300 mt-3 relative">
                            <Button
                              buttonRef={btnTimeRef}
                              type="button"
                              className="flex text-[13px] text-[#131517] items-center px-3"
                              onClick={handleTimeZone}
                            >
                              <div className="w-[95%] text-left flex items-center gap-1">
                                {Svg().Globe}{" "}
                                {timezones?.[inputData?.timezone]?.replace(
                                  /[()]/g,
                                  ""
                                )}{" "}
                              </div>
                              <span className="ml-2">
                                {Svg().TimeZoneArrow}
                              </span>
                            </Button>
                            {showTimeZone ? (
                              <div
                                ref={modalTimeRef}
                                className="timeZoneOptions boxShadow border absolute left-0 z-10 mt-3 w-full rounded-md bg-white focus:outline-none"
                              >
                                <SearchBox
                                  valueKey="value"
                                  name="timezone"
                                  onChange={onChange}
                                  value={inputData?.timezone}
                                  placeholder="Search"
                                  options={timeZoneList}
                                  handleTimeZone={handleTimeZone}
                                  inputCls="w-full border border-[#EBECED] text-sm focus:outline-none transition-all outline-none text-[#131517] h-8 rounded-t-lg pl-2"
                                  wrapperCls="relative mb-2 searchInput"
                                  icon={false}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-start gap-3.5 mt-8">
                      <div className="flex flex-col items-center border-[#EBECED] rounded-lg w-[40px] h-[40px]">
                        {Svg().LocationIcon}
                      </div>
                      <div className="w-full">
                        <GoogleMapComponent
                          inputData={inputData}
                          onMapChange={onChange}
                        />
                      </div>
                    </div>

                    <div className="relative mt-6 flex flex-col">
                      <label className="font-medium block relative mb-1 text-sm text-[#595C5C]">
                        Select Event Type
                      </label>
                      <Button
                        buttonRef={dropEventTypeRef}
                        onClick={handleEventType}
                        type={"button"}
                        className={`relative bg-[#F0F1F1] px-3 py-3 rounded-lg text-left  text-[14px] font-medium flex justify-between items-center ${inputData?.event_type
                          ? "text-[#131517]"
                          : "text-[#595C5C]"
                          }`}
                      >
                        {!inputData?.event_type ? (
                          <span className="flex gap-3 items-center pl-3">
                            <span className="rotate-90">|</span>Select
                            <span className="rotate-90">|</span>
                          </span>
                        ) : inputData?.event_type === "registration" ? (
                          "Registration Based"
                        ) : (
                          "Ticketing Based"
                        )}
                        <div className={`${openEventType ? "rotate-180" : ""}`}>
                          {Svg().DownArrow}
                        </div>
                      </Button>
                      {openEventType ? (
                        <div
                          ref={openEventTypeRef}
                          className="EventTypeInfo absolute top-[70px] z-[9] boxShadow shadow-md mt- w-[100%] origin-top-right rounded-md bg-white mt-2 ring-1 ring-black ring-opacity-5 focus:outline-none border-[1px] border-[#DFE0E1]"
                        >
                          <ul>
                            {createEventSetting?.theme_meta?.event_type
                              ?.length &&
                              createEventSetting?.theme_meta?.event_type?.map(
                                (e) => {
                                  return (
                                    <Button
                                      key={e?.label}
                                      type="button"
                                      className="block text-sm font-medium px-4 py-2 w-full text-left"
                                      onClick={() => {
                                        setInputData({
                                          ...inputData,
                                          event_type: e?.value,
                                        });
                                        setOpenEventType(false);
                                      }}
                                    >
                                      {e?.label}
                                    </Button>
                                  );
                                }
                              )}
                          </ul>
                          <div className="clipPath absolute top-[-7px] right-[10px] w-[10px] h-[5px] bg-[#DFE0E1]"></div>
                          <div className="clipPath absolute top-[-5px] right-[10px] w-[10px] h-[5px] bg-[#FFFFFF]"></div>
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-5 flex flex-col mb-2">
                      <label className="font-medium block relative mb-1 text-sm text-[#595C5C]">
                        Category Matrix
                      </label>
                      <div className="bg-[#F0F1F1] py-5 rounded-lg">
                        {isClient ? (
                          <div className="w-full">
                            <div className="max-h-[265px] overflow-y-auto px-4">
                              {inputData?.categories?.length
                                ? inputData?.categories?.map(
                                  ({ title, description, order }, index) => {
                                    return (
                                      <div
                                        key={title + index.toString()}
                                        className="bg-[#FFFFFF] border border-[#131517] rounded-lg w-full mb-2.5"
                                      >
                                        <div className="w-full relative px-3 py-2.5">
                                          <h3 className="text-sm font-semibold mb-1 text-[#131517] break-all">
                                            {title}
                                          </h3>
                                          <p className="text-xs color-[#595C5C] font-medium break-all">
                                            {description}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  }
                                )
                                : null}
                            </div>
                            <Button
                              type="button"
                              className="categoryAdding text-center cursor-pointer"
                              onClick={() => {
                                setOpenCatModal(true);
                                setShowDescription(false);
                              }}
                            >
                              {Svg().AddCagegoryIcon}
                            </Button>

                            {!inputData?.categories?.length ? (
                              <div className="text-[#131517] text-[16px] text-center font-medium">
                                Add Category
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    </div>


                  </div>
                </div>

                <div className="w-full">
                  <div className="mb-5">
                    <Tabbing
                      tabData={tabData}
                      tabHandler={(tab) => onTabChange(tab)}
                      containerWidth="xl:w-[100%]"
                    >
                      {switchTab(currentTab?.activeTab)}
                    </Tabbing>
                  </div>
                  {/* <div className="bg-[#EFEFF0] w-full rounded-lg py-2">
                                    <PatternColorAndFont inputData={inputData} onChange={onChange} />
                                </div> */}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="w-full mt-5">
                  <Button
                    disabled={isLoading}
                    type="button"
                    onClick={onCreateEvent}
                    className="buttonStyle w-full text-[14px] sm:text-[18px] md:text-[18px] lg:text-[18px]"
                  >
                    Create Event
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Modal
            onBtnClick={(e) => onAddCategory(e, () => {
              setShowDescription(false);
            })}
            open={openCatModal}
            onClose={() => {
              onCloseCatModal();
              setShowDescription(false);
            }}
            btnText="Create"
            title="New Category"
            icon="MatrixCatgory"
            iconCls="bg-[#EFEFEF] rounded-full p-2"
          >
            <div className="mb-3">
              <label className="font-medium text-[#595C5C] pb-1 text-sm sm:text-base md:text-base lg:text-sm mb-1 block">
                Category Name
              </label>
              <Input
                maxLength={40}
                autoFocus
                name="catName"
                onChange={onChange}
                val={inputData?.catName}
                inputCls="input p-3.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  bg-[#fff]"
                placeholder="Friends & Family"
              />
            </div>
            {!showDescription ? (
              <Button
                type="button"
                className="text-sm font-semibold text-[#969498]"
                onClick={() => setShowDescription(true)}
              >
                + Add Category Description
              </Button>
            ) : null}
            {showDescription ? (
              <div className="mb-2">
                <label className="font-medium text-[#595C5C] pb-1 text-sm sm:text-base md:text-base lg:text-sm block mb-1">
                  Description
                </label>
                <Input
                  maxLength={160}
                  name="catDes"
                  onChange={onChange}
                  val={inputData?.catDes}
                  inputCls="input block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                  placeholder="Friends & Family"
                />
              </div>
            ) : null}
          </Modal>
          <Modal
            open={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
            headerTitle="Choose Image"
            showBtn={false}
            ModalWrapperCls={"ModalBoxContainer ChooseImagePopup"}
            headerCls="px-6 py-3 grow text-center"
            headerMarginCls="mb-2 block w-full"
          >
            <div className="relative bg-[#EFEFF0] border border-dashed border-[#D4D4D4] p-7 rounded-lg text-center">
              {isLoading ? <UploadLoader /> : null}
              <p className="text-[#595C5C] text-base">
                Drag & drop or click here to upload.
              </p>
              <p className="text-[#969498] text-sm pb-0">
                Or choose an image below. The ideal aspect ration is 16:9
              </p>
              <FileUploader
                avatar={inputData?.banner}
                cb={(file) => {
                  onChangeFile(file);
                }}
                id="chooseImage"
                cls="absolute w-full h-full opacity-0 z-10 cursor-pointer overflow-hidden text-[0] left-0 top-0"
                imgCls="absolute w-full h-full overflow-hidden cursor-pointer hidden"
              />
            </div>
            {/* <SearchBox /> */}
          </Modal>
        </Fragment>
      ) : null}
    </GlobalLayout>
  );
};

export async function getServerSideProps(ctx) {
  const { query, req, res } = ctx;
  const token = Utils?.getCookie("accessToken", ctx)?.slice(1, -1);
  const eid = Utils?.getCookie("event_id", ctx)?.slice(1, -1);

  if (!token) {
    return {
      redirect: {
        destination: `/${process.env.NEXT_PUBLIC_BASE_URL}`,
        permanent: false,
      },
    };
  } else if (token && eid) {
    return {
      redirect: {
        destination: "/event",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default Create;
