'use client';

import {
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useTranslations } from 'next-intl';
import DATime from '@root/lib/da-time';
import { useStoredDate } from '@root/contexts/StoredDateContext';
import Tooltip from '@root/components/ui/Tooltip';
import { roxborough } from '@root/lib/fonts';
import YearInput from './YearInput';

const colors = [
  'bg-fuchsia-400',
  'bg-emerald-500',
  'bg-emerald-500',
  'bg-emerald-500',
  'bg-emerald-800',
  'bg-emerald-800',
  'bg-emerald-800',
  'bg-lime-200',
  'bg-lime-200',
  'bg-lime-200',
  'bg-fuchsia-400',
  'bg-fuchsia-400',
];

function TimelineDayCalendar({ calendar, events }) {
  const ref = useRef(null);
  const { date, setDate } = useStoredDate();

  useEffect(() => {
    // go to scroll position of the day and put it in the center of the screen
    const day = ref.current.querySelector(`[data-id="${date.timestamp}"]`);
    if (day) {
      day.scrollIntoView({ behavior: 'smooth' });
    }
  }, [date]);

  return (
    <>
      {calendar.byMonth.map((month, i) => (
        <div ref={ref} key={month[0].format} className="flex flex-col justify-center items-start">
          <div className={`${roxborough.className} text-2xl text-secondary`}>{month[0].monthName}</div>
          <div className={`h-[4px] w-full ${colors[i]} rounded-full`} />
          <div className="flex">
            {month.map((day) => {
              const event = events.get(day.timestamp);
              return (
                <Tooltip
                  key={day.format}
                  content={(
                    <div className="flex flex-col gap-2 text-lg items-center justify-center">
                      <div className={`${event ? 'text-2xm font-bold' : ''}`}>{day.date}</div>
                      {event ? (
                        <div>
                          <div>{event.name}</div>
                          <div>{event.description}</div>
                        </div>
                      ) : ''}
                    </div>
                  )}
                >
                <div
                  data-id={day.timestamp}
                  className={`w-10 h-10 text-xl border-1 flex justify-center items-center cursor-pointer rounded-b-lg ${roxborough.className} ${event ? 'bg-secondary text-background' : 'bg-primary text-foreground'}`}
                  onClick={() => setDate(new DATime(day.timestamp))}
                >
                  <div className={`${day.timestamp === date.timestamp ? 'bg-white text-black h-full w-full rounded-b-lg flex justify-center items-center' : ''}`}>
                    {day.day}
                  </div>
                </div>
                </Tooltip>
              );
            })}
          </div>
        </div>
      ))}
    </>
  )
}

export default function Timeline({ events: storedEvents }) {
  const ref = useRef(null);
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const { date, setDate } = useStoredDate();
  const t = useTranslations();

  const events = useMemo(() => new Map(storedEvents.map((event) => [event.date, event])), [storedEvents]);

  const calendar = useMemo(() => (
    date ? DATime.getCalendar(DATime.convertYearToString(date.year)) : { byMonth: [], byDay: [] }
  ), [date]);

  useEffect(() => {
    setIsClientLoaded(true);
  }, []);

  return isClientLoaded ? (
    <div>
      <YearInput date={date} onChange={setDate} className="ms-24 mb-6" />
      <div ref={ref} className="w-full h-full flex items-center overflow-x-auto pretty-scrollbar">
        <TimelineDayCalendar calendar={calendar} events={events} setDate={setDate} />
      </div>
    </div>
  ) : (<span>{t('Timeline.loading')}...</span>);
}
