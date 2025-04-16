'use client';

import { useMemo } from 'react';
import DATime from '@root/lib/da-time';
import { roxborough } from '@root/lib/fonts';
import YearInput from '../CircularRelation/YearInput';
import MonthCalendar from './MonthCalendar';

export default function Calendar({ date, onChange, events }) {
  const calendar = useMemo(() => (
    date ? DATime.getCalendar(DATime.convertYearToString(date.year)) : { byMonth: [], byDay: [] }
  ), [date]);

  return (
    <div className="w-full h-full rounded-md bg-gradient-to-br from-secondary to-background px-10 py-6">
      <div className={`${roxborough.className} flex justify-center text-background text-2xl mb-4`}>
        <YearInput date={date} onChange={onChange} />
      </div>
      <div className="grid grid-cols-4">
        {calendar.byMonth.map((month, index) => (
          <div key={DATime.monthNames[index]} className="border-1 border-secondary p-4 bg-background">
            <div className={`${roxborough.className} flex justify-center text-secondary text-lg mb-4`}>
              {DATime.monthNames[index]}
            </div>
            <MonthCalendar month={index + 1} date={date} onChange={onChange} events={events} />
          </div>
        ))}
      </div>
    </div>
  );
}
