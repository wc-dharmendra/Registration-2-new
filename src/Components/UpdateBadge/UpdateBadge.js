import Link from "next/link";
import { MBadgeCreate } from "../MBadge/MBadgeCreate";
import useMbadge from "@/CustomHook/useMbadge";
import { Fragment, useEffect, useState } from "react";
import Svg from "../../../public/Assets/Svg";
import useCategoryMatrixStore from "@/Store/useCategoryMatrixStore";
import useCategoryMatrix from "@/CustomHook/useCategoryMatrix";

const UpdateBadge = () => {
  const { selectedCategory } = useCategoryMatrixStore();

  const { fetchCategories } = useCategoryMatrix();

  const {
    openMbadge,
    setOpenMbadge,
    categories,
    onFilter,
    filteredCat,
    inputData,
    onChangeFile,
    selectedBadgeData,
    setSelectedBadge,
    setInputData,
    setFilteredCat,
  } = useMbadge();

  const [firstNameArr, setFirstNameArr] = useState([]);
  const [lastNameArr, setLastNameArr] = useState([]);
  const [qrCodeArr, setQrcodeArr] = useState([]);

  const [nameArr, setNameArr] = useState([]);
  const [companyArr, setCompanyArr] = useState([]);
  const [uniqueCodeArr, setUniqueCodeArr] = useState([]);

  const activateHandler = Boolean(inputData?.mImg);

  const propsData = {
    firstNameArr,
    lastNameArr,
    qrCodeArr,
    nameArr,
    companyArr,
    uniqueCodeArr,
    setNameArr,
    setCompanyArr,
    setUniqueCodeArr,
    setFirstNameArr,
    setLastNameArr,
    setQrcodeArr,
    activateHandler,
    selectedBadgeData,
    setSelectedBadge,
  };

  const updateSelectedCategory = () => {
    fetchCategories();
  };

  return (
    <div>
      <div className="w-full mb-5 flex items-center justify-between">
        {selectedCategory?.badge?.id ? (
          <div className="flex w-full justify-between">
            <h2 className="text-xl font-semibold text-[#131517]">
              M-Badge Preview
            </h2>
            <button
              type="submit"
              onClick={() => {
                let cats = [];
                if (selectedCategory?.badge?.categories?.length) {
                  selectedCategory?.badge?.categories?.map(({ id }) => {
                    cats.push(id);
                  });
                }
                setOpenMbadge(true);
                setSelectedBadge({
                  ...selectedCategory?.badge,
                });

                setInputData({ mImg: selectedCategory?.badge?.image });
                setFilteredCat(cats);
              }}
              className="bg-[#DFE0E1] text-[#595C5C] text-[14px] rounded-lg px-2 py-1.5 font-medium hover:bg-[#595C5C] hover:text-[#fff] hover:fill-white transition-all flex gap-2 items-center"
            >
              {Svg()?.Edit}
            </button>
          </div>
        ) : null}
      </div>
      {!openMbadge ? (
        <div
          className="flex justify-center pb-8 border-b border-slate-300"
          dangerouslySetInnerHTML={{
            __html: selectedCategory?.badge?.template,
          }}
        />
      ) : null}

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
                      position: "relative",
                      overflow: "hidden",
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
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      target={"_blank"}
                      href="/Assets/Images/sample-badge-mma.png"
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
            dataAsProps={propsData}
            inputData={inputData}
            onChangeFile={onChangeFile}
            onFilter={onFilter}
            filteredCat={filteredCat}
            setOpenMbadge={setOpenMbadge}
            cb={() => {
              updateSelectedCategory();
            }}
          />
        </div>
      ) : null}

      <div className="pb-8">
        <div className="flex items-center justify-between py-5">
          <h2 className="text-[#131517] text-[20px] font-semibold">Request to bulk download badges</h2>
          <Link
            target={"_blank"}
            href=""
            className="flex gap-2 bg-[#DFE0E1] text-[14px] text-[#595C5C] rounded-[8px] py-2 px-2 hover:bg-[#131517] hover:text-[#EFEFF0] font-semibold stroke-[#595c5c] hover:stroke-[#fff] "
            download> {Svg().Download}</Link>
        </div>

        <div className="bg-[#FFFFFF] rounded-lg border border-[#D9E2E5]">
          <div className="flex items-center justify-between flex-1 px-4 py-4 border-b border-slate-300">
            <h4 className="text-[#131517] text-[16px] font-medium">18 Jan, 2024 - 10:00 AM</h4>
            <span className="bg-[#d3ebff] rounded-full text-[#595C5C] text-[14px] px-4 py-1">Processing</span>
          </div>
          <div className="flex items-center justify-between flex-1 px-4 py-4 border-b border-slate-300">
            <h4 className="text-[#131517] text-[16px] font-medium">15 Jan, 2024 - 04:34 PM</h4>
            <Link href="" className="text-[#0E94FF] text-[14px] font-medium underline">Download</Link>
          </div>
          <div className="flex items-center justify-between flex-1 px-4 py-4 border-b border-slate-300">
            <h4 className="text-[#131517] text-[16px] font-medium">13 Jan, 2024 - 08:42 AM</h4>
            <Link href="" className="text-[#0E94FF] text-[14px] font-medium underline">Download</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateBadge;