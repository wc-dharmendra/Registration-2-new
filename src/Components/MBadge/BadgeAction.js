import Utils from "@/Utils/Utils";
import React, { useEffect, useRef, useState } from "react";
import Svg from "../../../public/Assets/Svg";
import Button from "../Button/Button";
import useCommonStore from "@/Store/useCommonStore";

function BadgeAction({
    actionData = {},
    onClick = () => { },
    actionButtons = [
        { name: "Edit", icon: "Edit", onClick, stroke: "none" },
        { name: "Download", icon: "Download", onClick, stroke: "[#AFB0B0]" },
        { name: "Duplicate", icon: "CopyLink", onClick, stroke: "[#AFB0B0]" },
        { name: "Delete", icon: "Delete", onClick, stroke: "none" },
    ],
}) {

    const { isLoading } = useCommonStore();

    const dropDownRef = useRef(null);
    const openDropRef = useRef(null);
    const [openDropBox, setOpenDropBox] = useState(false);

    const handleDrop = () => {
        setOpenDropBox(!openDropBox);
    };
    useEffect(() => {
        Utils?.removeModal(dropDownRef, openDropRef, () => {
            setOpenDropBox(false);
        });
    }, [dropDownRef, openDropRef]);
    return (
        <div className="relative">
            <Button
                className="flex items-center gap-[2px] text-sm py-1 max-sm:h-[30px]"
                type="button"
                buttonRef={dropDownRef}
                onClick={() => {
                    handleDrop();
                }}
            >
                <div className="w-1 h-1 bg-[#838485] rounded-full"></div>
                <div className="w-1 h-1 bg-[#838485] rounded-full"></div>
                <div className="w-1 h-1 bg-[#838485] rounded-full"></div>
            </Button>

            {openDropBox ? (
                <div
                    ref={openDropRef}
                    className="absolute boxShadowBorder py-2 px-2  right-[-4px] z-10 mt-1 w-[120px] rounded-md bg-white focus:outline-none"
                >
                    <ul className="cursor-pointer">
                        {actionButtons?.map(({ name, icon, onClick, stroke }) => {
                            return (
                                <Button
                                    showLoader={false}
                                    key={name}
                                    disabled={isLoading}
                                    type="button"
                                    className={`w-full text-[#131517] text-sm flex gap-2 justify-start items-center rounded-sm p-1 font-medium stroke-[#131517] `}
                                    onClick={() => onClick(name?.toLowerCase(), actionData)}
                                >
                                    {" "}
                                    <div className={`fill-[#AFB0B0] stroke-${stroke}`}>
                                        {Svg()?.[icon]}
                                    </div>{" "}
                                    {name}{""}
                                </Button>
                            )
                        })}
                    </ul>
                    <div className="clipPath absolute top-[-5px] right-[10px] w-[10px] h-[5px] bg-[#FFFFFF]"></div>
                </div>
            ) : null}
        </div>
    );
}

export default BadgeAction;
