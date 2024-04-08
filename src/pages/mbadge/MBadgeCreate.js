
import React, { useEffect, useState } from "react";
import useMbadge from "@/CustomHook/useMbadge";
import useCommonStore from "@/Store/useCommonStore";
import Modal from "@/Components/Modal/Modal";
import Svg from "../../../public/Assets/Svg";
import Button from "@/Components/Button/Button";
import Tabbing from "@/Components/Tabbing/Tabbing";
import { Badges } from "@/Components/BadgeCreate/Badges/Badges";
import { CreateBadgeBox } from "@/Components/BadgeCreateBox/BadgesBox/BadgesBox";
import useBadgeCreatorStore from "@/Store/useBadgeCreatorStore";

const MBadgeCreate = ({
  dataAsProps,
  setOpenMbadge = () => { },
  onFilter = () => { },
  filteredCat = [],
  inputData = {},
  onChangeFile = () => { },
  cb = () => { },
  currentTab = "",
  onTabChange = () => { }
}) => {
  const { badgefieldsBtn, setBadgeFieldsBtn } = useBadgeCreatorStore();

  const {
    badgeInputData,
    setBadgeInputData,
    onChangeBadge,
    onChangeBadgeDimension,
    onCreateBadge,
    onPreview,
    openPreView,
    setOpenPreview,
    previewString,
    setPreviewString,
  } = useMbadge({ ...dataAsProps, preventApi: true });

  const { isLoading, setIsLoading } = useCommonStore();

  const [openDropDown, setOpenDropDown] = useState(false);

  const [customQues, setCustomQues] = useState([
    { label: "custom field 1", id: "10", icon: "NameUserIcon" },
    { label: "custom field 2", id: "20", icon: "NameUserIcon" },
    { label: "custom field 3", id: "30", icon: "NameUserIcon" },
  ]);

  const handleDropDownOpen = () => {
    setOpenDropDown(!openDropDown);
  };

  const addBtn = (obj) => {
    let btndata = {
      add_id: `addButton-${obj?.label}`,
      add_text: obj?.label,
      delete_id: `deleteButton-${obj?.label}`,
      icon: 'CustomQuestion'
    };
    let flag = true;
    for (let i = 0; i < badgefieldsBtn?.length; i++) {
      if (badgefieldsBtn[i]?.add_id === btndata?.add_id) {
        flag = false;
        break;
      }
    }
    if (flag) {
      let arr = [...badgefieldsBtn, { ...btndata }];
      setBadgeFieldsBtn(arr);
    }
  };

  useEffect(() => {
    if (dataAsProps?.selectedBadgeData?.id || dataAsProps?.selectedBadgeData?.title) {
      setBadgeInputData({
        ...dataAsProps?.selectedBadgeData,
      });
      document.getElementById("Design & Fields")?.click();
    }

    return () => {
      dataAsProps?.setNameArr([]);
      dataAsProps?.setCompanyArr([]);
      dataAsProps?.setFirstNameArr([]);
      dataAsProps?.setLastNameArr([]);
      dataAsProps?.setQrcodeArr([]);
      dataAsProps?.setUniqueCodeArr([]);
    };
  }, [dataAsProps?.selectedBadgeData]);

  const switchTab = (tab) => {
    switch (tab) {
      case 0:
        return (
          <Badges
            onChange={onChangeBadge}
            badgeInputData={badgeInputData}
            onChangeFile={onChangeFile}
            inputData={inputData}
            onFilter={onFilter}
            filteredCat={filteredCat}
          />
        );
      case 1:
        return (
          <CreateBadgeBox
            badgefieldsBtn={badgefieldsBtn}
            openDropDown={openDropDown}
            customQues={customQues}
            handleDropDownOpen={handleDropDownOpen}
            addBtn={addBtn}
          />
        );
    }
  };

  return (
    <div className="badgeContentMt">
      <div className="w-full">
        <div className="border-b-[1px] p-4 flex gap-3 items-center justify-between">
          <div className="headLeft flex items-center gap-2">
            <div
              id="createMbadge"
              className="close-btn"
              onClick={() => {
                if (cb) cb();
                setOpenMbadge(false);
                dataAsProps?.setSelectedBadge({});
              }}
            >
              {Svg().PopupArrow}
            </div>
            <h2 className="text-base font-semibold text-[#131517]">
              {dataAsProps?.selectedBadgeData?.id ? "Update" : "Create"} M-Badge
            </h2>
          </div>
          <Button
            onClick={() => onPreview("mBadge", ".single-resizer")}
            type="button"
            className="text-sm btn-light justify-between flex items-center gap-2 fill-[#595C5C] h-[32px] stroke-[#595C5C] hover:stroke-[#fff] hover:fill-white"
          >
            {Svg().EyeIcon} Preview
          </Button>
        </div>
        <div className="AppearanceTheme px-4 py-4 overflow-auto">
          <Tabbing
            tabData={["General", "Design & Fields"]}
            tabHandler={(tab) => onTabChange(tab)}
            containerWidth="xl:w-[100%]"
          >
            {switchTab(currentTab?.activeTab)}
          </Tabbing>
        </div>
      </div>

      <div className="popup-footer bg-[#FFFFFF] flex gap-5 p-4 items-center border-t-[1px] absolute bottom-0 left-0 w-full">
        <Button
          disabled={isLoading}
          onClick={() => {
            onCreateBadge(
              filteredCat,
              "mbadge",
              inputData,
              "mBadge",
              ".single-resizer",
              () => {
                cb();
              }
            );
          }}
          className="flex items-center gap-2 btn-dark"
          type="button"
        >
          {dataAsProps?.selectedBadgeData?.id ? "Update" : "Create"} M-Badge
        </Button>
      </div>

      <Modal
        open={openPreView && previewString}
        onClose={() => setOpenPreview(false)}
        showBtn={false}
        headerCls="p-0"
        bodyWrapperCls="p-0"
        ModalWrapperCls="ModalBoxContainer w-[4in] m-badge-preview"
      >
        {previewString ? (
          <div dangerouslySetInnerHTML={{ __html: previewString }}></div>
        ) : null}
      </Modal>
    </div>
  );
};
export default MBadgeCreate;
