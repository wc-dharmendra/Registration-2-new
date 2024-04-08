import Utils from '@/Utils/Utils';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Svg from '../../../public/Assets/Svg';
import Button from '../Button/Button';
import useCartStore from '@/Store/useCartStore';

function MultiSelect({ parseOptions = [], arr = [], id = "", i = "", index = "", searchBy = "text", sentBy = "value", searchPlaceholder = "" }) {
    const { setPaymentSuccess, isPaymentSuccess } = useCartStore();

    const [openMultiSelect, setOpenMultiSelect] = useState(false);
    const MultiSelectButtonRef = useRef(null);
    const multiSelectDropRef = useRef(null);

    const handleMultiSelectOpen = useCallback(() => {
        setOpenMultiSelect(!openMultiSelect);
    }, [openMultiSelect]);

    useEffect(() => {
        Utils?.removeModal(multiSelectDropRef, MultiSelectButtonRef, () => {
            setOpenMultiSelect(false);
        });
    }, [MultiSelectButtonRef, multiSelectDropRef]);

    return (
        <div className="CategoryToggle relative">
            <div className="relative">
                <input
                    placeholder="Select"
                    id={id + index}
                    defaultValue={arr[i]?.value?.toString()}
                    ref={MultiSelectButtonRef}
                    onClick={handleMultiSelectOpen}
                    type={"button"}
                    className="cursor-pointer border-[1px] border-[#D4D4D4] focus:border-[#000] hover:border-[#595C5C] rounded-md h-[40px] w-full px-2 bg-transparent outline-none flex gap-2 justify-between items-center relative z-10 opacity-0 peer"
                />
                <div className="border-[1px] border-[#D4D4D4] peer-focus:border-[#000] peer-hover:border-[#595C5C] rounded-md flex justify-between items-center absolute top-0 left-0 w-full h-full px-2 bg-[#EFEFF0]">
                    <p>Select</p>
                    {Svg()?.DownArrowDark}
                </div>
            </div>
            <p
                className="text-[#595c5c] text-sm overflow-auto whitespace-nowrap"
                id={id + index}
            >
                {arr[i]?.value?.toString()}
            </p>
            {openMultiSelect ? (
                <div className="pt-2 w-full absolute md:right-0 z-20">
                    <div
                        ref={multiSelectDropRef}
                        className="boxShadow w-full origin-top-right rounded-md bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                        <div className="p-1">
                            {parseOptions?.length
                                ? parseOptions?.map((option) => {
                                    return (
                                        <Button
                                            key={option?.value}
                                            // type="button"
                                            className="text-left text-gray-700 rounded flex justify-between items-center px-2 py-1 text-sm w-full hover:bg-[#DFE0E1] stroke-[#131517] relative"
                                        >
                                            {option?.text}
                                            <input
                                                // id={id + index}
                                                type="checkbox"
                                                defaultChecked={arr[i]?.value?.includes(
                                                    option?.value
                                                )}
                                                className="cursor-pointer w-full h-full accent-black absolute left-0 top-0 opacity-0 multi-select-check peer"
                                                onChange={(e) => {
                                                    if (
                                                        !arr[i]?.value?.includes(option?.value)
                                                    ) {
                                                        arr[i].value = [
                                                            ...arr[i].value,
                                                            option?.value,
                                                        ];
                                                    } else if (
                                                        arr[i]?.value?.includes(option?.value)
                                                    ) {
                                                        arr[i].value = arr[i]?.value?.filter(
                                                            (e) => e !== option?.value
                                                        );
                                                    }
                                                    setPaymentSuccess({
                                                        ...isPaymentSuccess,
                                                        showBtn: false
                                                    });
                                                }}
                                            />
                                            <span className="hidden peer-checked:block">
                                                {Svg().Checkbox}
                                            </span>
                                        </Button>
                                    );
                                })
                                : null}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default MultiSelect