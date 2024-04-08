import Svg from "../../../public/Assets/Svg";
import Button from "../Button/Button";
import BadgeAction from "./BadgeAction";

const BadgeRow = ({
    id = "",
    title = "",
    categories = [],
    onAction = () => { }
}) => {
    return (
        <div key={id} className="bg-[#FFFFFF] relative rounded-lg px-4 py-4 w-full mt-4 border border-[#D9E2E5]">
            <div className="w-full mb-0 flex items-center justify-between">
                <p className="paragraphHead font-medium">{title}</p>
                <BadgeAction
                    onClick={onAction}
                    actionData={{ id, title }}
                />
            </div>
            <div className="w-full flex items-center">
                <div className="tags-input">
                    {categories?.length ? categories?.map((elem) => {
                        return (
                            <span key={elem?.id} className="tag">
                                {elem?.title} {categories?.length > 1 ? <Button onClick={() => onAction("removeCat", categories?.filter((e) => e?.id !== elem?.id))} type="button">{Svg()?.CloseIcon}</Button> : null}
                            </span>
                        )
                    }) : null}
                </div>
            </div>
        </div>
    )
}
export default BadgeRow;