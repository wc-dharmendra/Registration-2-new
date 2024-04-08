import React, { useState } from "react";
import styles from "./datepicker.module.css";
import dayjs from "dayjs";

const DatePicker = ({
  name = "",
  value = dayjs().format("YYYY-MM-DD"),
  onDateChange = () => {},
  showTimePicker = false,
  min = dayjs().format("YYYY-MM-DD"),
  editEvent = false,
  type='date'
}) => {
  const [selectedDate, setSelectedDate] = useState(value);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    onDateChange(
      {
        target: {
          name,
          value: (event?.target?.value || "")?.replace("T", " "),
        },
      },
      (data) => setSelectedDate(data)
    );
  };

  return (
    <div className="calender">
      <span className="flex gap-1 relative">
        {/* <span className='date bg-[#DFE0E1] rounded-md relative px-2 py-1 w-[118px] h-[32px] text-center text-[15px]'>{dayjs(selectedDate).format('ddd, D MMM')}</span> */}
        <input
          className={"input"}
          type={type}
          value={selectedDate}
          min={min}
          onChange={handleDateChange}
        />
      </span>
    </div>
  );
};

export default DatePicker;
