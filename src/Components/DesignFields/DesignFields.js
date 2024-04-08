import { useRef, useState } from "react";
import Button from "@/Components/Button/Button";
import Svg from "../../../public/Assets/Svg";
import SearchBox from "@/Components/SearchBox/SearchBox";
import useBadgeStore from "@/Store/useBadgeStore";
import CustomBox from "../customBox/customBox";
import BadgeField from "./BadgeField";
import ShowToast from "@/Toaster/Toaster";

const DesignFields = ({
    companyArr = [], uniqueCodeArr = [], nameArr = [], firstNameArr = [], lastNameArr = [], qrCodeArr = [], dateArr = [], oidArr = [], setCompanyArr = () => { }, setNameArr = () => { }, setFirstNameArr = () => { }, setLastNameArr = () => { }, setQrcodeArr = () => { }, setUniqueCodeArr = () => { }, setDateArr = () => { }, setOidArr = () => { }, activateHandler = true, badgeInputData = {}, onChange = () => { }, onChangeBadgeDimension = () => { }, selectedBadgeData
}) => {

    const dropDownAddFieldRef = useRef(null);
    const openDropAddFieldRef = useRef(null);
    const [openDropAddField, setOpenDropAddField] = useState(false);

    const { badgeConfig } = useBadgeStore();

    const handleDropAddField = () => {
        setOpenDropAddField(!openDropAddField);
    }

    const addNewBox = (arr, setArr, name, keyName, url = "", isEdit = false, dimension) => {
        if (activateHandler) {
            // if ((!isEdit)) {

            let fontSize = '44px';

            if (keyName === 'name') {
                fontSize = '44px';
            } else if (keyName === 'unique_code') {
                fontSize = '28px';
            } else if (keyName === 'company') {
                fontSize = '34px';
            }


            setArr([<CustomBox payload={dimension} onChangeBadgeDimension={onChangeBadgeDimension} id={keyName} key={keyName}>
                <h2
                    name={keyName}
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        textAlign: "center",
                        overflow: "hidden",
                        fontFamily: "sans-serif",
                        fontSize: fontSize,
                        fontWeight: '600',
                        margin: 0,
                        lineHeight: 1.5
                    }}
                >{name}</h2>
            </CustomBox>]);
            // }
        } else {
            ShowToast({ variant: "info", message: "Please provide backgroung image." })
        }
    };

    const addQrBox = (arr, setArr, name, keyName, url = "", isEdit = false, dimension) => {
        if (activateHandler) {
            // if ((!arr?.length)) {
            setArr([<CustomBox payload={dimension} onChangeBadgeDimension={onChangeBadgeDimension} id={keyName} key={keyName}>
                <img
                    src={url}
                    name={name}
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        outline: "none",
                    }}
                    title={name}
                    alt={name}
                />
                {/* <div style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    outline: "none",
                }}>
                    {Svg().QrCodeImg}
                </div> */}
            </CustomBox>]);
            // }
        } else {
            ShowToast({ variant: "info", message: "Please provide backgroung image." })
        }
    };

    return (
        <div className='DesignFieldsTab 1'>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                {badgeConfig?.fields?.default?.name ?
                    <BadgeField dimension={selectedBadgeData} badgeId={selectedBadgeData?.id || selectedBadgeData?.title} icon="NameUserIcon" arr={nameArr} arrHandler={setNameArr} value={badgeConfig?.fields?.default?.name} name={"name"} onFieldClick={addNewBox} />
                    : null}
                {badgeConfig?.fields?.default?.first_name ?
                    <BadgeField dimension={selectedBadgeData} badgeId={selectedBadgeData?.id || selectedBadgeData?.title} icon="NameUserIcon" arr={firstNameArr} arrHandler={setFirstNameArr} value={badgeConfig?.fields?.default?.first_name} name={"first_name"} onFieldClick={addNewBox} />
                    : null}

                {badgeConfig?.fields?.default?.last_name ? <BadgeField dimension={selectedBadgeData} badgeId={selectedBadgeData?.id || selectedBadgeData?.title} icon="NameUserIcon" arr={lastNameArr} arrHandler={setLastNameArr} value={badgeConfig?.fields?.default?.last_name} name={"last_name"} onFieldClick={addNewBox} />
                    : null}
                {badgeConfig?.fields?.default?.company ?
                    <BadgeField dimension={selectedBadgeData} badgeId={selectedBadgeData?.id || selectedBadgeData?.title} icon="NameUserIcon" arr={companyArr} arrHandler={setCompanyArr} value={badgeConfig?.fields?.default?.company} name={"company"} onFieldClick={addNewBox} />
                    : null}
                {badgeConfig?.fields?.default?.qr_code ? <BadgeField dimension={selectedBadgeData} badgeId={selectedBadgeData?.id || selectedBadgeData?.title} icon="QRCodeIcon" arr={qrCodeArr} arrHandler={setQrcodeArr} bageUrl={badgeConfig?.fields?.default?.qr_code} value={"QR CODE"} name={"qr_code"} onFieldClick={addQrBox}>
                    <div className="RegisterListForm">
                        <div className="inputGroup CheckBoxInput  absolute right-10 top-0.5">
                            <input id="makeContact" checked={badgeInputData?.is_contact_card} name="is_contact_card" type="checkbox" onChange={(e) => onChange({ target: { name: "is_contact_card", value: e?.target?.checked } })} />
                            <label htmlFor="makeContact">
                                Make this contact card
                            </label>
                        </div>
                    </div>
                </BadgeField>
                    : null}

                {badgeConfig?.fields?.default?.unique_code ?
                    <BadgeField dimension={selectedBadgeData} badgeId={selectedBadgeData?.id || selectedBadgeData?.title} icon="NameUserIcon" arr={uniqueCodeArr} arrHandler={setUniqueCodeArr} value={badgeConfig?.fields?.default?.unique_code} name={"unique_code"} onFieldClick={addNewBox} />
                    : null}

                {badgeConfig?.fields?.default?.date_1712549905301 ?
                    <BadgeField dimension={selectedBadgeData} badgeId={selectedBadgeData?.id || selectedBadgeData?.title} icon="DateCalenderIcon" arr={dateArr} arrHandler={setDateArr} value={badgeConfig?.fields?.default?.date_1712549905301} name={"date_1712549905301"} onFieldClick={addNewBox} />
                    : null}

                {badgeConfig?.fields?.default?.order_id_1712558191795 ?
                    <BadgeField dimension={selectedBadgeData} badgeId={selectedBadgeData?.id || selectedBadgeData?.title} icon="CustomQuestion" arr={oidArr} arrHandler={setOidArr} value={badgeConfig?.fields?.default?.order_id_1712558191795} name={"order_id_1712558191795"} onFieldClick={addNewBox} />
                    : null}

                {/* {badgeConfig?.fields?.default?.event_date?.start_date ? <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#DFE0E1', borderRadius: '.375rem', width: '30px', height: '30px' }}>{Svg().DateCalenderIcon}</div>
                    <div style={{ color: '#131517', fontSize: '16px', fontWeight: '500' }}>Date</div>
                </div> : null} */}

            </div>

            {/* <div style={{ width: '100%', marginTop: '2rem' }}>
                <Button buttonRef={dropDownAddFieldRef} type="button" style="color: #f90"
                    className="AddCustomFields"
                    onClick={handleDropAddField}>
                    Add A Field
                    {Svg().SingleSelect}
                </Button>
                {openDropAddField ? <div ref={openDropAddFieldRef} >

                    <div className="AddFieldHere" >
                        <div className="SearchBoxCustomFields">
                            <SearchBox placeholder="Search" />
                        </div>
                        <ul className="MenuListUl" style={{ padding: '5px 5px' }}>
                            {Object.entries(badgeConfig?.fields?.custom)?.length ? Object.entries(badgeConfig?.fields?.custom)?.map(([key, value]) => ({ [key]: value })).map((e) => {
                                return (
                                    <li key={Object?.keys(e)?.join(', ')} className="rounded-md hover:bg-[#F0F0F0]" style={{ color: '#131517', fontSize: '14px', cursor: 'pointer', padding: '4px 8px' }}>{Object?.values(e)?.join(', ')}</li>
                                )
                            }) : null}
                        </ul>
                    </div>

                </div> : null}
            </div> */}
        </div>

    )
}

export default DesignFields;