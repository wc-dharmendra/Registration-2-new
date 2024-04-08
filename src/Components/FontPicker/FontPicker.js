import useCreateEvent from "@/CustomHook/useCreateEvent";
import Button from "../Button/Button";
import Svg from "../../../public/Assets/Svg";
import { useCallback, useEffect, useState } from "react";
import { FontList } from "@/Utils/FontList";
import Utils from "@/Utils/Utils";
import useEventStore from "@/Store/useEventStore";

const FontPicker = ({ inputData = {}, onChange = () => { } }) => {

    const { typefaceRef, handleTypefaceOpen, openTypeface, dropTypefaceRef } = useCreateEvent();
    const { createEventSetting, setColorNFont } = useEventStore();

    const [font, setFont] = useState(inputData?.font);
    const [fontFamily, setFontFamly] = useState([]);


    const onFontChange = useCallback((name, fontFamily) => {
        setFont(name);
        setColorNFont({ font: name, color: inputData?.color });
        if (onChange) onChange({ target: { name: "font", value: name === 'default' ? 'inter' : name } });
    }, [inputData]);

    useEffect(() => {
        let tempArr = [];
        if (createEventSetting?.theme_meta?.fonts?.length) {
            createEventSetting?.theme_meta?.fonts?.map((e) => {
                FontList.map((elem) => {
                    if (e?.name?.toLowerCase() === elem?.name) {
                        tempArr.push(elem);
                    }
                })

            });
            setFontFamly(tempArr);
        }
    }, [createEventSetting?.theme_meta?.fonts]);

    return (
        <div className="themePattern cursor-pointer relative">
            <Button
                type="button"
                buttonRef={typefaceRef}
                onClick={handleTypefaceOpen}
                className="flex items-center justify-between gap-2 px-3 py-3 w-full">
                <div className="flex gap-2">
                    <div className="inline-flex">
                        <div className="label flex-1 text-[#131517]">Ag</div>
                    </div>
                    <div className="label flex-1 text-[#595C5C] font-medium">Typeface</div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="text-[#969498]">{Utils?.capitalizeFirstWord(font)}</div>
                    <div className="text-[#969498]">{Svg().UpdownArrow}</div>
                </div>
            </Button>

            {openTypeface ? (
                <div
                    ref={dropTypefaceRef}
                    className="absolute bg-[#FFFFFF] right-3 w-[240px] sm:w-[315px] md:w-[350px] lg:w-[350px]  bottom-[44px] rounded-lg boxShadow"
                >
                    <div className="FontPickerInfo far-columns2 sm:far-columns3 md:far-columns4 px-3 py-3">
                        {fontFamily?.map(({ name, fontFamily, icon }) => {
                            return (
                                <Button onClick={() => { onFontChange(name, fontFamily) }} type="button" className={`PickerButton ${name === font || (name === 'default' && font === 'inter') ? "selected" : ""}`} key={name}>
                                    <div className="fontSvg">{Svg()?.[icon]}</div>
                                    <div className="text-center text-[12px]">{Utils?.capitalizeFirstWord(name)}</div>
                                </Button>
                            )
                        })}
                    </div>

                    <div className="clipPathBtm absolute bottom-[-5px] right-[30px] w-[10px] h-[5px] bg-[#FFFFFF]"></div>
                </div>
            ) : null}
        </div>
    )
}
export default FontPicker;