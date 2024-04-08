import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Utils from "@/Utils/Utils";
import Svg from "../../../public/Assets/Svg";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Input from "../InputForm/InputForm";
import useCategoryMatrixStore from "@/Store/useCategoryMatrixStore";
import FileUploader from "../FileUploader/FileUploader";
import useCategoryMatrix from "@/CustomHook/useCategoryMatrix";
import { CSVLink } from "react-csv";
import ShowToast from "@/Toaster/Toaster";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useCommonStore from "@/Store/useCommonStore";
import ToggleButton from "../ToggleButton/ToggleButton";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import useEventStore from "@/Store/useEventStore";
import { downloadBadge } from "@/Api/OnDataSend";
import EndPoint from "@/Api/EndPoint";
import { PostApiCall } from "@/Api/ApiCall";

dayjs.extend(relativeTime);


export const GuestInformation = ({ guestData = {} }) => {

  const { event } = useEventStore();
  const { setIsLoading, isLoading } = useCommonStore();
  const {
    acceptInvite,
    rejectInvite,
    fetchCategoryGuestList
  } = useCategoryMatrix();

  const onDownloadBadge = useCallback(async () => {
    setIsLoading(true);
    const objData = await downloadBadge(
      EndPoint?.downloadTicket, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event_id: guestData?.event_id,
        action: "e-ticket",
        action_id: guestData?.unique_code,
      }),
    })
    setIsLoading(false);
  
    if (objData?.status === 200) {
      const blob = await objData?.blob();
      Utils?.downloadFileByBlob(blob, "badge-image");
    }


  }, [guestData]);

  const onResendEmail = useCallback(async () => {
    setIsLoading(true);
    PostApiCall(EndPoint?.resendEmail(guestData?.event_id),
      {
        category: guestData?.event_category_id,
        guest: guestData?.id,
        action: "Registration Email"
      }, (cbData) => {
        setIsLoading(false);
      }, (errData) => {
        setIsLoading(false);
      });

  }, [guestData]);

  return (
    <div className="popup-content-wrapper overflow-auto">
      <div className="w-full">
        <div className="flex justify-between p-3 pl-0 gap-2 items-center border-b-[1px] max-md:flex-col max-md:items-start">
          <div className="flex gap-3 items-center flex-wrap">
            <div className="bg-[#595C5C] h-7 w-7 flex items-center justify-center text-sm text-white font-medium rounded-full">{!guestData?.first_name && !guestData?.last_name && guestData?.email ? guestData?.email?.charAt(0)?.toUpperCase() : (guestData?.first_name ? guestData?.first_name?.charAt(0) : '') + (guestData?.last_name ? guestData?.last_name?.charAt(0) : '')}</div>
            <Button type="button" className="flex gap-0 items-start flex-col">
              <span className="text-[#131517] font-medium">{(guestData?.first_name ? guestData?.first_name : '') + ' ' + (guestData?.last_name ? guestData?.last_name : '')}</span>
              <span className="text-[#595C5C] font-medium text-sm">{guestData?.email}</span>
            </Button>
          </div>
          {guestData?.require_approval === 1 && guestData?.is_invited == 0 && guestData?.status == 3 ? <div className="flex gap-3 items-center flex-wrap ">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={() => {
                  acceptInvite(guest?.id, () => {
                    fetchCategoryGuestList({
                      page_type: guestData?.pageType,
                      filters: "all",
                      sort_by: "first_name",
                      search_from: "",
                    });
                  });
                }}
                className="text-[#37A353] text-[15px] flex items-center gap-1 font-medium">
                {Svg().AcceptIcon} Accept
              </Button>
              <Button
                type="button"
                onClick={() => {
                  rejectInvite(guest?.id, () => {
                    fetchCategoryGuestList({
                      page_type: guestData?.pageType,
                      filters: "all",
                      sort_by: "first_name",
                      search_from: "",
                    });
                  });
                }}
                className="text-[#DE3C34] text-[15px] flex items-center gap-1 font-medium">
                {Svg().RejectIcon} Reject
              </Button>
            </div>
          </div> : null}
        </div>
        <div className="DetailInfo py-4">
          <ul>
            <li className={`inline-block ${guestData?.phone ? 'border-r border-[#DFE0E1]' : ''} pr-6`}>
              <p className="text-[#131517] text-[16px] font-semibold">Registered</p>
              <span className="text-[#131517] text-[14px] font-normal">
                {/* 12 Jan, 21:30 GMT+5:30  */}
                {Utils?.getFormattedDateTimeData(guestData?.created_at, event?.timezone, "DD MMM, HH:mm Z")}
              </span>

            </li>
            {guestData?.phone ? <li className="inline-block  px-6">
              <p className="text-[#131517] text-[16px] font-semibold">Phone</p>
              <span className="text-[#131517] text-[14px] font-normal">{(guestData?.phone && guestData?.country_code ? guestData?.country_code : '') + guestData?.phone ? guestData?.phone : ''}</span>
            </li> : null}
          </ul>
        </div>
      </div>
      <div className="popup-footer bg-[#FFFFFF] flex gap-5 p-4 items-center border-t-[1px] absolute bottom-0 left-0 w-full">
        {guestData?.unique_code ? <Button
          disabled={isLoading}
          showLoader={false}
          className="flex items-center gap-2 btn-dark"
          type="button"
          onClick={onDownloadBadge}
        >
          {Svg()?.DownloadWhite}
          Download Badge
        </Button> : null}
        <Button
          disabled={isLoading}
          showLoader={false}
          className="flex items-center gap-2 btn-dark"
          type="button"
          onClick={onResendEmail}
        >
          {Svg()?.ResendEmail}
          Resend Email
        </Button>
      </div>
    </div>
  );
};



const Guests = ({
  setIsModalOpen = () => { },
  setGuestData = () => { },
}) => {
  const dropDownCategoryRef = useRef(null);
  const openDropCategoryRef = useRef(null);
  const dropDownGuestRef = useRef(null);
  const openDropGuestRef = useRef(null);
  const [openDropCategory, setOpenDropCategory] = useState(false);
  const [openDropGuest, setOpenDropGuest] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenColumn, setIsOpenColumn] = useState(false);

  const [includedArr, setIncludedArr] = useState(["Title"]);
  const {
    fetchCategoryGuestList,
    sendInvite,
    downloadSampleCSV,
    acceptInvite,
    rejectInvite,
    downloadGuestsData,
  } = useCategoryMatrix();
  const [selectedDate, setSelectedDate] = useState("");
  const [isExpand, setIsExpand] = useState(false);
  const [isTypeSearch, setIsTypeSearch] = useState(false);
  const min = "2023-01-01";

  const {
    selectedCategory,
    guestsList,
    guestCount,
    categoryFormData,
    categoryFields,
  } = useCategoryMatrixStore();
  const { isLoading, setIsLoading } = useCommonStore();

  const [guests, setGuests] = useState([]);

  const [filterParam, setFilterParam] = useState("All Guest");
  const [sortParam, setSortParam] = useState("Name");
  const [filteredBy, setFilteredBy] = useState("all");
  const [sortedBy, setSortedBy] = useState("first_name");
  const [searchParam, setSearchParam] = useState("");

  const [invite_emails, setInviteEmails] = useState("");
  const [guestDetails, setGuestDetails] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [isNext, setIsNext] = useState(false);

  const [subCatArr, setSubCatArr] = useState([]);
  const [registerToggle, setRegisterToggle] = useState(false);

  const createHeaders = () => {
    let arr = [...categoryFormData?.event_fields, ...categoryFields];
    let temp = [];
    for (let i = 0; i < arr?.length; i++) {
      let obj = {
        label: arr[i]?.label,
        key: arr[i]?.name,
      };
      temp.push(obj);
    }
    temp.push({ label: "Status", key: "status" });
    temp.push({ label: "Registered Date", key: "created_at" });
    temp.push({ label: "Sub-Category Name", key: "event_title" });
    setHeaders(temp);
  };

  const handleInviteSubcatChange = (id, val) => {
    setSubCatArr((current) =>
      current.map((obj) =>
        obj?.id === id
          ? {
            ...obj,
            isChecked: val,
          }
          : obj
      )
    );
  };

  const resetInviteSubcat = () => {
    setSubCatArr((current) =>
      current.map((obj) => ({ ...obj, isChecked: false }))
    );
  };

  const handleRegisterToggleChange = (val) => {
    setRegisterToggle(val);
  };

  const handleDownload = () => {
    let arr = [];
    for (let i = 0; i < guestDetails?.length; i++) {
      arr[i] = { ...guestDetails[i] };
      arr[i]["status"] = guestStatus(guestDetails[i]);
      arr[i]["created_at"] = dayjs(guestDetails[i]?.created_at).format(
        "DD MMM YYYY"
      );
    }
    setGuestDetails(arr);
  };

  const showErrorToast = (message) => ShowToast({ message, variant: "error" });

  const addEmail = () => {
    if (invite_emails?.length > 0) {
      let valid = true;
      if (!invite_emails || !Utils?.isValidEmail(invite_emails)) {
        valid = false;
      }
      if (valid) {
        let checkedSubcat = [];
        for (let i = 0; i < subCatArr?.length; i++) {
          if (subCatArr[i]?.isChecked) {
            checkedSubcat.push(subCatArr[i]?.id);
          }
        }
        let body = {
          email: invite_emails,
          category: checkedSubcat,
        };
        sendInvite(body, false, () => {
          onCloseInviteModel();
          fetchCategoryGuestList({
            page_type: "landing",
            filters: filteredBy ? filteredBy : "all",
            sort_by: sortedBy ? sortedBy : "first_name",
            search_from: searchParam,
          });
          resetInviteSubcat();
        });
      } else {
        showErrorToast("Invalid Email format");
      }
    }
  };

  const handleCSVFiles = async (files) => {
    if (files?.size) {
      let formData = new FormData();
      formData.append("is_direct", registerToggle ? 1 : 0);
      formData.append("file", files);
      sendInvite(formData, true, () => {
        onCloseInviteModel();
        fetchCategoryGuestList({
          page_type: "landing",
          filters: filteredBy ? filteredBy : "all",
          sort_by: sortedBy ? sortedBy : "first_name",
          search_from: searchParam,
        });
      });
    }
  };

  const statusBarProgress = (status) => {
    let val = 0;
    if (guestCount[status] != null) {
      if (status === "Going") {
        if (guestCount["Total Capacity"] > 0) {
          val = (guestCount[status] / guestCount["Total Capacity"]) * 100;
        } else {
          let perc = Math.floor(guestCount[status] / 100) * 10;
          let rem_perc = (guestCount[status] % 100) / 10;
          let total_percent = perc + rem_perc;
          val = total_percent >= 80 ? 80 : total_percent;
        }
      } else {
        let t =
          guestCount["Going"] +
          guestCount["Invited"] +
          guestCount["Approval Pending"] +
          guestCount["Not Going"];
        val = (guestCount[status] / t) * 100;
      }
    }
    return val;
  };

  const handleDropCategory = () => {
    setOpenDropCategory(!openDropCategory);
  };

  const onCloseInviteModel = () => {
    setInviteEmails("");
    setIsOpen(false);
  };

  const handleDropGuest = () => {
    setOpenDropGuest(!openDropGuest);
  };

  const handleItemClickGuest = (item, pageview = "landing") => {
    let body = {
      page_type: pageview,
      filters: "all",
      sort_by: sortedBy ? sortedBy : "first_name",
      search_from: "",
    };

    if (item.includes("All Guest")) {
      body["filters"] = "all";
      fetchCategoryGuestList(body, () => {
        setFilteredBy("all");
        setFilterParam(item);
        handleDropGuest();
      });
    } else if (item.includes("Not Going")) {
      body["filters"] = "2";
      fetchCategoryGuestList(body, () => {
        setFilteredBy("2");
        setFilterParam(item);
        handleDropGuest();
      });
    } else if (item.includes("Invited")) {
      body["filters"] = "999";
      fetchCategoryGuestList(body, () => {
        setFilteredBy("999");
        setFilterParam(item);
        handleDropGuest();
      });
    } else if (item.includes("Going")) {
      body["filters"] = "1";
      fetchCategoryGuestList(body, () => {
        setFilteredBy("1");
        setFilterParam(item);
        handleDropGuest();
      });
    }
  };

  const handleItemClickCategory = (item, pageview = "landing") => {
    let body = {
      page_type: pageview,
      filters: filteredBy ? filteredBy : "all",
      sort_by: "first_name",
      search_from: "",
    };
    if (item === "Name") {
      body["sort_by"] = "first_name";
      fetchCategoryGuestList(body, () => {
        setSortedBy("first_name");
        setSortParam(item);
        handleDropCategory();
      });
    } else if (item.includes("Email")) {
      body["sort_by"] = "email";
      fetchCategoryGuestList(body, () => {
        setSortedBy("email");
        setSortParam(item);
        handleDropCategory();
      });
    } else if (item.includes("Approval Status")) {
      body["sort_by"] = "status";
      fetchCategoryGuestList(body, () => {
        setSortedBy("status");
        setSortParam(item);
        handleDropCategory();
      });
    } else if (item.includes("Register Time")) {
      body["sort_by"] = "created_at";
      fetchCategoryGuestList(body, () => {
        setSortedBy("created_at");
        setSortParam(item);
        handleDropCategory();
      });
    }
  };

  const guestStatus = (guest) => {
    const { is_invited, status } = guest;
    if (is_invited == 1 && status == 0) {
      return "Invited";
    } else if (status == 1) {
      return "Going";
    } else if (status == 2) {
      return "Not Going";
    } else if (is_invited == 0 && status == 3) {
      return "Approval Pending";
    } else if (status == 0) {
      return "Not Going";
    }
  };

  useEffect(() => {
    setGuests(guestsList);
  }, [guestsList]);

  useEffect(() => {
    if (!isTypeSearch && searchParam?.length >= 1) {
      setIsTypeSearch(true);
    }
    if (isTypeSearch) {
      let body = {
        page_type: "landing",
        filters: filteredBy ? filteredBy : "all",
        sort_by: sortedBy ? sortedBy : "first_name",
        search_from: searchParam,
      };
      const delayFn = setTimeout(() => {
        fetchCategoryGuestList(body, () => { });
      }, 500);
      return () => clearTimeout(delayFn);
    }
  }, [searchParam]);

  useEffect(() => {
    Utils?.removeModal(dropDownCategoryRef, openDropCategoryRef, () => {
      setOpenDropCategory(false);
    });
    Utils?.removeModal(dropDownGuestRef, openDropGuestRef, () => {
      setOpenDropGuest(false);
    });
  }, [
    dropDownCategoryRef,
    openDropCategoryRef,
    dropDownGuestRef,
    openDropGuestRef,
  ]);

  useEffect(() => {
    fetchCategoryGuestList({
      page_type: "landing",
      filters: "all",
      sort_by: "first_name",
      search_from: "",
    });
    let arr = [];
    for (let i = 0; i < selectedCategory?.subcategory?.length; i++) {
      arr.push({
        id: selectedCategory?.subcategory[i]?.id,
        isChecked: false,
        title: selectedCategory?.subcategory[i]?.title,
      });
    }
    setSubCatArr(arr);
    downloadGuestsData(setGuestDetails);
    createHeaders();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? <Loader theme={true} /> : null}
      <div className="flex justify-between items-center mb-5 mt-4 max-md:gap-3">
        <h2 className="head">At a Glance</h2>
        <Button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 btn-light text-sm py-1 h-[30px]"
        >
          {Svg()?.PlusIcon} Invite Guest
        </Button>
      </div>
      <div className="flex justify-between mb-2">
        <p>
          <span className="text-[22px] mr-1">
            {guestCount["Going"] ? guestCount["Going"] : 0}
          </span>{" "}
          guests going
        </p>
        <p className="text-[#969498]">
          Cap
          <span className="inline-block text-[22px] ml-1">
            {guestCount["Total Capacity"] &&
              guestCount["Total Capacity"] == -1 ? (
              <img
                alt="infinite"
                title="infinite"
                src="../Assets/Images/infinite.png"
                style={{
                  position: "relative",
                  left: "3px",
                  top: "10px",
                  display: "flex",
                }}
              />
            ) : (
              guestCount["Total Capacity"]
            )}
          </span>
        </p>
      </div>

      <div className="guest-analyst-bar bg-[#DFE0E1] rounded h-2 flex items-stretch overflow-hidden mb-3">
        <div
          className={`bg-[#37A353]`}
          style={{ width: `${statusBarProgress("Going")}%` }}
        ></div>
      </div>

      <div className="flex justify-between mb-2">
        <p>Other Details</p>
      </div>

      <div className="guest-analyst-bar bg-[#DFE0E1] rounded h-2 flex items-stretch overflow-hidden mb-3">
        {/* <div className="bg-[#37A353] w-[15%]"></div> */}
        <div
          className={`bg-[#F9BC34]`}
          style={{ width: `${statusBarProgress("Approval Pending")}%` }}
        ></div>
        <div
          className={`bg-[#0E94FF]`}
          style={{ width: `${statusBarProgress("Invited")}%` }}
        ></div>
        <div
          className={`bg-[#DE3C34]`}
          style={{ width: `${statusBarProgress("Not Going")}%` }}
        ></div>
      </div>
      <div className="flex gap-3 max-md:flex-col max-md:gap-1">
        {/* <div className="flex gap-2 items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#37A353]"></div>
          <p className="text-[#37A353] text-sm">{guestCount["Going"]} Going</p>
        </div> */}
        <div className="flex gap-2 items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F9BC34]"></div>
          <p className="text-[#F9BC34] text-sm">
            {guestCount["Approval Pending"]} Approval Pending
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0E94FF]"></div>
          <p className="text-[#0E94FF] text-sm">
            {guestCount?.Invited} Invited
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#DE3C34]"></div>
          <p className="text-[#DE3C34] text-sm">
            {guestCount["Not Going"]} Not Going
          </p>
        </div>
      </div>
      <div className="border-t-[1px] mt-8 pt-5 pb-2">
        <div className="flex justify-between items-center mb-5 mt-4">
          <h2 className="head">Guest List</h2>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex items-center gap-2 btn-light text-sm py-1 max-sm:h-[30px] stroke-[#131517] w-8 md:w-10 justify-center"
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              <CSVLink
                data={guestDetails}
                headers={headers}
                filename={"guest-details.csv"}
                onClick={() => {
                  handleDownload();
                }}
              >
                {Svg().Download}
              </CSVLink>
            </button>

            <button
              type="button"
              className="flex items-center gap-2 btn-light text-sm py-1 max-sm:h-[30px] stroke-[#131517] w-8 md:w-10 justify-center"
              style={{ paddingLeft: 0, paddingRight: 0 }}
              disabled={isLoading}
              onClick={() => {
                setSearchParam('');
                setIsExpand(true);
                fetchCategoryGuestList({
                  page_type: "full-page",
                  filters: filteredBy ? filteredBy : "all",
                  sort_by: sortedBy ? sortedBy : "first_name",
                  search_from: searchParam,
                });
              }}
            >
              {Svg().FullView}
            </button>
          </div>
        </div>
        <p className="mb-2">
          View Guests on the event page -{" "}
          <span className="text-[#0E94FF]">Hide</span>
        </p>

        <Input
          name="search_from"
          onChange={(e) => setSearchParam(e?.target?.value)}
          val={searchParam}
          inputCls="input p-3.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  bg-[#fff]"
          placeholder="Search"
        />
        <div className="flex justify-between items-center mt-3 mb-3">
          <div className="relative">
            <Button
              buttonRef={dropDownGuestRef}
              type={"button"}
              className="text-sm btn-light justify-between flex items-center gap-3 stroke-[#595C5C] h-[30px] hover:stroke-white hover:fill-white"
              onClick={handleDropGuest}
            >
              {Svg().Filter}
              {filterParam}
              {Svg().SingleSelect}
            </Button>
            {openDropGuest ? (
              <div
                ref={openDropGuestRef}
                className="boxShadow border p-1 absolute left-0 z-10 mt-3 w-[150px] rounded-md bg-white focus:outline-none"
              >
                <ul className="cursor-pointer">
                  {[
                    `All Guest (${guestCount?.Going +
                      guestCount["Not Going"] +
                      guestCount?.Invited
                      ? guestCount?.Going +
                      guestCount["Not Going"] +
                      guestCount?.Invited
                      : 0
                    })`,
                    `Going (${guestCount?.Going ? guestCount?.Going : 0})`,
                    `Invited (${guestCount["Invited"] ? guestCount["Invited"] : 0
                    })`,
                    `Not Going (${guestCount["Not Going"] ? guestCount["Not Going"] : 0
                    })`,
                  ].map((item) => (
                    <li
                      key={item}
                      className={`text-[#131517] text-sm flex gap-2 justify-between items-center rounded-sm hover:bg-[#DFE0E1] p-1 font-medium stroke-[#131517] `}
                      onClick={() => {
                        !isLoading ? handleItemClickGuest(item) : null;
                      }}
                    >
                      {item}{" "}
                      {includedArr?.includes(item) ? Svg().Checkbox : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="relative">
            <Button
              buttonRef={dropDownCategoryRef}
              type={"button"}
              className="text-sm btn-light justify-between flex items-center gap-2 stroke-[#595C5C] h-[30px] hover:stroke-white hover:fill-white"
              onClick={handleDropCategory}
            >
              {Svg().LongText}
              {sortParam}
              {Svg().SingleSelect}
            </Button>
            {openDropCategory ? (
              <div
                ref={openDropCategoryRef}
                className="boxShadow border p-1 absolute left-0 z-10 mt-3 w-[150px] rounded-md bg-white focus:outline-none"
              >
                <ul className="cursor-pointer">
                  {["Name", "Email", "Approval Status", "Register Time"].map(
                    (item) => (
                      <li
                        key={item}
                        className={`text-[#131517] text-sm flex gap-2 justify-between items-center rounded-sm hover:bg-[#DFE0E1] p-1 font-medium stroke-[#131517] `}
                        onClick={() => {
                          !isLoading ? handleItemClickCategory(item) : null;
                        }}
                      >
                        {item}{" "}
                        {includedArr?.includes(item) ? Svg().Checkbox : null}
                      </li>
                    )
                  )}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
        {guests?.length ?
          <div className="bg-white border rounded-md overflow-hidden">
            {guests?.map((guest) => {
              return (
                <Fragment key={guest?.id}>
                  <div className="flex justify-between p-3 gap-2 items-center border-b-[1px] max-md:flex-col max-md:items-start">
                    <div className="flex gap-3 items-center flex-wrap">
                      <div className="bg-[#595C5C] h-7 w-7 flex items-center justify-center text-sm text-white font-medium rounded-full">
                        {guest?.first_name
                          ? `${guest?.first_name?.charAt(0)?.toUpperCase()}`
                          : ""}
                        {guest?.last_name
                          ? `${guest?.last_name?.charAt(0)?.toUpperCase()}`
                          : ""}
                        {!guest?.first_name && !guest?.last_name && guest?.email
                          ? `${guest?.email?.charAt(0)?.toUpperCase()}`
                          : ""}
                      </div>
                      <Button type="button" className="flex gap-3 items-center" onClick={() => {
                        setIsModalOpen(true);
                        setGuestData({ ...guest, ...selectedCategory, pageType: "landing" });
                      }}>
                        <span className="text-[#131517] font-medium">
                          {guest?.first_name ? `${guest?.first_name} ` : ""}
                          {guest?.last_name ? `${guest?.last_name}` : ""}
                        </span>
                        <span className="text-[#595C5C] font-medium text-sm">
                          {guest?.email}
                        </span>
                      </Button>
                    </div>
                    <div className="flex gap-3 items-center flex-wrap ">
                      {selectedCategory?.require_approval === 1 &&
                        guestStatus(guest) === "Approval Pending" ? (
                        <div className="flex items-center gap-3">
                          <Button
                            className="text-[#37A353] text-[15px] flex items-center gap-1 font-medium"
                            type="button"
                            onClick={() => {
                              acceptInvite(guest?.id, () => {
                                fetchCategoryGuestList({
                                  page_type: "landing",
                                  filters: filteredBy ? filteredBy : "all",
                                  sort_by: sortedBy ? sortedBy : "first_name",
                                  search_from: searchParam,
                                });
                              });
                            }}
                          >
                            {Svg().AcceptIcon} Accept
                          </Button>
                          <Button
                            className="text-[#DE3C34] text-[15px] flex items-center gap-1 font-medium"
                            type="button"
                            onClick={() => {
                              rejectInvite(guest?.id, () => {
                                fetchCategoryGuestList({
                                  page_type: "landing",
                                  filters: filteredBy ? filteredBy : "all",
                                  sort_by: sortedBy ? sortedBy : "first_name",
                                  search_from: searchParam,
                                });
                              });
                            }}
                          >
                            {Svg().RejectIcon} Reject
                          </Button>
                        </div>
                      ) : (
                        guestStatus(guest) ? <div
                          className={`bg-[#37a35330] flex items-center justify-center w-[75px] text-sm text-[#595C5C] font-medium rounded-full px-22 py-[3px] ${guest?.status == 1 ? "goingBg" : "invitedBg"
                            }`}
                        >
                          {guestStatus(guest)}
                        </div> : null
                      )}

                      <p className="text-sm font-medium text-[#595C5C]">
                        {guest?.created_at
                          ? dayjs(guest?.created_at).format("DD MMM YYYY")
                          : ""}
                      </p>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div> : null
        }
      </div>

      {isExpand ? (
        <div className="expand-view fixed top-0 left-0 h-full z-10 bg-white w-full pt-2 overflow-auto">
          <div className="flex items-center gap-3 px-3 lg:px-8">
            <div
              className="rotate-180 cursor-pointer"
              onClick={() => {
                setIsExpand(false);
                fetchCategoryGuestList({
                  page_type: "landing",
                  filters: filteredBy ? filteredBy : "all",
                  sort_by: sortedBy ? sortedBy : "first_name",
                  search_from: searchParam,
                });
              }}
            >
              {Svg().RightArrow}
            </div>
            <p className="text-lg font-semibold text-[#131517]">Event Name</p>
          </div>
          {/* <div className="flex items-center gap-2 mt-3 mb-3 pl-3">
            <div className="relative">
              <Button
                buttonRef={dropDownGuestRef}
                type={"button"}
                className="text-sm btn-light justify-between flex items-center gap-3 stroke-[#595C5C] h-[30px] hover:stroke-white hover:fill-white"
                onClick={handleDropGuest}
              >
                {Svg().Filter}
                {filterParam}
                {Svg().SingleSelect}
              </Button>
              {openDropGuest ? (
                <div
                  ref={openDropGuestRef}
                  className="boxShadow border p-1 absolute left-0 z-10 mt-3 w-[150px] rounded-md bg-white focus:outline-none"
                >
                  <ul className="cursor-pointer">
                    {[
                      `All Guest (${guestCount?.Going +
                        guestCount["Not Going"] +
                        guestCount?.Invited
                        ? guestCount?.Going +
                        guestCount["Not Going"] +
                        guestCount?.Invited
                        : 0
                      })`,
                      `Going (${guestCount?.Going ? guestCount?.Going : 0})`,
                      `Invited (${guestCount["Invited"] ? guestCount["Invited"] : 0
                      })`,
                      `Not Going (${guestCount["Not Going"] ? guestCount["Not Going"] : 0
                      })`,
                    ].map((item) => (
                      <li
                        key={item}
                        className={`text-[#131517] text-sm flex gap-2 justify-between items-center rounded-sm hover:bg-[#DFE0E1] p-1 font-medium stroke-[#131517] `}
                        onClick={() => {
                          !isLoading
                            ? handleItemClickGuest(item, "full-page")
                            : null;
                        }}
                      >
                        {item}{" "}
                        {includedArr?.includes(item) ? Svg().Checkbox : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="relative">
              <Button
                buttonRef={dropDownCategoryRef}
                type={"button"}
                className="text-sm btn-light justify-between flex items-center gap-5 stroke-[#595C5C] h-[30px] hover:stroke-white hover:fill-white"
                onClick={handleDropCategory}
              >
                {Svg().LongText}
                {sortParam}
                {Svg().SingleSelect}
              </Button>
              {openDropCategory ? (
                <div
                  ref={openDropCategoryRef}
                  className="boxShadow border p-1 absolute left-0 z-10 mt-3 w-[150px] rounded-md bg-white focus:outline-none"
                >
                  <ul className="cursor-pointer">
                    {["Name", "Email", "Approval Status", "Register Time"].map(
                      (item) => (
                        <li
                          key={item}
                          className={`text-[#131517] text-sm flex gap-2 justify-between items-center rounded-sm hover:bg-[#DFE0E1] p-1 font-medium stroke-[#131517] `}
                          onClick={() => {
                            !isLoading
                              ? handleItemClickCategory(item, "full-page")
                              : null;
                          }}
                        >
                          {item}{" "}
                          {includedArr?.includes(item) ? Svg().Checkbox : null}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ) : null}
            </div>
          </div> */}
          <div className="flex justify-between items-center gap-2 mt-3 mb-3 px-3 lg:px-8">
            <div className="leftArea w-full">
              {/* <SearchBox onChange={(e) => setSearchParam(e?.target?.value)}
                value={searchParam} placeholder="Search by name or email" inputCls="pl-10 SearchInputBox pr-10 w-full py-2.5" /> */}
              <div className="relative mt-4 mb-5 searchInput">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none searchIconFiels">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <Input
                  name="search_from"
                  onChange={(e) => setSearchParam(e?.target?.value)}
                  val={searchParam}
                  inputCls="pl-10 SearchInputBox pr-10 w-full py-2.5"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="rightArea w-full text-right flex gap-4 items-center justify-end">
              <button
                type={"button"}
                className="text-sm btn-light justify-between flex items-center gap-2 h-[30px] stroke-[#595c5c] hover:stroke-[#fff]"
              >
                <CSVLink
                  data={guestDetails}
                  headers={headers}
                  filename={"guest-details.csv"}
                  onClick={() => {
                    handleDownload();
                  }}
                >
                  {Svg().Download}
                </CSVLink>

              </button>
              {/* <Button
                type={"button"}
                onClick={() => setIsOpenFilter(true)}
                className="text-sm btn-light justify-between flex items-center gap-2 h-[30px] fill-[#595c5c] hover:fill-[#fff]"
              >
                {Svg().Filter}
                Filter
              </Button> */}
              {/* <Button
                type={"button"}
                onClick={() => setIsOpenColumn(true)}
                className="text-sm btn-light justify-between flex items-center gap-2 h-[30px] fill-[#595c5c] stroke-[#595c5c] hover:fill-[#fff]"
              >
                {Svg().ColumnIcon}
                Column

              </Button> */}
            </div>
          </div>
          <div className="table-wrapper resposive-table overflow-auto">
            <table className="border-collapse border w-full min-w-[800px]">
              <thead>
                <tr>
                  <th className="border bg-[#EFEFF0] text-sm font-medium text-[#131517] p-3 text-left">
                    Guest
                  </th>
                  <th className="border bg-[#EFEFF0] text-sm font-medium text-[#131517] p-3 text-left">
                    Status
                  </th>
                  <th className="border bg-[#EFEFF0] text-sm font-medium text-[#131517] p-3 text-left">
                    Registered
                  </th>
                  {/* <th className="border bg-[#EFEFF0] text-sm font-medium text-[#131517] p-3 text-left">
                    Age
                  </th>
                  <th className="border bg-[#EFEFF0] text-sm font-medium text-[#131517] p-3 text-left">
                    Kids Name
                  </th> */}
                  {headers?.length &&
                    headers?.map((item, ind) =>
                      [
                        "first_name",
                        "last_name",
                        "email",
                        "status",
                        "created_at",
                      ].includes(item?.key) ? null : (
                        <th key={ind} className="border bg-[#EFEFF0] text-sm font-medium text-[#131517] p-3 text-left">
                          {item?.label}
                        </th>
                      )
                    )}
                </tr>
              </thead>
              <tbody>
                {guests?.length ? guests?.map((guest) => {
                  return (
                    <tr key={guest?.id}>
                      <td className="border p-3 text-left">
                        <div className="flex gap-2 items-center flex-wrap">
                          <div className="QQQQ bg-[#595C5C] h-7 w-7 flex items-center justify-center text-sm text-white font-medium rounded-full">
                            {guest?.first_name
                              ? `${guest?.first_name?.charAt(0)?.toUpperCase()}`
                              : ""}
                            {guest?.last_name
                              ? `${guest?.last_name?.charAt(0)?.toUpperCase()}`
                              : ""}
                            {!guest?.first_name &&
                              !guest?.last_name &&
                              guest?.email
                              ? `${guest?.email?.charAt(0)?.toUpperCase()}`
                              : ""}
                          </div>
                          <div>
                            <Button type="button" className="flex gap-3 items-center" onClick={() => {
                              setIsModalOpen(true);
                              setGuestData({ ...guest, ...selectedCategory, pageType: "full-page" });
                            }}>
                              <p className="text-[#131517] font-medium">
                                {guest?.first_name ? `${guest?.first_name} ` : ""}
                                {guest?.last_name ? `${guest?.last_name} ` : ""}
                              </p>
                              <p className="text-[#595C5C] font-medium text-sm">
                                {guest?.email ? guest?.email : ""}
                              </p>
                            </Button>
                          </div>
                        </div>
                      </td>
                      <td className="border p-3 text-left">
                        {guestStatus(guest) ? <div
                          className={`bg-[#37a35330] inline-flex items-center text-sm text-[#595C5C] font-medium rounded-full px-3 py-1 ${guest?.status == 1 ? "goingBg" : "invitedBg"
                            }`}
                        >
                          {guestStatus(guest)}
                        </div> : null}
                      </td>
                      <td className="border p-3 text-left">
                        <p>{dayjs(guest?.created_at).fromNow()}</p>
                      </td>
                      {/* <td className="border p-3 text-left">-</td>
                      <td className="border p-3 text-left">-</td> */}
                      {headers?.length &&
                        headers?.map((item, ind) =>
                          [
                            "first_name",
                            "last_name",
                            "email",
                            "status",
                            "created_at",
                          ].includes(item?.key) ? null : item?.key ===
                            "event_title" ? (
                            <td key={ind} className="border p-3 text-left">
                              {guest["event_title"]
                                ? guest["event_title"]
                                : "-"}
                            </td>
                          ) : (
                            <td key={ind} className="border p-3 text-left">
                              {guest["attendee_meta"][item?.key]
                                ? Array.isArray(
                                  guest["attendee_meta"][item?.key]
                                )
                                  ? guest["attendee_meta"][item?.key]?.join(
                                    ", "
                                  )
                                  : guest["attendee_meta"][item?.key]
                                : "-"}
                            </td>
                          )
                        )}
                    </tr>
                  );
                }) : null}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      <Modal
        open={isOpen}
        onClose={onCloseInviteModel}
        showBtn={false}
        headerTitle="Invite Guest"
        ModalWrapperCls="ModalBoxContainer lg:max-w-[560px]"
        bodyWrapperCls="px-0"
        headerMarginCls="mb-0"
        headerCls="p-3 border-b-[1px]"
      >
        <div className="flex max-sm:flex-col mob-over">
          {/* <div className="sm:border-r-[1px] sm:w-[33%] p-3">
            {!isNext ? (
              <div className="bg-[#DFE0E1] p-2 rounded-md text-[#131517] text-sm font-medium flex gap-2 items-center">
                {Svg().EnterEmail}Enter Emails
              </div>
            ) : (
              <div>
                <p className="text-[#969498] font-medium text-sm mb-2">
                  Inviting 1 Person
                </p>
                <div className="flex gap-2 items-center">
                  <div className="rounded-full text-[#fff] bg-[#595C5C] h-[30px] w-[30px] flex items-center justify-center">
                    P
                  </div>
                  <div>
                    <p className="text-[#131517] font-medium text-sm">
                      Prakash
                    </p>
                    <p className="text-[#595C5C] font-medium text-[13px]">
                      prakash@webcontxt.com
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div> */}
          <div className="p-3 grow invite-guest-height">
            {!isNext ? (
              <div>
                <div className="flex justify-between border-b-[1px] mb-2 pb-1">
                  <label className="text-[#595C5C] text-sm font-semibold mb-2 block">
                    Direct Registration
                  </label>
                  <div>
                    <ToggleButton
                      large={true}
                      onChange={(val) => {
                        handleRegisterToggleChange(val);
                      }}
                    />
                  </div>
                </div>
                <CustomDropdown
                  labelText="Select Sub-Categories"
                  dropDownText="Select"
                  dropDownArr={subCatArr}
                  handleSelection={handleInviteSubcatChange}
                />
                <label className="text-[#595C5C] text-sm font-semibold mb-2 block">
                  Add Emails
                </label>
                <div className="flex gap-2">
                  <Input
                    inputCls="input grow bg-[#EFEFF0]"
                    placeholder="Paste or enter emails here"
                    name="emails"
                    onChange={(e) => setInviteEmails(e.target.value.trim())}
                    val={invite_emails}
                  />
                  <Button
                    type="button"
                    className="btn-dark"
                    disabled={isLoading}
                    onClick={() => addEmail()}
                    showLoader={false}
                  >
                    Add
                  </Button>
                </div>
                <div className="seprateLinr relative text-center mt-6 mb-4 after:content-[text-[#f00]">
                  <span className="pl-[5px] pr-[5px] bg-[#fff] text-[#131517] text-[14px] uppercase">or</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-[#595C5C] text-sm font-semibold block">
                    Import CSV
                  </label>

                  <button
                    disabled={isLoading}
                    type="button"
                    className="flex items-center gap-2 btn-light text-sm py-1 text-[14px] h-[30px]"
                    onClick={() => {
                      downloadSampleCSV();
                    }}
                  >
                    Download Sample CSV
                  </button>
                </div>


                <div className="relative rounded-lg border-[#131517] border-[1px] border-dashed p-5 bg-[#EFEFF0] flex flex-col gap-2 items-center justify-center overflow-hidden">
                  {Svg().ImportIcon}
                  <p className="text-[#131517] font-semibold">
                    Import CSV File
                  </p>
                  <p>Drop file or click here to choose file</p>
                  <FileUploader
                    cls="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                    accept=".csv"
                    avatar=""
                    id="Csv"
                    allowedExtensions={["csv"]}
                    cb={(file) => {
                      handleCSVFiles(file);
                    }}
                  />
                </div>



                <div className="w-full">
                  <div className="flex justify-between items-center border-b border-[#ebeced] py-4">
                    <div className="flex gap-3 items-center">
                      <p>file name.csv</p>
                      <span className="lightGreen rounded-full px-4 py-1 text-[13px] text-[#595C5C] font-normal">Completed</span>
                    </div>
                    <div>
                      <Link href="" className="text-[#0E94FF] text-[14px] font-medium underline">Error report</Link>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#ebeced] py-4">
                    <div className="flex gap-3 items-center">
                      <p>file name.csv</p>
                      <span className="lightFadeYellow rounded-full px-4 py-1 text-[13px] text-[#595C5C] font-normal">Completed</span>
                    </div>
                    <div>

                    </div>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <div className="flex gap-3 items-center">
                      <p>file name.csv</p>
                      <span className="lightGreen rounded-full px-4 py-1 text-[13px] text-[#595C5C] font-normal">Completed</span>
                    </div>
                    <div>

                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="rounded-lg bg-[#EFEFF0] p-2 mb-3">
                  <p className="text-[#131517] font-medium mb-2">
                    Hi, Prakash incites you to join Test Event
                  </p>
                  <textarea
                    className="form-control h-[150px]"
                    placeholder="Enter a custom message here."
                  ></textarea>
                  <p className="text-[#131517] font-medium">
                    Hi, Prakash incites you to join Test Event
                  </p>
                </div>
                <div className="p-2">
                  <div className="inline-block bg-[#dfe0e1] rounded-md p-2">
                    {Svg().Register}
                  </div>
                  <p className="text-[#131517] font-medium mb-3">
                    We will send guests an invite link to register for the
                    event.
                  </p>
                  <span className="text[#969498] text-[13px] border-t pt-2">
                    Skip registration and payment by adding guests directly to
                    the guest list.
                  </span>
                  <Link
                    className="inline-block text-[#0E95FF] text-[13px] underline"
                    href={"/"}
                  >
                    Add Guests Directly
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
        <div className="flex justify-between p-2 border-t">
          <div>
            {isNext ? (
              <button
                type="button"
                className="btn-light h-[40px] flex items-center gap-3 stroke-[#595C5C] fill-[#595C5C]"
                onClick={() => setIsNext(false)}
              >
                <span className="rotate-180">{Svg().RightArrowGrey}</span>Prev
              </button>
            ) : null}
          </div>
          <div>
            <button
              type="button"
              className="btn-dark flex items-center gap-3"
              onClick={() => setIsNext(true)}
            >
              Next {Svg().RightArrowWhite}
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={isOpenFilter}
        onClose={() => {
          setIsOpenFilter(false);
        }}
        headerTitle="Filter"
        showBtn={false}
        ModalWrapperCls={"ModalBoxContainer w-[650px] "}
        headerCls="px-6 py-2 border-b"
        headerMarginCls="py-1 block w-full"
      >
        <div className="w-full pt-[15px]">
          {/* <div className="selectColumn">
            <p className="text-[#595C5C] text-[14px] font-semibold">Total 4 Columns Selected</p>
            <SearchBox placeholder="Search by name or email" inputCls="pl-10 SearchInputBox pr-10 w-full py-2.5" />
          </div> */}
          <div className="flex w-full max-h-[70vh]">
            <div className="w-[35%] border-r border-[#D9E2E5] px-3">
              <p className="text-[#595C5C] text-[14px] font-medium mb-5">By Event Status</p>
              <div className="flex items-center gap-2 pb-3">
                <input
                  type={"checkbox"}
                  className="accent-black cursor-pointer w-[20px] h-[20px]"
                />
                <span className="text-[#131517] text-[14px] font-medium">Going</span>
              </div>
              <div className="flex items-center gap-2 pb-3">
                <input
                  type={"checkbox"}
                  className="accent-black cursor-pointer w-[20px] h-[20px]"
                />
                <span className="text-[#131517] text-[14px] font-medium">Invited</span>
              </div>
              <div className="flex items-center gap-2 pb-3">
                <input
                  type={"checkbox"}
                  className="accent-black cursor-pointer w-[20px] h-[20px]"
                />
                <span className="text-[#131517] text-[14px] font-medium">Not Going</span>
              </div>
            </div>
            {/* <div className="w-[65%] pl-14">
              <p className="text-[#595C5C] text-[14px] font-medium mb-5">By Sub-Category</p>
              <div className="flex items-center gap-2 pb-3">
                <input
                  type={"checkbox"}
                  className="accent-black cursor-pointer w-[20px] h-[20px]"
                />
                <span className="text-[#131517] text-[14px] font-medium">Sub-category name</span>
              </div>
              <div className="flex items-center gap-2 pb-3">
                <input
                  type={"checkbox"}
                  className="accent-black cursor-pointer w-[20px] h-[20px]"
                />
                <span className="text-[#131517] text-[14px] font-medium">Sub-category name</span>
              </div>
              <div className="flex items-center gap-2 pb-3">
                <input
                  type={"checkbox"}
                  className="accent-black cursor-pointer w-[20px] h-[20px]"
                />
                <span className="text-[#131517] text-[14px] font-medium">Sub-category name</span>
              </div>
              <div className="flex items-center gap-2 pb-3">
                <input
                  type={"checkbox"}
                  className="accent-black cursor-pointer w-[20px] h-[20px]"
                />
                <span className="text-[#131517] text-[14px] font-medium">Sub-category name</span>
              </div>
              <div className="flex items-center gap-2 pb-3">
                <input
                  type={"checkbox"}
                  className="accent-black cursor-pointer w-[20px] h-[20px]"
                />
                <span className="text-[#131517] text-[14px] font-medium">Sub-category name</span>
              </div>
              <div className="flex items-center gap-2 pb-3">
                <input
                  type={"checkbox"}
                  className="accent-black cursor-pointer w-[20px] h-[20px]"
                />
                <span className="text-[#131517] text-[14px] font-medium">Sub-category name</span>
              </div>
              <div className="flex items-center gap-2 pb-3">
                <input
                  type={"checkbox"}
                  className="accent-black cursor-pointer w-[20px] h-[20px]"
                />
                <span className="text-[#131517] text-[14px] font-medium">Sub-category name</span>
              </div>
              <div className="flex items-center gap-2 pb-3">
                <input
                  type={"checkbox"}
                  className="accent-black cursor-pointer w-[20px] h-[20px]"
                />
                <span className="text-[#131517] text-[14px] font-medium">Sub-category name</span>
              </div>
              <div className="flex items-center gap-2 pb-3">
                <input
                  type={"checkbox"}
                  className="accent-black cursor-pointer w-[20px] h-[20px]"
                />
                <span className="text-[#131517] text-[14px] font-medium">Sub-category name</span>
              </div>
            </div> */}
          </div>

          <div className="flex items-center justify-between mt-4 border-t border-[#D9E2E5] pt-6">
            <Button type="button" className="text-[16px]  min-w-[83px] bg-[#DFE0E1] py-2 rounded-[5px]">Reset</Button>
            <Button type="button" className="buttonStyle min-w-[100px]">Submit</Button>
          </div>
        </div>

      </Modal>
      <Modal
        open={isOpenColumn}
        onClose={() => {
          setIsOpenColumn(false);
        }}
        headerTitle="Coulmn"
        showBtn={false}
        ModalWrapperCls={"ModalBoxContainer w-[650px]"}
        headerCls="px-6 py-2 border-b"
        headerMarginCls="py-1 block w-full"
      >
        <div className="w-full pt-[15px]">
          <div className="selectColumn">
            <p className="text-[#595C5C] text-[14px] font-semibold">Total 4 Columns Selected</p>
            <SearchBox placeholder="Search by name or email" inputCls="pl-10 SearchInputBox pr-10 w-full py-2.5" />
          </div>
          <div className="flex w-full max-h-[70vh]">
            <div className="w-[100%]">
              <div className="flex items-center gap-5 flex-wrap pl-[18px] pr-[18px]">
                <div className="flex items-center gap-3 pb-2">
                  <input
                    type={"checkbox"}
                    className="accent-black cursor-pointer w-[20px] h-[20px]"
                  />
                  <span className="text-[#131517] text-[14px] font-medium">Full name</span>
                </div>
                <div className="flex items-center gap-3 pb-2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ">
                  <input
                    type={"checkbox"}
                    className="accent-black cursor-pointer w-[20px] h-[20px]"
                  />
                  <span className="text-[#131517] text-[14px] font-medium">Full name</span>
                </div>
                <div className="flex items-center gap-3 pb-2">
                  <input
                    type={"checkbox"}
                    className="accent-black cursor-pointer w-[20px] h-[20px]"
                  />
                  <span className="text-[#131517] text-[14px] font-medium">Full name</span>
                </div>
                <div className="flex items-center gap-3 pb-2">
                  <input
                    type={"checkbox"}
                    className="accent-black cursor-pointer w-[20px] h-[20px]"
                  />
                  <span className="text-[#131517] text-[14px] font-medium">Full name</span>
                </div>
                <div className="flex items-center gap-3 pb-2">
                  <input
                    type={"checkbox"}
                    className="accent-black cursor-pointer w-[20px] h-[20px]"
                  />
                  <span className="text-[#131517] text-[14px] font-medium">Full name</span>
                </div>
                <div className="flex items-center gap-3 pb-2">
                  <input
                    type={"checkbox"}
                    className="accent-black cursor-pointer w-[20px] h-[20px]"
                  />
                  <span className="text-[#131517] text-[14px] font-medium">Full name</span>
                </div>
                <div className="flex items-center gap-3 pb-2">
                  <input
                    type={"checkbox"}
                    className="accent-black cursor-pointer w-[20px] h-[20px]"
                  />
                  <span className="text-[#131517] text-[14px] font-medium">Full name</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 border-t border-[#D9E2E5] pt-6">
            <Button type="button" className="text-[16px]  min-w-[83px] bg-[#DFE0E1] py-2 rounded-[5px]">Reset</Button>
            <Button type="button" className="buttonStyle min-w-[100px]">Submit</Button>
          </div>
        </div>

      </Modal>
    </>
  );
}

// invitedBg- #dbefff
// goingBg- #d6e7db
// status -> 0 : invited , 1 : going , 2 : not going , 3 : pending approval (show app/dec btn)

export default Guests;
