import Utils from '@/Utils/Utils';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Button from '../Button/Button';

const TimePicker = ({ value = '00:00', onChange = () => { }, editEvent = false, disabled = false }) => {
    const dropDownQuestionRef = useRef(null);
    const openDropQuestionRef = useRef(null);
    const [openDropQuestion, setOpenDropQuestion] = useState(false);
    const [time, setTime] = useState("");
    const [selectedTime, setSelectedTime] = useState(value);

    const handleDropQuestion = () => {
        setOpenDropQuestion(!openDropQuestion);
    }

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const formattedHour = hour.toString().padStart(2, '0');
                const formattedMinute = minute.toString().padStart(2, '0');
                options.push(`${formattedHour}:${formattedMinute}`);
            }
        }
        return options;
    };

    const onClick = (time) => {
        onChange(time);
        setTime(time);
        setOpenDropQuestion(false);
        setSelectedTime(time);
    }

    useEffect(() => {
        const calculateDropdownPosition = () => {
            if (openDropQuestionRef.current) {
                const dropdownContent = openDropQuestionRef.current;
                const rect = dropdownContent.getBoundingClientRect();
                const spaceAbove = rect.top;
                const spaceBelow = window.innerHeight - rect.bottom;

                if (spaceBelow < dropdownContent.offsetHeight && spaceAbove >= dropdownContent.offsetHeight) {
                    // Open from the top
                    dropdownContent.style.bottom = "100%";
                    dropdownContent.style.top = "auto";
                } else {
                    // Open from the bottom
                    dropdownContent.style.top = "100%";
                    dropdownContent.style.bottom = "auto";
                }
            }
        };

        if (openDropQuestion) {
            calculateDropdownPosition();
            window.addEventListener('resize', calculateDropdownPosition);

            return () => {
                window.removeEventListener('resize', calculateDropdownPosition);
            };
        }
    }, [openDropQuestion]);

    useLayoutEffect(() => {
        setTime(value);
    }, [value]);

    useEffect(() => {
        Utils?.removeModal(dropDownQuestionRef, openDropQuestionRef, () => {
            setOpenDropQuestion(false);
        });
    }, [dropDownQuestionRef, openDropQuestionRef]);

    const timeOptions = generateTimeOptions();

    return (
        <span className={`${editEvent ? 'font-semibold text-xl relative' : 'time bg-[#DFE0E1] rounded-r-md px-3 py-1 w-[100px] text-center relative text-[#131517] font-medium'}`}>
            <Button disabled={disabled} buttonRef={dropDownQuestionRef} type={'button'} className={`${editEvent ? 'text-[#131517] font-semibold text-left' : 'w-full'}`} onClick={handleDropQuestion}>
                {time}
            </Button>
            {openDropQuestion ?
                <div ref={openDropQuestionRef} className="boxShadow border p-1 absolute left-0 z-10 mt-3 w-[100px] rounded-md bg-white focus:outline-none max-h-52 overflow-auto">
                    <ul className='cursor-pointer'>
                        {timeOptions.map((time) => (
                            <Button type='button' onClick={() => onClick(time)} className={`w-full text-[#131517] text-sm flex gap-2 justify-center items-center rounded-sm hover:bg-[#DFE0E1] p-1 font-medium stroke-[#131517] ${selectedTime === time ? 'bg-[#DFE0E1]' : ''}`} key={time}>
                                {time}
                            </Button>
                        ))}
                    </ul>
                </div> : null}
        </span>
    );
};

export default TimePicker;
