import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import Svg from '../../../public/Assets/Svg';
import Utils from '@/Utils/Utils';

function GuestSelector({ arr = [], onChange = () => { }, triggerAction = false }) {

    const [openGuestSelect, setOpenGuestSelect] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({});
    const GuestSelectButtonRef = useRef(null);
    const GuestSelectDropRef = useRef(null);

    const handleGuestSelectOpen = useCallback(() => {
        setOpenGuestSelect(!openGuestSelect);
    }, [openGuestSelect]);

    const handleOptionSelect = (key, value) => {
        let updatedOptions = {
            ...selectedOptions,
            [key]: value
        }
        if (onChange) onChange(Object.keys(updatedOptions));
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [key]: value
        }));
    };

    const handleOptionRemove = (key) => {
        setSelectedOptions(prevOptions => {
            const updatedOptions = { ...prevOptions };
            delete updatedOptions[key];
            if (onChange) onChange(Object.keys(updatedOptions))
            return updatedOptions;
        });

    };

    const Obj = arr?.reduce((obj, status) => {
        obj[status] = 0;
        return obj;
    }, {});

    const guestCountWithAll = {
        ...Obj
    };

    const handleCheckboxChange = (key, isChecked) => {
        setSelectedOptions(prevOptions => {
            if (isChecked) {
                let updatedOptions = {
                    ...prevOptions,
                    [key]: guestCountWithAll[key]
                }
                if (onChange) onChange(Object.keys(updatedOptions));
                return {
                    ...prevOptions,
                    [key]: guestCountWithAll[key]
                };
            } else {
                const { [key]: removedOption, ...restOptions } = prevOptions;
                if (onChange) onChange(Object.keys(restOptions));
                return restOptions;
            }
        });
    };

    useEffect(() => {
        Utils?.removeModal(GuestSelectDropRef, GuestSelectButtonRef, () => {
            setOpenGuestSelect(false);
        });
        return (() => {
            setSelectedOptions({})
        })
    }, [GuestSelectButtonRef, GuestSelectDropRef]);


    useEffect(() => {
        if(!triggerAction){
            // setSelectedOptions({});
        }
    }, [triggerAction]);


    return (
        <div className="CategoryToggle relative">
            <div className="relative">
                <input
                    placeholder="Select"
                    id={''}
                    defaultValue={'all'}

                    type={"button"}
                    className="cursor-pointer border-[1px] border-[#D4D4D4] focus:border-[#000] hover:border-[#595C5C] rounded-md min-h-[40px] w-full px-2 bg-transparent outline-none flex gap-2 justify-between items-center relative z-10 opacity-0 peer"
                />
                <div className="border-[1px] border-[#D4D4D4] peer-focus:border-[#000] peer-hover:border-[#595C5C] gap-1 rounded-md flex justify-between items-center absolute top-0 left-0 w-full h-full px-2 bg-[#ffffff] z-10">
                    <div className='flex gap-1 overflow-auto py-1'>
                        {Object.keys(selectedOptions).length ? Object.keys(selectedOptions).map((key) => (
                            <div key={key} className="relative">
                                <Button
                                    className="text-left text-gray-700 flex justify-between items-center px-2 py-1 text-sm w-full bg-[#EFEFF0] hover:bg-[#DFE0E1] stroke-[#131517] relative rounded-md gap-1 whitespace-nowrap"
                                    onClick={() => handleOptionRemove(key)}
                                >
                                    {key}
                                    {/* ({selectedOptions[key]}) */}
                                    <button
                                        className="rounded-full text-gray-500 focus:outline-none"
                                        onClick={() => handleOptionRemove(key)}
                                    >
                                        {Svg().Cross}
                                    </button>
                                </Button>
                            </div>
                        ))
                            : <p>Select</p>}
                    </div>
                    <div className='cursor-pointer border-l p-2' type='button' ref={GuestSelectButtonRef} onClick={handleGuestSelectOpen}>{Svg()?.DownArrowDark}</div>
                </div>
            </div>

            {openGuestSelect ? (
                <div className="pt-2 w-full absolute md:right-0 z-20">
                    <div
                        ref={GuestSelectDropRef}
                        className="boxShadow w-full origin-top-right rounded-md bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                        <div className="p-1">
                            {guestCountWithAll && Object.entries(guestCountWithAll).map(([key, value]) => (
                                <div key={key} className="relative">
                                    <Button
                                        className="text-left text-gray-700 rounded flex justify-between items-center px-2 py-1 text-sm w-full hover:bg-[#DFE0E1] stroke-[#131517] relative"
                                        onClick={() => handleOptionSelect(key, value)}
                                    >
                                        {key}
                                        {/* ({value}) */}
                                        <input
                                            type="checkbox"
                                            defaultChecked={selectedOptions[key] !== undefined}
                                            className="cursor-pointer w-full h-full accent-black absolute left-0 top-0 opacity-0 multi-select-check peer"
                                            onChange={(e) => handleCheckboxChange(key, e.target.checked)}
                                        />
                                        <span className="hidden peer-checked:block">
                                            {Svg().Checkbox}
                                        </span>
                                    </Button>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default GuestSelector;
