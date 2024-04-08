import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Svg from "../../../public/Assets/Svg";
import Button from "@/Components/Button/Button";
import Modal from "../Modal/Modal";
import Input from "../InputForm/InputForm";
import Utils from "@/Utils/Utils";
import FileUploader from "../FileUploader/FileUploader";
import Tabbing from "../Tabbing/Tabbing";
import useCreateEvent from "@/CustomHook/useCreateEvent";
import { GeneralEvent, AdvanceEvent } from "@/Components/GeneralAdvance/GeneralAdvance";
import { SocialShare } from "../SocialShare/SocialShare";
import ToggleButton from "../ToggleButton/ToggleButton";
import useEventStore from "@/Store/useEventStore";
import { GetApiCall, PostApiCall } from "@/Api/ApiCall";
import EndPoint from "@/Api/EndPoint";
import useCommonStore from "@/Store/useCommonStore";
import ReqData from "@/Api/ReqData";
import UploadLoader from "../Loader/UploadLoader";
import useSettings from "@/CustomHook/useSettings";
import SearchableSelect from "@/Components/SearchableSelect/SearchableSelect";
import ShowToast from "@/Toaster/Toaster";
import Link from "next/link";
import SkeletonFrontendPreview from "../Skeleton/SkeletonFrontendPreview";

export const EditEventOverview = ({
  isCb = false,
}) => {
  const {
    currentTab,
    onTabChange,
    inputData,
    onChange,
    setInputData,
    onCreateEvent,
  } = useCreateEvent();

  const dataAsProps = {
    inputData,
    onChange,
    setInputData,
    onCreateEvent,
    onEventTabChange: onTabChange
  };

  useEffect(() => {
    if (isCb) {
      onTabChange({ activeTab: 0 })
    }
  }, [isCb]);

  const switchTab = (tab) => {
    switch (tab) {
      case 0: return <GeneralEvent {...dataAsProps} />;
      case 1: return <AdvanceEvent {...dataAsProps} />;
    }
  };

  return (
    <Tabbing
      tabData={['General', 'Advance']}
      tabHandler={(tab) => onTabChange(tab)}
      tabIndex={currentTab?.activeTab}
      containerWidth="xl:w-[100%]"
      containerPadding="px-0"
    >
      {switchTab(currentTab?.activeTab)}
    </Tabbing>
  );
};

const Overview = ({
  openAddHost = false,
  setOpenAddHost = () => { },
  openEditHost = false,
  setOpenEditHost = () => { },
  isClient = false,
  isOpen,
  setIsOpen,
  setIsModalOpen = () => { },
  setIsCb = () => { }
}) => {
  const [isHost, setIsHost] = useState(false);
  const [hostData, setHostData] = useState({
    name: "",
    email: "",
    roles: [],
    is_visible: 0,
  });
  const [isHostVisible, setIsHostVisible] = useState(false);

  const { event, setIsEditEvent, setEvent, isEventUpdated, setIsEventUpdated, setMapData } =
    useEventStore();
  const { isLoading, setIsLoading } = useCommonStore();
  const { onChangeFile, onChange, inputData, setInputData } = useCreateEvent();
  const { isFocused, setIsFocused } = useSettings();
  const [scale, setScale] = useState(1);
  const parentRef = useRef(null);

  const onUpdateHost = useCallback(() => {
    setIsLoading(true);
    PostApiCall(
      EndPoint?.hostVisibility(event?.id),
      { is_visible: isHostVisible ? "1" : "0" },
      async (cbData) => {
        setIsLoading(false);
        setIsHost(false);
        const response = await ReqData(EndPoint?.eventOverview(event?.id));
        const resData = await response?.json();
        if (resData?.success) {
          setEvent(resData?.data?.response);
        }
      },
      (errCb) => {
        setIsLoading(false);
      }
    );
  }, [isHostVisible]);

  const onHostVisibilityChange = (isVivisible) => {
    setIsHostVisible(isVivisible);
  };

  const showModal = (data) => {
    setIsHost(true);
    setHostData(data);
  };

  const onEditEvent = useCallback(() => {
    setIsModalOpen(true);
    setIsEditEvent(true);
    setIsCb(false);
  }, []);

  const getEvent = () => {
    GetApiCall(
      EndPoint?.eventOverview(event?.id),
      (cbData) => {
        if (cbData?.success) {
          const data = cbData?.data?.response;
          if (data?.id) {
            setInputData({
              ...inputData,
              email: data?.support_details?.email || "",
              country_code: data?.support_details?.country_code || "IN#91",
              phone: data?.support_details?.phone || "",
            });
            setEvent(data);
          }
        }
      },
      () => { },
      false
    );
  };

  const onUpdateSupport = useCallback((data, name) => {
    if (!data?.[name]) {
      ShowToast({
        message: `${Utils?.capitalizeFirstWord(name)} can't be blank`,
        variant: "error",
      });
    } else {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.supportDetail(event?.id),
        data,
        (cbData) => {
          setIsLoading(false);
          if (cbData?.success) {
            getEvent();
          }
        },
        () => {
          setIsLoading(false);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (event?.id) {
      setInputData({
        ...inputData,
        country_code: event?.support_details?.country_code || "IN#91",
        phone: event?.support_details?.phone || "",
        email: event?.support_details?.email || "",
      });
      setMapData({});
    }
  }, [event?.id]);

  useEffect(() => {
    // Access the width of the parent div using the ref
    if (parentRef?.current) {
      const parentWidth = parentRef?.current?.clientWidth;
      const childWidth = 1025;
      const newScale = parentWidth / childWidth;
      setScale(newScale);
    }
  }, []);

  return (
    <Fragment>
      <div className="pb-6">
        <div className="bg-[#FFFFFF] rounded-[10px] px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full relative">
              <div
                className="frontend-view relative pb-[100%] overflow-hidden mb-5 rounded-t-lg"
                ref={parentRef}
              >
                <SkeletonFrontendPreview />
                {isEventUpdated && event?.slug ? (
                  <iframe
                    title="Preview"
                    scrolling="no"
                    className="absolute left-0 top-0 rounded-lg overflow-hidden origin-top-left w-[1024px] pointer-events-none"
                    width={"100%"}
                    height={"1024px"}
                    style={{
                      overflow: "hidden",
                      transform: "scale(" + scale + ")",
                    }}
                    src={`${process.env.NEXT_PUBLIC_FRONT_API_URL}${event?.slug}`}
                  ></iframe>
                ) : null}

              </div>
              <div className="absolute top-0 left-0 w-full bg-[#0006] py-1 px-3 flex justify-between items-baseline rounded-t-[10px] z-10">
                <div className="flex items-center gap-2">
                  <div className="w-[40%]">
                    <Link
                      href={process.env.NEXT_PUBLIC_FRONT_API_URL + event?.slug}
                      target="_blank"
                      className="text-[#e0e0e0] hover:text-[#ffffff] text-[13px] line-clamp-1"
                    >
                      {process.env.NEXT_PUBLIC_FRONT_API_URL + event?.slug}
                    </Link>
                  </div>
                  <Link
                    href={process.env.NEXT_PUBLIC_FRONT_API_URL + event?.slug}
                    target="_blank"
                    className="text-[#e0e0e0] hover:text-[#ffffff] text-[13px] line-clamp-1"
                  >
                    {Svg().TimeZoneArrowWhite}
                  </Link>
                </div>
                <div className="">
                  <Button
                    type="button"
                    className="text-[#e0e0e0] hover:text-[#ffffff] text-[14px]"
                    onClick={() => {
                      Utils?.copyText(
                        `${process.env.NEXT_PUBLIC_FRONT_API_URL}${event?.slug}`
                      );
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between w-full pt-3">
                <div className="text-[#595C5C] text-[14px]">Share Event</div>
                <div className="inline-flex items-center gap-3">
                  {isClient ? (
                    <SocialShare
                      url={`${process.env.NEXT_PUBLIC_FRONT_API_URL}${event?.slug}`}
                      title={event?.title}
                      description={event?.description?.[0]?.content}
                    />
                  ) : null}
                </div>
              </div>
            </div>

            <div className="w-full relative border-t border-t-[1] pt-6    lg:border-t-[0] lg:pt-0 md:border-t-[0] md:pt-0">
              <h3 className="text-[#131517] text-[18px] font-semibold">
                When & Where
              </h3>
              <div className="flex flex-start gap-5 mt-5">
                <div className="flex flex-col items-center border border-[#EBECED] rounded w-[40px] h-[40px] overflow-hidden">
                  <div className="bg-[#e6e7e7] text-[#afb0b0] text-[10px] w-full text-center">
                    {Utils?.getFormattedDateTimeData(
                      event?.start_date,
                      event?.timezone,
                      "MMM"
                    )}
                  </div>
                  <div className="text-[#969498] text-[16px]">
                    {Utils?.getFormattedDateTimeData(
                      event?.start_date,
                      event?.timezone,
                      "DD"
                    )}
                  </div>
                </div>

                <div className="flex justify-between  items-center">
                  <div className="w-full relative">
                    <h3 className="text-[16px] font-semibold text-[#131517]">
                      {Utils?.getFormattedDateTimeData(
                        event?.start_date,
                        event?.timezone,
                        "YYYY-MM-DD"
                      ) !==
                        Utils?.getFormattedDateTimeData(
                          event?.end_date,
                          event?.timezone,
                          "YYYY-MM-DD"
                        )
                        ? `${Utils?.getFormattedDateTimeData(
                          event?.start_date,
                          event?.timezone,
                          "dddd"
                        )}, ${Utils?.getFormattedDateTimeData(
                          event?.start_date,
                          event?.timezone,
                          "D"
                        )} ${Utils?.getFormattedDateTimeData(
                          event?.start_date,
                          event?.timezone,
                          "MMMM"
                        )}`
                        : `${Utils?.getFormattedDateTimeData(
                          event?.start_date,
                          event?.timezone,
                          "dddd"
                        )}`}
                    </h3>
                    <div className="text-[14px] text-[#131517]">
                      {Utils?.getFormattedDateTimeData(
                        event?.start_date,
                        event?.timezone,
                        "YYYY-MM-DD"
                      ) !==
                        Utils?.getFormattedDateTimeData(
                          event?.end_date,
                          event?.timezone,
                          "YYYY-MM-DD"
                        )
                        ? `${Utils?.getFormattedDateTimeData(
                          event?.start_date,
                          event?.timezone,
                          "HH:mm"
                        )} to ${Utils?.getFormattedDateTimeData(
                          event?.end_date,
                          event?.timezone,
                          "D"
                        )} ${Utils?.getFormattedDateTimeData(
                          event?.end_date,
                          event?.timezone,
                          "MMM"
                        )}, ${Utils?.getFormattedDateTimeData(
                          event?.end_date,
                          event?.timezone,
                          "HH:mm [GMT]Z"
                        )}`
                        : `${Utils?.getFormattedDateTimeData(
                          event?.start_date,
                          event?.timezone,
                          "HH:mm"
                        )} - ${Utils?.getFormattedDateTimeData(
                          event?.end_date,
                          event?.timezone,
                          "HH:mm Z"
                        )}`}
                    </div>
                  </div>
                </div>
              </div>
              {event?.address ? (
                <div className="flex flex-start gap-5 mt-5">
                  <div className="flex flex-col items-center rounded w-[40px] h-[40px]">
                    {Svg().LocationIcon}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="w-full relative">
                      <h3 className="text-[16px] font-semibold text-[#131517]">
                        {event?.address}
                      </h3>
                      {event?.address_1 ? (
                        <div className="text-[14px] color-[#131517] max-h-32 overflow-auto break-all">
                          {event?.address_1}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="mt-5">
                <p className="text-[#131517] text-[14px]">
                  The address is shown publicly on the event page.
                </p>
              </div>
              <div className="sm:-inherit md:absolute lg:absolute  bottom-0 left-0 flex items-center justify-between w-full mt-5  xs:mt-5 sm:mt-5 md:mt-0 lg:mt-0">
                <Button
                  type="button"
                  onClick={onEditEvent}
                  className="bg-[#EFEFF0] text-[14px] text-[#595C5C] rounded-lg py-1 w-[48%] hover:bg-[#131517] hover:text-[#EFEFF0] font-semibold	"
                >
                  Edit Event
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  className="bg-[#EFEFF0] text-[14px] text-[#595C5C] rounded-lg py-1 w-[48%] hover:bg-[#131517] hover:text-[#EFEFF0] font-semibold"
                >
                  Change Photo
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="diviverLine">
          <div>
            <h2 className="font-semibold text-[18px] sm:text-[20px] md:text-[20px] lg:text-[20px] text-[#131517]">
              Support Details
            </h2>
            <p className="font-medium text-[#595C5C] text-sm sm:text-base md:text-base lg:text-base">
              Please provide support details that will be visible during the
              event.
            </p>
          </div>
          <div className="grid-none sm:grid md:grid lg:grid grid-cols-2 gap-16 mt-4">
            <div>
              <label
                htmlFor="whatsapp"
                className="font-medium text-[#595C5C] text-sm mb-3 block"
              >
                Whatsapp Number
              </label>
              <div className="flex flex-1 items-end gap-2">
                <div
                  className={`flex w-full border rounded-lg h-[40px] relative ${isFocused ? "border-[#000]" : "border-[#EBECED]"
                    }`}
                >
                  <SearchableSelect
                    name="country_code"
                    options={Utils?.countryCode}
                    onChange={onChange}
                    value={inputData?.country_code}
                    cls="border-r max-w-[90px] grow-0 shrink-0"
                  />
                  <Input
                    name="phone"
                    onChange={onChange}
                    val={inputData?.phone}
                    placeholder="982809820"
                    inputCls="w-full rounded-md h-[38px] px-2 focus:outline-none"
                    onFocus={() => setIsFocused(true)}
                    maxLength={15}
                    onBlur={() => setIsFocused(false)}
                  />
                </div>
                <Button
                  disabled={isLoading}
                  onClick={(e) =>
                    onUpdateSupport(
                      {
                        country_code: inputData?.country_code,
                        phone: inputData?.phone,
                      },
                      "phone"
                    )
                  }
                  showLoader={false}
                  type="button"
                  className="buttonStyle min-w-[80px]"
                >
                  Save
                </Button>
              </div>
            </div>
            <div>
              <div className="flex flex-1 flex-baseline items-end gap-2 w-full mt-4 md:mt-0 lg:mt-0 sm:mt-0">
                <Input
                  placeholder="Enter Email"
                  inputCls={"input"}
                  labelCls="font-medium text-[#595C5C] text-sm mb-3 block"
                  label="Email"
                  name="email"
                  val={inputData?.email}
                  onChange={onChange}
                />
                <Button
                  disabled={isLoading}
                  type="button"
                  onClick={(e) =>
                    onUpdateSupport({ email: inputData?.email }, "email")
                  }
                  showLoader={false}
                  className="buttonStyle min-w-[80px]"
                >
                  {" "}
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg pt-4">
          <div className="mt-3">
            <div className="flex justify-between w-full mt-2">
              <div>
                <div className="text-[18px] text-[#131517] font-semibold">
                  Hosts
                </div>
                <p className="sm:text-[14px] text-[16px] text-[#595C5C] font-medium mt-1">
                  Update visibility of the Host from the event.
                </p>
              </div>
            </div>
          </div>
        </div>

        {event?.hosts?.length &&
          event?.hosts?.map(
            ({
              name,
              roles,
              first_name,
              last_name,
              email,
              is_visible,
              avatar,
            }) => {
              return (
                <div className="pt-5" key={email}>
                  <div className="bg-[#FFFFFF] border border-[#D9E2E5] rounded-lg flex justify-between sm:items-center w-full px-5 py-3 gap-2">
                    <div className="flex item-center gap-3 items-center flex-col lg:flex-row md:flex-row">
                      <div className="flex item-center gap-3 items-center">
                        <button className="Profile  bg-[#0E94FF] h-7 w-7 rounded-3xl  text-white cursor-pointer">
                          <span className=" h-7 w-7 text-sm font-medium flex items-center justify-center">
                            {avatar ? (
                              <img
                                className="w-7 h-7 object-cover object-center rounded-full"
                                src={avatar}
                                width={21}
                                height={21}
                                alt="Avatar icon"
                                title="avatar"
                              />
                            ) : (
                              `${first_name?.[0] + last_name?.[0]}`
                            )}
                          </span>
                        </button>
                        <div className="block flex-wrap gap-0 flex-col lg:gap-3 md:gap-3 lg:flex-row md:flex-row lg:flex md:flex">
                          <h2 className="text-[#131517] text-[16px] font-semibold">
                            {name}
                          </h2>
                          <p className="text-[#595c5c82] text-[16px]">
                            {email}
                          </p>
                          <span className="bg-[#EFEFF0] text-[#4EC881] text-[13px] px-3 py-1 rounded-full inline-block mt-2 md:mt-0 lg:mt-0">
                            {roles?.toString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button
                        type="button"
                        onClick={() =>
                          showModal({
                            first_name,
                            last_name,
                            roles,
                            name,
                            email,
                            is_visible,
                            avatar,
                          })
                        }
                      >
                        {Svg().PencilIcon}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }
          )}
      </div>

      <Modal
        open={openAddHost}
        onClose={() => {
          setOpenAddHost(false);
        }}
        headerTitle="Add Host"
        icon=""
        showBtn={false}
      >
        <p className="text-sm">
          Add a host to highlight them on the event page or to get help managing
          the event.
        </p>
        <div className="flex items-end gap-2 mt-3">
          <Input autoFocus name="email" inputCls="input" label="Email" />
          <Button type="button" className="btn-dark">
            Continue
          </Button>
        </div>
      </Modal>
      <Modal
        subchildren={
          <Fragment>
            <div className="mr-2 flex items-center justify-center bg-[#0E94FF] h-7 w-7 rounded-3xl text-sm text-white cursor-pointer min-w-[28px] min-h-[28px]">
              {Utils?.grabFirstTwoLetters(`${"first_name"} ${"last_name"}`)}
            </div>
            <div className="w-full relative text-left">
              <h3 className="text-sm font-medium">{`${"first"} ${"name"}`}</h3>
            </div>
          </Fragment>
        }
        icon="TechSupportIcon"
        btnText="Update Host"
        open={openEditHost}
        onClose={() => {
          setOpenEditHost(false);
        }}
        title="Update Host"
      >
        <p className="text-sm">Update visibility of the Host from the event.</p>
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
          <p className="text-[#969498] pb-0 text-sm">
            Or choose an image below. The ideal aspect ration is 16:9
          </p>

          <FileUploader
            avatar={inputData?.banner}
            cb={(file) => {
              onChangeFile(file, (data) => {
                // setIsEventUpdated(false);
                setIsOpen(false);
                setIsEventUpdated(true);
              });
            }}
            id="chooseImage"
            cls="absolute w-full h-full opacity-0 z-10 cursor-pointer overflow-hidden text-[0] left-0 top-0"
            imgCls="absolute w-full h-full overflow-hidden cursor-pointer hidden"
          />
        </div>
        {/* <SearchBox /> */}
      </Modal>
      <Modal
        open={isHost}
        onClose={() => {
          setIsHost(false);
        }}
        title="Update Host"
        icon="UpdateHost"
        showBtn={false}
        subchildren={
          <button
            disabled={isLoading}
            onClick={onUpdateHost}
            type="submit"
            className="bg-[#333537] text-[#FFFFFF] py-3 px-3 text-[14px] sm:text-[16px] md:text-[16px] lg:text-[16px] rounded-lg mt-5 w-full "
          >
            Update Host
          </button>
        }
      >
        <p className="text-[#969498] text-[14px]">
          Update the visibility of the host, from the event page.
        </p>
        <div className="flex items-center flex-1 mt-3 mb-4">
          <div className="mr-2">
            <Button className="flex items-center justify-center bg-[#0E94FF] h-7 w-7 rounded-3xl text-sm text-white cursor-pointer">
              {hostData?.avatar ? (
                <img
                  className="w-7 h-7 object-cover object-center rounded-full"
                  src={hostData?.avatar}
                  width={21}
                  height={21}
                  alt="Avatar icon"
                  title="avatar"
                />
              ) : (
                hostData?.first_name?.[0] + hostData?.last_name?.[0]
              )}
              {/* {`${hostData?.first_name?.[0] + hostData?.last_name?.[0]}`} */}
            </Button>
          </div>
          <div className="AcPassword">
            <h3 className="text-base font-medium text-[#131517]">
              {" "}
              {hostData?.name}{" "}
            </h3>
            <p className="text-sm color-[#595C5C] font-light">
              {" "}
              {hostData?.email?.toLowerCase()}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between flex-1">
          <div className="text-[#131517] text-[16px] font-medium">
            Show on Event Page
          </div>
          <div className="flex">
            <ToggleButton
              onChange={onHostVisibilityChange}
              large={true}
              initialVal={hostData?.is_visible}
            />
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
export default Overview;
