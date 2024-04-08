import Svg from "../../../public/Assets/Svg";
import Button from "../Button/Button";

const CreateBadgeBtn = ({
    btnName = "Create New",
    title="M-Badge",
    onClick=()=>{}
}) => {
    return (
        <div className="w-full mb-5 flex items-center justify-between">
            <p className="paragraph font-semibold">{title}</p>
            <div className="AddHostInfo">
                <Button type="button"
                    onClick={() => {onClick()}} className="bg-[#DFE0E1] text-[#595C5C] text-[14px] rounded-lg px-3 py-1.5 font-medium hover:bg-[#131517] hover:text-[#EFEFF0] flex gap-2 items-center">
                    {Svg()?.AddGrayIcon} {btnName}
                </Button>
            </div>
        </div>)
}
export default CreateBadgeBtn;