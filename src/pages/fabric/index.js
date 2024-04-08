import React, { useState } from "react";
import GlobalLayout from "@/Components/Layout/GlobalLayout";
import ReusableBadgeCreator from "@/Components/BadgeCreator/BadgeCreator";
import Svg from "../../../public/Assets/Svg";
import Button from "@/Components/Button/Button";
import Tabbing from "@/Components/Tabbing/Tabbing";
import useCreateEvent from "@/CustomHook/useCreateEvent";
import { BadgesBox, CreateBadgeBox } from "@/Components/BadgeCreateBox/BadgesBox/BadgesBox";
import useBadgeCreatorStore from "@/Store/useBadgeCreatorStore";
import Modal from "@/Components/Modal/Modal";

const BadgeCreate = () => {
  const {
    currentTab,
    onTabChange,
    tabData,
  } = useCreateEvent();
  const { badgefieldsBtn, setBadgeFieldsBtn } = useBadgeCreatorStore();
  const [id, setId] = useState("1");
  const [openPreView, setOpenPreview] = useState(false);
  const [previewString, setPreviewString] = useState("");

  // const [badgefieldsBtn, setBadgeFieldsBtn] = useState([
  //   {
  //     add_id: "addButton-First Name",
  //     add_text: "First Name",
  //     delete_id: "deleteButton-First Name",
  //     icon: "NameUserIcon"
  //   },
  //   {
  //     add_id: "addButton-Last Name",
  //     add_text: "Last Name",
  //     delete_id: "deleteButton-Last Name",
  //     icon: "NameUserIcon"
  //   },
  //   {
  //     add_id: "addButton-QRCode",
  //     add_text: "QR Code",
  //     delete_id: "deleteButton-QRCode",
  //     icon: "QRCodeIcon"
  //   },
  // ]);

  const [openDropDown, setOpenDropDown] = useState(false);

  const [customQues, setCustomQues] = useState([
    { label: "custom field 1", id: "10" },
    { label: "custom field 2", id: "20" },
    { label: "custom field 3", id: "30" },
  ]);

  const handleDropDownOpen = () => {
    setOpenDropDown(!openDropDown);
  };

  const addBtn = (obj) => {
    let btndata = {
      add_id: `addButton-${obj?.label}`,
      add_text: obj?.label,
      delete_id: `deleteButton-${obj?.label}`,
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


  const switchTab = (tab) => {
    switch (tab) {
      case 0:
        return (
          <BadgesBox
          //onChange={onChangeBadge}
          //badgeInputData={badgeInputData}
          //onChangeFile={onChangeFile}
          //inputData={inputData}
          //onFilter={onFilter}
          //filteredCat={filteredCat}
          />
        );
      case 1:
        return (
          <CreateBadgeBox
            // dataAsProps={{
            //   ...dataAsProps,
            //   badgeInputData,
            //   onChange: onChangeBadge,
            //   onChangeBadgeDimension,
            // }}
            badgefieldsBtn={badgefieldsBtn}
            openDropDown={openDropDown}
            customQues={customQues}
            handleDropDownOpen={handleDropDownOpen}
            addBtn={addBtn}
          />
        );
    }
  };
  // useEffect(()=>{
  //   document.getElementById("Design & Fields")?.click();
  // },[])

  return (
    <GlobalLayout>
      <div className="GeneralBadgesCard">
        <div className="badgeAreaInfo">
          <div className="BadgeInputContentOuter">
            <div className="BadgeInputContent">
              <div id="mBadge" style={{ width: "4in", position: "relative", overflow: "hidden" }}>
                <ReusableBadgeCreator
                  id={id}
                  canvasWidth={384}
                  canvasHeight={546}
                  badgefieldsBtn={badgefieldsBtn}
                  currentTab={currentTab}
                />
              </div>
              <div className="mt-6">
                <a target="_blank"
                  className="flex gap-2 bg-[#EFEFF0] text-[14px] text-[#595C5C] rounded-lg py-1 px-3 hover:bg-[#131517] hover:text-[#EFEFF0] font-semibold stroke-[#595c5c] hover:stroke-[#fff] "
                  download="" href="/Assets/Images/sample-badge.png"> Download Sample File</a>
              </div>
            </div>
          </div>
        </div>

        <div className='badgeContentMt'>
          <div className="w-full">
            <div className="border-b-[1px] p-4 flex gap-3 items-center justify-between">
              <div className="headLeft flex items-center gap-2">
                <div id="createPbadge" className="close-btn">
                  {Svg().PopupArrow}
                </div>
                <h2 className="text-base font-semibold text-[#131517]"> Create Physical Badge</h2>
              </div>
              <Button type="button" onClick={() => {
                let dom = document.getElementById("mBadge");
                if (dom) setPreviewString(dom?.outerHTML);
                setOpenPreview(true);
              }} className="text-sm btn-light justify-between flex items-center gap-2 fill-[#595C5C] h-[32px] stroke-[#595C5C] hover:stroke-[#fff] hover:fill-white">{Svg().EyeIcon} Preview</Button>
            </div>
            <div className="AppearanceTheme px-4 py-4 overflow-auto">
              <Tabbing
                tabData={['General', 'Design & Fields']}
                tabHandler={(tab) => onTabChange(tab)}
                containerWidth="xl:w-[100%]"
              >
                {switchTab(currentTab?.activeTab)}
              </Tabbing>

              {/* <div className="w-full">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {badgefieldsBtn?.length &&
                    badgefieldsBtn?.map((btn, index) => (
                      <Fragment key={index}>
                         <div style={{
                          width: "100%"
                        }}
                        >
                        <div style={{
                          display: "flex",
                          width: "100%",
                          gap: "1rem",
                          justifyContent: "center"
                        }}
                        >
                          <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgb(223, 224, 225)",
                            borderRadius: "0.375rem",
                            width: "30px",
                            height: "30px"
                          }}
                          >
                            {Svg()?.[btn.icon]}
                          </div>
                          <div style={{
                            color: "rgb(19, 21, 23)",
                            fontSize: "16px",
                            fontWeight: "500",
                            position: "relative",
                            width: "100%"
                          }}
                          >
                            <button id={btn?.add_id}>{btn?.add_text}</button>
                            <button id={btn?.delete_id} className="fill-[#797979] absolute right-0 top-1 cursor-pointer">
                              {Svg().DeleteDark}
                            </button>
                          </div>
                          </div>
                        </div>



                      </Fragment>
                    ))}
                </div>

                <div className="w-full mt-6">
                  <h3 className="text-[#969498] text-[16px] mb-1 font-medium">
                    Custom Questions
                  </h3>
                  <div className="relative">
                    <Button
                      type={"button"}
                      className="dropdownListCommon"
                      onClick={handleDropDownOpen}
                    >
                      Choose Question
                      {Svg().SingleSelect}
                    </Button>
                    {openDropDown ? (
                      <div className="absolute w-full z-10 mt-3">
                        <ul className="boxShadow rounded-md bg-white w-full p-1">
                          {customQues?.length
                            ? customQues?.map((elem) => {
                              return (
                                <Button
                                  onClick={() => addBtn(elem)}
                                  key={elem?.id}
                                  type="button"
                                  className=" text-left text-gray-700 rounded flex justify-between items-center p-1 text-sm w-full hover:bg-[#f0f0f0] stroke-[#131517]"
                                >
                                  {elem?.label}
                                </Button>
                              );
                            })
                            : null}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div> */}

            </div>
          </div>

          <div className='popup-footer bg-[#FFFFFF] flex gap-5 p-4 items-center border-t-[1px] absolute bottom-0 left-0 w-full'>
            <Button className='flex items-center gap-2 btn-dark' type='button'>Save Changes</Button>
          </div>
        </div>

        <Modal
          open={openPreView}
          onClose={() => setOpenPreview(false)}
          showBtn={false}
          headerCls="p-0"
          bodyWrapperCls="p-0"
          ModalWrapperCls="ModalBoxContainer w-[4in] m-badge-preview"
        >
          <div dangerouslySetInnerHTML={{ __html: previewString }}></div>
        </Modal>
      </div>
    </GlobalLayout>
  );
};

export default BadgeCreate;
