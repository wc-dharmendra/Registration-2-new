
import useCreateEvent from "@/CustomHook/useCreateEvent";
import useMbadge from "@/CustomHook/useMbadge";
import { useEffect } from "react";
import { Badges, CreateBadge } from "../BadgeCreate/Badges/Badges";
import Button from "../Button/Button";
import Tabbing from "../Tabbing/Tabbing";
import Svg from "../../../public/Assets/Svg";
import Modal from "../Modal/Modal";
import useCommonStore from "@/Store/useCommonStore";

export const MBadgeCreate = ({
  dataAsProps,
  setOpenMbadge = () => { },
  onFilter = () => { },
  filteredCat = [],
  inputData = {},
  onChangeFile = () => { },
  cb = () => { },
}) => {
  const { currentTab, onTabChange } = useCreateEvent();
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
      dataAsProps?.setDateArr([]);
      dataAsProps?.setOidArr([]);
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
          <CreateBadge
            dataAsProps={{
              ...dataAsProps,
              badgeInputData,
              onChange: onChangeBadge,
              onChangeBadgeDimension,
            }}
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
