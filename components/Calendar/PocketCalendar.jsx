'use client';

import { useState, useEffect } from 'react';
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from 'lucide-react';
import Tooltip from '@root/components/ui/Tooltip';
import YearInput from '@root/components/Calendar/YearInput';
import MonthCalendar from './MonthCalendar';
import { roxborough } from '@root/lib/fonts';
import DATime from '@root/lib/da-time';
import { cn } from '@root/lib/utils';

export default function PocketCalendar({ date, onChange, onClickChange, dayClassName }) {
  const [stateDate, setStateDate] = useState(date);

  function handleMonthChange(month, action) {
    return () => {
      let year = stateDate?.year;
      if (!stateDate) return;
      let _month = month;
      if (action === 'prev') {
        if (month === 1) {
          year -= 1;
          _month = 12;
        } else {
          _month = month - 1;
        }
      } else if (action === 'next') {
        if (month === 12) {
          year += 1;
          _month = 1;
        } else {
          _month = month + 1;
        }
      }
      const newDate = new DATime(
        `${stateDate.day === 31 ? 1 : stateDate.day}/${_month}/${DATime.convertYearToString(year)}`
      );
      setStateDate(newDate);
      if (onChange) onChange(newDate);
    };
  }

  function handleChange(day) {
    setStateDate(day);
    if (onChange) onChange(day);
  }

  function handleClickChange(day) {
    setStateDate(day);
    if (onChange) onChange(day);
    else if (onClickChange) onClickChange(day);
  }

  function handleMonthClick(m) {
    return () => {
      const newDate = new DATime(`${stateDate.day}/${m}/${DATime.convertYearToString(stateDate.year)}`);
      setStateDate(newDate);
      if (onChange) {
        onChange(newDate);
      }
    }
  }

  useEffect(() => {
    setStateDate(date);
  }, [date]);

  return (
    <div className="px-10 py-6 border-1 bg-background border-secondary rounded-md">
      <div className="flex items-center">
        <div
          onClick={handleMonthChange(stateDate?.month, 'prev')}
          className="cursor-pointer hover:bg-foreground/30 rounded-full p-1 transition-all duration-300"
        >
          <ChevronLeftCircleIcon className="h-8 w-8" />
        </div>
        <div className="flex justify-center items-center flex-col flex-1">
          <YearInput date={stateDate} onChange={handleChange} size="small" />
          <div className={`${roxborough.className} text-secondary text-lg`}>
            {DATime.monthNames[stateDate?.month - 1]}
          </div>
        </div>
        <div
          onClick={handleMonthChange(stateDate?.month, 'next')}
          className="cursor-pointer hover:bg-foreground/30 rounded-full p-1 transition-all duration-300"
        >
          <ChevronRightCircleIcon className="h-8 w-8" />
        </div>
      </div>
      <MonthCalendar
        month={stateDate?.month}
        date={stateDate}
        onChange={handleClickChange}
        className={dayClassName}
      />
      <div className="flex justify-between items-center mt-4">
        {DATime.monthNames.map((_, i) => (
          <Tooltip key={i} content={DATime.monthNames[i]}>
            <div
              key={i}
              className={cn(
                'flex justify-center items-center hover:text-primary transition-all duration-300 cursor-pointer',
                stateDate?.month === i + 1 ? 'text-primary' : 'text-foreground'
              )}
              onClick={handleMonthClick(i + 1)}
            >
              {i + 1}
            </div>
          </Tooltip>
        ))}
      </div>  
    </div>
  )
}
