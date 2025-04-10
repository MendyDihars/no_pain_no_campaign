'use client';

import {
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import DATime from '@root/lib/da-time';
import { useCircular } from '@root/contexts/CircularContext';
import Tooltip from '../ui/Tooltip';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

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

function NumberInput({ value, onChange }) {
  function handleChangeUp() {
    if (value === 9) {
      onChange(0);
    } else {
      onChange(value + 1);
    }
  }
  
  function handleChangeDown() {
    if (value === 0) {
      onChange(9);
    } else {
      onChange(value - 1);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <ChevronUpIcon className="cursor-pointer hover:bg-gray-900 rounded-full p-1" onClick={handleChangeUp} />
      {value}
      <ChevronDownIcon className="cursor-pointer hover:bg-gray-900 rounded-full p-1" onClick={handleChangeDown} />
    </div>
  )
}

function TimelineDayCalendar({ calendar, events }) {
  const { date, setDate } = useCircular();

  return (
    <>
      {calendar.byMonth.map((month, i) => (
        <div key={month[0].format} className="flex flex-col justify-center items-start">
          <div>{month[0].monthName}</div>
          <div className={`h-[4px] w-full ${colors[i]} rounded-full`} />
          <div className="flex">
            {month.map((day) => {
              const event = events.get(day.timestamp);
              return (
                <Tooltip
                  key={day.format}
                  content={(
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <div className={`${event ? 'text-lg font-bold' : ''}`}>{day.date}</div>
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
                  className={`w-20 h-10 font-bold border-1 flex justify-center items-center cursor-pointer ${event ? 'bg-cyan-900' : 'bg-secondary'}`}
                  onClick={() => setDate(day.timestamp)}
                >
                  <div className={`${day.timestamp === date.timestamp ? 'bg-white text-black rounded-full flex justify-center items-center h-8 w-8' : ''}`}>
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
  const { date, setDate } = useCircular();
  
  const yearSplitted = useMemo(() => (
    date?.year
      ? DATime.convertYearToString(date.year).replace(/:/, '').split('')
      : ['0', '0', '0']
  ), [date]);

  function handleYearChange(index) {
    return (value) => {
      const realIndex = index === 0 ? 0 : index + 1;
      let currentDate = date.formatDate().split('/');
      let year = currentDate[2].split('');
      year[realIndex] = value;
      currentDate[2] = year.join('');
      setDate(new DATime(currentDate.join('/')));
    }
  }

  const events = useMemo(() => new Map(storedEvents.map((event) => [event.date, event])), [storedEvents]);

  const calendar = useMemo(() => (
    date ? DATime.getCalendar(DATime.convertYearToString(date.year)) : { byMonth: [], byDay: [] }
  ), [date]);

  useEffect(() => {
    setIsClientLoaded(true);
  }, []);

  return isClientLoaded ? (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <NumberInput value={yearSplitted[0]} onChange={handleYearChange(0)} />
        :
        <NumberInput value={yearSplitted[1]} onChange={handleYearChange(1)} />
        <NumberInput value={yearSplitted[2]} onChange={handleYearChange(2)} />
      </div>
      <div ref={ref} className="w-full h-full flex items-center overflow-x-auto no-scrollbar">
        <TimelineDayCalendar calendar={calendar} events={events} setDate={setDate} />
      </div>
    </div>
  ) : (<span>Loading...</span>);
}
