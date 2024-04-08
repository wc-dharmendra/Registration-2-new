import { useEffect, useState } from "react";
import Svg from "../../../public/Assets/Svg";
import Button from "../Button/Button";

const BadgeField = ({
    bageUrl = "",
    icon = '',
    arr = [],
    arrHandler = () => { },
    value = '',
    name = '',
    onFieldClick = () => { },
    badgeId = "",
    children,
    dimension,
    cb = () => { }
}) => {
    // console.log({ name }, dimension);
    const [badgeIcon, setBadgeIcon] = useState("");
    const [badgeArr, setBadgeArr] = useState([]);
    const [badgeValue, setBadgeValue] = useState("");
    const [badgeName, setBadgeName] = useState("");


    useEffect(() => {
        setBadgeIcon(icon);
        setBadgeArr(arr);
        setBadgeValue(value);
        setBadgeName(name)
    }, [icon, arr, value, name]);

    useEffect(() => {
        if (badgeId && dimension?.payload?.[name]?.color) {
            onFieldClick(["arr"], arrHandler, value, name, bageUrl, true, dimension?.payload?.[name]);
        }
    }, [badgeId]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#DFE0E1', borderRadius: '.375rem', width: '30px', height: '30px' }}>
                {Svg()?.[badgeIcon]}</div>
            <div style={{ color: '#131517', fontSize: '16px', fontWeight: '500', position: 'relative', width: '100%' }}>
                <button
                    onClick={() => {
                        onFieldClick(badgeArr, arrHandler, badgeValue, badgeName, bageUrl);
                    }}
                >{badgeValue}
                </button>
                {children ? children : null}
                <Button type="button" onClick={() => {
                    arrHandler([]);
                    if (cb) cb(name);
                }} className="absolute right-0 top-1 cursor-pointer fill-[#797979]">{Svg().DeleteDark}</Button>
            </div>
        </div>
    )
}
export default BadgeField;