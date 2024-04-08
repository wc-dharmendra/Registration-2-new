import { Fragment } from "react";
import ColorPickerComponent from "../ColorPicker/ColorPicker";
import FontPicker from "../FontPicker/FontPicker";


const PatternColorAndFont = ({ inputData = {}, onChange = () => { } }) => {
    return (
        <Fragment>
            <div className="px-1 relative">
                {/* <div className="themePattern cursor-pointer relative">
                    <Button
                        buttonRef={patternBGRef}
                        onClick={handlePatternOpen}
                        className="flex items-center gap-2 px-3 py-3 overflow-hidden justify-between w-full"
                        type="button"
                    >
                        <div className="bg-[#f00] h-[24px] w-[24px] rounded-[100%] mb-4"></div>
                        <div className="flex grow justify-between border-b border-[#DDDFDF] pb-3">
                            <div className="label text-[#595C5C]">Pattern</div>
                            <div className="flex items-center gap-2">
                                <div className="text-[#969498]">{inputData?.pattern}</div>
                                <div className="text-[#969498]">{Svg().UpdownArrow}</div>
                            </div>
                        </div>
                    </Button>

                    {openPattern ? (
                        <div
                            ref={dropPatternRef}
                            className="absolute bg-[#FFFFFF] right-3 w-[350px] bottom-[44px] rounded-lg boxShadow"
                        >
                            <div className="patternBg py-1">
                                {["Cross", "Hypnotic", "Plus", "Polkadot", "Wave", "Zigzag"].map((label) => (
                                    <Button key={label} type="button" onClick={() => setInputData({
                                        ...inputData,
                                        pattern: label
                                    })}>
                                        {label}
                                    </Button>
                                ))}
                            </div>
                            <div className="clipPathBtm absolute bottom-[-5px] right-[30px] w-[10px] h-[5px] bg-[#FFFFFF]"></div>
                        </div>
                    ) : null}
                </div> */}
            </div>
            <div className="px-1 relative">
                <div className="themePattern cursor-pointer relative">
                    <ColorPickerComponent onChange={onChange} inputData={inputData} />
                </div>
                <div className="divider-row"></div>
            </div>
           
            <div className="px-1">
                <FontPicker onChange={onChange} inputData={inputData} />
            </div>
        </Fragment>
    )
}
export default PatternColorAndFont;