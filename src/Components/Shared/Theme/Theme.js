import { Fragment } from "react";
import Button from "@/Components/Button/Button";
import { useTheme } from "next-themes";
import Svg from "../../../../public/Assets/Svg";
import useEventStore from "@/Store/useEventStore";
import PatternColorAndFont from "@/Components/PatternColorAndFont/PatternColorAndFont";

const Theme = ({ inputData = {}, setIsOpen = () => { }, onThemeChange = () => { }, value = "", url = "" }) => {
    const { resolvedTheme, setTheme } = useTheme();
    const { event, createEventSetting } = useEventStore();

    return (
        <Fragment>
            <div className={`inline-flex gap-2 dfdf`} >
                {createEventSetting?.theme_meta?.theme?.length && createEventSetting?.theme_meta?.theme?.map((e) => {
                    return (
                        <Button showLoader={false} disabled key={e?.name} type='button' onClick={(e) => {
                            e.preventDefault();
                            onThemeChange({ target: { name: "theme", value: e?.value } });
                            // setTheme(value);
                        }}>
                            <div className={`${value === e?.value ? "MinimalThemeFix activeBorder" : "MinimalThemeFix"}`}>
                                <div className="titleTheme">Title</div>
                                <div className="rowFirst"></div>
                                <div className="rowSecond"></div>
                            </div>
                            <span className="LayoutText">{e?.name}</span>
                        </Button>
                    )
                })}
            </div>
            {!(event?.id) && url ? <div className="w-full relative mt-6">
                <img
                    src={url}
                    className="relative rounded-lg mb-4 aspect-video object-contain bg-[#EFEFF0]"
                    title="Invited"
                    alt="Invited"
                />
                <Button
                    type="button"
                    className="absolute top-1 right-1 cursor-pointer"
                    onClick={() => { setIsOpen(true) }}
                >
                    {Svg().ChooseArrow}
                </Button>
            </div> : null}
            <div className={`${inputData.event_id ? 'bg-[#ffffff] border border-[#DDDFDF] mt-4 ' : 'bg-[#EFEFF0]'} bg-[#EFEFF0] w-full rounded-lg py-2`}>
                <PatternColorAndFont inputData={inputData} onChange={onThemeChange} />
            </div>
        </Fragment>
    )
}

const LayOut = ({ inputData = {}, setIsOpen = () => { }, onLayoutChange = () => { }, value = "", url = "" }) => {
    const { event, createEventSetting } = useEventStore();

    return (
        <Fragment>
            <div className={` ${inputData.event_id ? 'border-b-[1px] flex gap-2 grow pb-5' : 'inline-flex gap-2'}`} >
                {createEventSetting?.theme_meta?.layout?.length && createEventSetting?.theme_meta?.layout?.map((e) => {
                    return (
                        <Button showLoader={false} disabled key={e?.label} type='button' onClick={(e) => {
                            e.preventDefault();
                            onLayoutChange({ target: { name: "layout", value: e?.value } });
                        }}>
                            <div className={`${value === e?.label ? "ThemeLayout activeBorder" : "ThemeLayout"}`}>
                                <div className="themeHead"></div>
                                <div className="themeBody">
                                    <div className="leftContent"></div>
                                    <div className="rightContent">
                                        <div className="topContent"></div>
                                        <div className="bottomContent"></div>
                                    </div>
                                </div>
                            </div>
                            <span className="LayoutText">{e?.label}</span>
                        </Button>
                    )
                })}
            </div>
            {!(event?.id) && url ? <div className="w-full relative mt-6">
                <img
                    src={url}
                    className="relative rounded-lg mb-4 aspect-video object-contain bg-[#EFEFF0]"
                    title="Invited"
                    alt="Invited"
                />
                <Button
                    type="button"
                    className="absolute top-1 right-1 cursor-pointer"
                    onClick={() => setIsOpen(true)}
                >
                    {Svg().ChooseArrow}
                </Button>
            </div> : null}
        </Fragment>
    )
}
export { Theme, LayOut };