import React, { Fragment, useState } from "react";
import Svg from "../../../public/Assets/Svg";
import Button from "@/Components/Button/Button";
import useCreateEvent from "@/CustomHook/useCreateEvent";
import useMbadge from "@/CustomHook/useMbadge";
import { MBadgeCreate } from "./MBadgeCreate";
import { PhysicalBadgeCreate } from "./PhysicalBadgeCreate";
import Link from "next/link";
import BadgeRow from "./BadgeRow";
import CreateBadgeBtn from "./CreateBadgeBtn";
import useBadgeStore from "@/Store/useBadgeStore";
import SkeletonBadge from "../Skeleton/SkeletonBadge";
import useCommonStore from "@/Store/useCommonStore";

const MBadge = () => {
  const {
    openCategory,
    categoryButtonRef,
    categoryDropRef,
    handleCategoryOpen,
  } = useCreateEvent();

  const { badgeConfig } = useBadgeStore();

  const {
    openMbadge,
    setOpenMbadge,
    openPbadge,
    setOpenPbadge,
    onMedit,
    onPedit,
    categories,
    onFilter,
    filteredCat,
    inputData,
    onChangeFile,
    selectedBadgeData,
    setSelectedBadge,
    badges,
    setInputData,
    onDownloadBadge,
    getBadgeList,
    setFilteredCat,
    onDuplicateBadge,
    onDeleteBadge,
    submitBadgeData,
  } = useMbadge();

  const { isLoading } = useCommonStore();

  const [nameArr, setNameArr] = useState([]);
  const [companyArr, setCompanyArr] = useState([]);
  const [firstNameArr, setFirstNameArr] = useState([]);
  const [lastNameArr, setLastNameArr] = useState([]);
  const [qrCodeArr, setQrcodeArr] = useState([]);
  const [uniqueCodeArr, setUniqueCodeArr] = useState([]);
  const [dateArr, setDateArr] = useState([]);
  const [oidArr, setOidArr] = useState([]);



  const [pbFirstNameArr, setPBFirstNameArr] = useState([]);
  const [pblastNameArr, setPBLastNameArr] = useState([]);
  const [pbqrCodeArr, setPBQrcodeArr] = useState([]);

  const onTakeAction = (actionName, actionData) => {
    const actions = [
      {
        name: "edit",
        data: actionData,
        action: onMedit,
        onComplete: setFilteredCat,
      },
      {
        name: "download",
        data: actionData?.id,
        action: onDownloadBadge,
        onComplete: () => { },
      },
      {
        name: "duplicate",
        data: actionData?.id,
        action: onDuplicateBadge,
        onComplete: getBadgeList,
      },
      {
        name: "delete",
        data: actionData?.id,
        action: onDeleteBadge,
        onComplete: getBadgeList,
      },
      {
        name: "removeCat",
        data: actionData,
        action: submitBadgeData,
        onComplete: getBadgeList,
      },
    ];
    actions?.map(({ name, data, action, onComplete }) => {
      if (actionName === name) {
        if (name === "duplicate") {
          onMedit({ ...actionData, id: "", categories: [] });
        } else {
          action(data, (cbData) => {
            onComplete(cbData);
          });
        }
      }
    });
  };

  const activateHandler = Boolean(inputData?.mImg);
  const pBadgeActivateHandler = Boolean(inputData?.pImg);

  const dataAsProps = {
    nameArr,
    companyArr,
    firstNameArr,
    lastNameArr,
    qrCodeArr,
    uniqueCodeArr,
    dateArr,
    oidArr,
    setNameArr,
    setCompanyArr,
    setFirstNameArr,
    setLastNameArr,
    setQrcodeArr,
    setUniqueCodeArr,
    setDateArr,
    setOidArr,
    activateHandler,
    selectedBadgeData,
    setSelectedBadge,
  };
  const pbProps = {
    firstNameArr: pbFirstNameArr,
    lastNameArr: pblastNameArr,
    qrCodeArr: pbqrCodeArr,
    setFirstNameArr: setPBFirstNameArr,
    setLastNameArr: setPBLastNameArr,
    setQrcodeArr: setPBQrcodeArr,
    activateHandler: pBadgeActivateHandler,
    selectedBadgeData,
    setSelectedBadge,
  };

  return (
    <div>
      <div className="pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="BadgeHeading w-full">
            <div className="flex md:justify-between max-md:flex-col max-md:mb-3">
              <h1 className="heading-H1">Badge Template</h1>
              <div className="CategoryToggle relative">
                <Button
                  ref={categoryButtonRef}
                  onClick={handleCategoryOpen}
                  type={"button"}
                  className="bg-[#DFE0E1] text-[#595C5C] text-[14px] rounded-lg px-3 py-1.5 font-medium hover:bg-[#131517] hover:text-[#EFEFF0] flex gap-2 items-center"
                >
                  {Svg().SelectFilter} Select Category {Svg().DownArrowDark}
                </Button>

                {openCategory ? (
                  <div className="pt-2  absolute md:right-0 z-10">
                    <div
                      ref={categoryDropRef}
                      className="boxShadow w-[178px] origin-top-right rounded-md bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="p-1">
                        {categories?.length
                          ? categories?.map((elem) => {
                            return (
                              <Button
                                onClick={() => onFilter(elem?.id)}
                                key={elem?.id}
                                type="button"
                                className=" text-left text-gray-700 rounded flex justify-between items-center px-4 py-1 text-sm w-full hover:bg-[#DFE0E1] stroke-[#131517]"
                              >
                                {elem?.title}
                                {filteredCat?.includes(elem?.id)
                                  ? Svg().Checkbox
                                  : null}
                              </Button>
                            );
                          })
                          : null}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <p className="paragraph">
              Design a unified badge template or generate multiple templates
              with filtering <br /> options based on the category type.
            </p>
          </div>
        </div>
        <div className="w-full">
          <CreateBadgeBtn
            onClick={() => {
              setOpenMbadge(true);
              setSelectedBadge({});
              setInputData({
                mImg: badgeConfig?.config?.mbadge?.image,
                pImg: "",
              });
              setFilteredCat([]);
            }}
          />
          {badges?.mBadges?.length ? (
            badges?.mBadges?.map((e) => {
              return (
                <BadgeRow
                  {...e}
                  key={e?.id}
                  onAction={(actionName, actionData) => {
                    onTakeAction(
                      actionName,
                      actionName === "removeCat"
                        ? {
                          ...e,
                          categories: actionData?.map((cat) => cat?.id),
                        }
                        : e
                    );
                  }}
                />
              );
            })
          ) : isLoading && !badges?.mBadges?.length ? (
            <SkeletonBadge />
          ) : null}
        </div>

        {openMbadge ? (
          <div className="GeneralBadgesCard">
            <div className="badgeAreaInfo">
              {inputData?.mImg ? (
                <div className="BadgeInputContentOuter">
                  <div className="BadgeInputContent">
                    <div
                      id="mBadge"
                      style={{
                        width: "8in",
                        // height:"8in",
                        position: "relative",
                        overflow: "hidden",
                        border: "1px solid #eee",
                        backgroundColor: '#fff'
                      }}
                    >
                      <img
                        src={inputData?.mImg}
                        style={{
                          position: "relative",
                          height: "auto",
                          maxWidth: "100%",
                        }}
                        title="Event"
                        alt="Event"
                      />
                      <div
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          top: "0",
                          left: "0",
                          fontFamily: "sans-serif",
                        }}
                      >
                        {nameArr?.length
                          ? nameArr.map((obj) => (
                            <Fragment key={obj}>{obj}</Fragment>
                          ))
                          : null}
                        {firstNameArr?.length
                          ? firstNameArr.map((obj) => (
                            <Fragment key={obj}>{obj}</Fragment>
                          ))
                          : null}
                        {lastNameArr?.length
                          ? lastNameArr.map((obj) => (
                            <Fragment key={obj}>{obj}</Fragment>
                          ))
                          : null}
                        {companyArr?.length
                          ? companyArr.map((obj) => (
                            <Fragment key={obj}>{obj}</Fragment>
                          ))
                          : null}
                        {qrCodeArr?.length
                          ? qrCodeArr.map((obj) => (
                            <Fragment key={obj}>{obj}</Fragment>
                          ))
                          : null}
                        {uniqueCodeArr?.length
                          ? uniqueCodeArr.map((obj) => (
                            <Fragment key={obj}>{obj}</Fragment>
                          ))
                          : null}
                        {dateArr?.length
                          ? dateArr.map((obj) => (
                            <Fragment key={obj}>{obj}</Fragment>
                          ))
                          : null}
                        {oidArr?.length
                          ? oidArr.map((obj) => (
                            <Fragment key={obj}>{obj}</Fragment>
                          ))
                          : null}
                      </div>
                    </div>

                    <div className="mt-6">
                      {/* <Button type="button" className="flex gap-2 bg-[#EFEFF0] text-[14px] text-[#595C5C] rounded-lg py-1 px-3 hover:bg-[#131517] hover:text-[#EFEFF0] font-semibold stroke-[#595c5c] hover:stroke-[#fff] ">{Svg().Download} Download Sample File</Button> */}
                      <Link
                        target={"_blank"}
                        href="./Assets/Images/sample-badge-mma.png"
                        className="flex gap-2 bg-[#EFEFF0] text-[14px] text-[#595C5C] rounded-lg py-1 px-3 hover:bg-[#131517] hover:text-[#EFEFF0] font-semibold stroke-[#595c5c] hover:stroke-[#fff] "
                        download
                      >
                        {Svg().Download} Download Sample File
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <MBadgeCreate
              dataAsProps={dataAsProps}
              inputData={inputData}
              onChangeFile={onChangeFile}
              onFilter={onFilter}
              filteredCat={filteredCat}
              setOpenMbadge={setOpenMbadge}
              cb={() => {
                setSelectedBadge({});
                setInputData({
                  mImg: badgeConfig?.config?.mbadge?.image,
                  pImg: "",
                });
                setFilteredCat([]);
                getBadgeList();
              }}
            />
          </div>
        ) : null}

        {openPbadge ? (
          <div className="PhysicalBadgesCard">
            <div className="badgeAreaInfo">
              {inputData?.pImg ? (
                <div className="BadgeInputContent">
                  <div
                    id="pBadge"
                    style={{
                      width: "4in",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={inputData?.pImg}
                      style={{
                        position: "relative",
                        height: "auto",
                        maxWidth: "100%",
                      }}
                      title="Event"
                      alt="Event"
                    />
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: "0",
                        left: "0",
                      }}
                    >
                      {pbFirstNameArr?.length
                        ? pbFirstNameArr.map((obj) => (
                          <Fragment key={obj}>{obj}</Fragment>
                        ))
                        : null}
                      {pblastNameArr?.length
                        ? pblastNameArr.map((obj) => (
                          <Fragment key={obj}>{obj}</Fragment>
                        ))
                        : null}
                      {pbqrCodeArr?.length
                        ? pbqrCodeArr.map((obj) => (
                          <Fragment key={obj}>{obj}</Fragment>
                        ))
                        : null}
                    </div>
                  </div>
                  <div className="mt-6">
                    {/* <Button type="button" className="flex gap-2 bg-[#EFEFF0] text-[14px] text-[#595C5C] rounded-lg py-1 px-3 hover:bg-[#131517] hover:text-[#EFEFF0] font-semibold stroke-[#595c5c] hover:stroke-[#fff] ">{Svg().Download} Download Sample File</Button> */}
                    <Link
                      target={"_blank"}
                      href="./Assets/images/sample-badge-mma.png"
                      className="flex gap-2 bg-[#EFEFF0] text-[14px] text-[#595C5C] rounded-lg py-1 px-3 hover:bg-[#131517] hover:text-[#EFEFF0] font-semibold stroke-[#595c5c] hover:stroke-[#fff] "
                      download
                    >
                      {Svg().Download} Download Sample File
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
            <PhysicalBadgeCreate
              dataAsProps={pbProps}
              inputData={inputData}
              onChangeFile={onChangeFile}
              onFilter={onFilter}
              filteredCat={filteredCat}
              setOpenPbadge={setOpenPbadge}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default MBadge;
