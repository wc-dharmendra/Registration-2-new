import Svg from "../../../public/Assets/Svg";
import Button from "../Button/Button";
import ToggleButton from "../ToggleButton/ToggleButton";
import dynamic from "next/dynamic";
import TextEditor from "../TextEditor/TextEditor";
const QuillEditor = dynamic(() => import('./QuillEditor/QuillEditor'), { ssr: false });

const Editor = ({
    i = "",
    e = {},
    arr = [],
    inputData = {},
    setInputData = () => { },
    setIseleted = () => { }
}) => {
    return (
        <div className="boxShadow bg-[#fff] mt-2 px-[18px] py-[12px] rounded-[8px]" id={`tab${i}`}>
            <div className="flex items-center justify-between mb-3">
                {i === 0 ? <h4 className="text-[#131517] font-semibold text-[16px]">{e?.name}</h4> : null}
                {i > 0 ? <input
                    defaultValue={e?.name}
                    onChange={(e) => {
                        arr[i]["name"] = e?.target?.value;
                    }}
                    minLength={2}
                    maxLength={40}
                    type="text"
                    placeholder="Type name"
                    className="rounded-t-[10px] w-full text-[#131517] font-semibold border-b border-none outline-none text-[16px] px-[10px] py-[6px]" /> : null}
            </div>
            <div className="w-full relative border-1 bottom-[#EBECED] rounded-[8px]">
                {/* <textarea
                    maxLength={3000}
                    defaultValue={e?.content}
                    onChange={(e) => {
                        arr[i]["content"] = e?.target?.value;
                    }}
                    name="description"
                    className="form-control h-[120px] pl-24px mb-0 w-full"
                    placeholder="Who should come? What’s the event about"
                ></textarea> */}
                {/* <TextEditor /> */}
                <QuillEditor
                    value={e?.content}
                    onChange={(e) => {
                        if (arr[i]) {
                            arr[i]["content"] = e;
                        }
                    }} />
                {i > 0 ? <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4">
                        <ToggleButton
                            initialVal={e?.status ? 1 : 0}
                            onChange={(value, cb) => {
                                arr[i]["status"] = value ? 1 : 0;
                            }}
                            large
                        /> <span className="text-[#969498] text-[14px] font-medium">Status</span>
                    </div>
                    <Button type="button" className="p-[6px]" onClick={() => {
                        setIseleted(true);
                        arr.splice(i, 1);
                        setInputData({
                            ...inputData,
                            description: arr
                        });
                        setTimeout(() => {
                            setIseleted(false);
                        });
                    }}>{Svg()?.DeleteDark}</Button>
                </div> : null}
            </div>
        </div>
    )
}
export default Editor;