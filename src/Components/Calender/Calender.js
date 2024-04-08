import React, { useLayoutEffect, useState } from 'react';
import styles from './calender.module.css';
import dayjs from 'dayjs';

const CalendarInput = ({ name = "", value = dayjs().format('YYYY-MM-DD'), onDateChange = () => { }, showTimePicker = false, min = dayjs().format('YYYY-MM-DD'), max = '', editEvent = false, preVal = dayjs().format('YYYY-MM-DD'), disabled = false }) => {

  const [selectedDate, setSelectedDate] = useState("");
  const handleDateChange = (event) => {
    if (!event?.target?.value) {
      setSelectedDate(preVal);
      onDateChange({ target: { name, value: (preVal || "")?.replace('T', " ") } })
    } else {
      setSelectedDate(event?.target?.value);
      onDateChange({ target: { name, value: (event?.target?.value || "")?.replace('T', " ") } });
    }
  }

  useLayoutEffect(() => {
    setSelectedDate(value);
  }, [value]);

  return (
    <div className={`${editEvent ? 'mb-2' : ''} calender`}>
      <span className='flex gap-1 relative'>
        {editEvent ? <span className={`${disabled ? 'opacity-80' : ''} date text-sm text-center font-medium text-[#131517]`}>{dayjs(selectedDate).format('ddd, D MMM')}</span>
          :
          <span className='date bg-[#DFE0E1] rounded-l-md relative px-2 py-1 w-[118px] h-[32px] text-center text-[15px] text-[#131517] font-medium'>{dayjs(selectedDate).format('ddd, D MMM')}</span>}
        <input
          className={styles.input}
          type="date"
          value={selectedDate}
          min={min}
          max={max}
          onChange={handleDateChange}
          disabled={disabled}
        />
      </span>
    </div>
  );
};

export default CalendarInput;
