import { useEffect } from "react";
import Svg from "../../../public/Assets/Svg";
import Button from "../Button/Button";
import { PhycialBadges, PhycialCreateBadge } from "../PhycialBadgeCreate/PhycialBadges/PhycialBadges";
import useMbadge from "@/CustomHook/useMbadge";
import useCreateEvent from "@/CustomHook/useCreateEvent";
import Tabbing from "../Tabbing/Tabbing";
import Modal from "../Modal/Modal";

export const PhysicalBadgeCreate = ({ dataAsProps = {}, setOpenPbadge = () => { }, onFilter = () => { }, filteredCat = [], inputData = {}, onChangeFile = () => { } }) => {
  const {
    currentTab,
    onTabChange,
  } = useCreateEvent();

  const { badgeInputData, setBadgeInputData, onChangeBadge, onChangeBadgeDimension, onCreateBadge, onPreview, openPreView, setOpenPreview, previewString } = useMbadge({ ...dataAsProps, preventApi: true });

  useEffect(() => {
    if (dataAsProps?.selectedBadgeData?.id) {
      setBadgeInputData({
        ...dataAsProps?.selectedBadgeData
      });
      document.getElementById("Design & Fields")?.click();
    }
   
    return (() => {
      dataAsProps?.setFirstNameArr([]);
      dataAsProps?.setLastNameArr([]);
      dataAsProps?.setQrcodeArr([]);
    })
  }, [dataAsProps?.selectedBadgeData]);

  const switchTab = (tab) => {
    switch (tab) {
      case 0:
        return <PhycialBadges onChange={onChangeBadge} badgeInputData={badgeInputData} inputData={inputData} onChangeFile={onChangeFile} onFilter={onFilter} filteredCat={filteredCat} />;
      case 1:
        return <PhycialCreateBadge dataAsProps={{ ...dataAsProps, badgeInputData, onChange: onChangeBadge, onChangeBadgeDimension }} />;
    }
  };
  return (
    <div className='badgeContentMt'>
      <div className="w-full">
        <div className="border-b-[1px] p-4 flex gap-3 items-center justify-between">
          <div className="headLeft flex items-center gap-2">
            <div id="createPbadge" className="close-btn" onClick={() => {
              setOpenPbadge(false);
              dataAsProps?.setSelectedBadge({});
            }}>
              {Svg().PopupArrow}
            </div>
            <h2 className="text-base font-semibold text-[#131517]"> Create Physical Badge</h2>
          </div>
          <Button onClick={() => onPreview('pBadge', ".single-resizer")} type="button" className="text-sm btn-light justify-between flex items-center gap-2 fill-[#595C5C] h-[32px] stroke-[#595C5C] hover:stroke-[#fff] hover:fill-white">{Svg().EyeIcon} Preview</Button>
        </div>
        <div className="AppearanceTheme px-4 py-4 overflow-auto">
          <Tabbing
            tabData={['General', 'Design & Fields']}
            tabHandler={(tab) => onTabChange(tab)}
            containerWidth="xl:w-[100%]"
          >
            {switchTab(currentTab?.activeTab)}
          </Tabbing>
        </div>
      </div>

      <div className='popup-footer bg-[#FFFFFF] flex gap-5 p-4 items-center border-t-[1px] absolute bottom-0 left-0 w-full'>
        <Button onClick={() => {
          onCreateBadge(filteredCat, "pbadge", inputData, 'pBadge', ".single-resizer");
        }} className='flex items-center gap-2 btn-dark' type='button'>Save Changes</Button>
      </div>

      <Modal
        open={openPreView && previewString}
        onClose={() => setOpenPreview(false)}
        showBtn={false}
        headerCls='p-0'
        bodyWrapperCls='p-0'
        ModalWrapperCls='ModalBoxContainer w-[4in]'
      >
        {previewString ? <div dangerouslySetInnerHTML={{ __html: previewString }}></div> : null}

      </Modal>
    </div>
  )
}
