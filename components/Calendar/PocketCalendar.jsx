'use client';

import YearInput from '../CircularRelation/YearInput';
import MonthCalendar from './MonthCalendar';
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from 'lucide-react';
import { roxborough } from '@root/lib/fonts';
import DATime from '@root/lib/da-time';

export default function PocketCalendar({ date, onChange, dayClassName }) {
  function handleMonthChange(month, action) {
    return () => {
      if (!date) return;
      let _month = month;
      if (action === 'prev') {
        _month = month - 1;
      } else if (action === 'next') {
        _month = month + 1;
      }
      onChange(new DATime(`${date.day === 31 ? 1 : date.day}/${_month}/${DATime.convertYearToString(date.year)}`));
    };
  }

  return (
    <div className="px-10 py-6 border-1 bg-background border-secondary rounded-md">
      <div className="flex items-center">
        <div
          onClick={handleMonthChange(date?.month, 'prev')}
          className="cursor-pointer hover:bg-foreground/30 rounded-full p-1 transition-all duration-300"
        >
          <ChevronLeftCircleIcon className="h-8 w-8" />
        </div>
        <div className="flex justify-center items-center flex-col flex-1">
          <YearInput date={date} onChange={onChange} size="small" />
          <div className={`${roxborough.className} text-secondary text-lg`}>
            {DATime.monthNames[date?.month - 1]}
          </div>
        </div>
        <div
          onClick={handleMonthChange(date?.month, 'next')}
          className="cursor-pointer hover:bg-foreground/30 rounded-full p-1 transition-all duration-300"
        >
          <ChevronRightCircleIcon className="h-8 w-8" />
        </div>
      </div>
      <MonthCalendar month={date?.month} date={date} onChange={onChange} className={dayClassName} />
    </div>
  )
}
