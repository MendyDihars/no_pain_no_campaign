'use client';

import { useMemo } from 'react';
import DATime from '@root/lib/da-time';
import { useCircular } from '@root/contexts/CircularContext';
import { roxborough } from '@root/lib/fonts';
import Tooltip from '@root/components/ui/Tooltip';

export default function Calendar() {
  const { date } = useCircular();
  console.log('date', date)

  const calendar = useMemo(() => (
    date ? DATime.getCalendar(DATime.convertYearToString(date.year)) : { byMonth: [], byDay: [] }
  ), [date]);
  console.log('calendar', calendar)

  return (
    <div className="w-full h-full rounded-md bg-gradient-to-br from-primary to-secondary px-10 py-6">
      <div className={`${roxborough.className} flex justify-center text-background text-2xl mb-4`}>
        {DATime.convertYearToString(date.year)}
      </div>
      <div className="grid grid-cols-4">
        {calendar.byMonth.map((month, index) => (
          <div key={month.month} className="border-1 border-secondary p-4 bg-background">
            <div className={`${roxborough.className} flex justify-center text-secondary text-lg mb-4`}>
              {DATime.monthNames[index]}
            </div>
            <div className="grid grid-cols-5">
              {DATime.daysName.map((day) => (
                <div key={day} className="flex justify-center items-center h-10">
                  {day}
                </div>
              ))}
              {month.map((day) => (
                <Tooltip key={day.day} content={new DATime(day.timestamp).formatDateReadable()}>
                  <div key={day.day} className="flex justify-center items-center border-1 border-secondary h-10 hover:bg-foreground/30 cursor-pointer">
                    {day.day}
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
