import React, { useCallback, useState } from 'react';
import Svg from '../../../public/Assets/Svg';
import useEventStore from '@/Store/useEventStore';

const ColorPickerComponent = ({ inputData = {}, onChange = () => { } }) => {
    const { setColorNFont } = useEventStore();
    const [selectedColor, setSelectedColor] = useState(inputData?.color);

    const handleColorChange = useCallback((event) => {
        const selectedColor = event.target.value;
        setSelectedColor(selectedColor);
        setColorNFont({ color: selectedColor, font: inputData?.font });
        if (onChange) onChange({ target: { name: "color", value: selectedColor } });
    }, [inputData]);

    return (
        <div className='relative flex justify-between items-center p-2 pr-3'>
            <div className='flex items-center gap-2 w-full'>
                <div className={`colorPicker`} style={{ backgroundColor: selectedColor }}>
                    <input
                        type="color"
                        id="colorPicker"
                        className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                        onChange={handleColorChange}
                    />
                </div>
                <div className="label text-[#595C5C] font-medium">Color</div>
            </div>
            <div className="flex grow justify-between">
                <div className="flex items-center gap-2">
                    <div className="text-[#969498]">
                        {selectedColor}
                    </div>
                    <div className="text-[#969498]">{Svg().UpdownArrow}</div>
                </div>
            </div>
        </div>
    );
};

export default ColorPickerComponent;
