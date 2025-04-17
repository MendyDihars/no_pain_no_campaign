import { useMemo } from 'react';
import Tooltip from '@root/components/ui/Tooltip';
import DATime from '@root/lib/da-time';
import { cn } from '@root/lib/utils';

export default function MonthCalendar({
  date,
  onChange,
  events,
  className,
  month,
}) {
  function tooltipContent(day) {
    if (!day) return null;
    if (!eventsByDay.has(day?.timestamp)) {
      return (
        <span className="text-lg">
          {day.date}
        </span>
      );
    }
    const event = eventsByDay.get(day?.timestamp);
    return (
      <div key={event.id} className="px-2 py-4">
        <div className="text-lg italic">
          {day.date}
        </div>
        <div className="text-xl">
          {event.name}
        </div>
        <div className="text-lg">
          {event.description}
        </div>
      </div>
    );
  }

  function handleDayClick(day) {
    return () => {
      onChange(new DATime(day.timestamp));
    }
  }

  const eventsByDay = useMemo(() => {
    if (!events?.length) return new Map();
    return new Map(events.map((event) => [event.date, event]));
  }, [events]);

  const days = useMemo(() => {
    if (!date) return [];
    return DATime.getCalendar(DATime.convertYearToString(date.year))?.byMonth[month - 1] ?? [];
  }, [month, date]);
  
  return (
    <div className="grid grid-cols-5">
      {DATime.daysName.map((day) => (
        <div key={day} className="flex justify-center items-center h-10">
          {day}
        </div>
      ))}
      {days.map((day) => (
      <Tooltip key={day?.timestamp} content={tooltipContent(day)}>
        <div
          key={day?.day}
          onClick={handleDayClick(day)}
          className={cn(
            'flex justify-center items-center border-1 border-secondary h-10 hover:bg-foreground/30 cursor-pointer bg-background text-foreground',
            eventsByDay.has(day?.timestamp) ? 'bg-primary text-secondary' : '',
            day?.timestamp === date?.timestamp ? 'bg-secondary text-background' : '',
            className
          )}
        >
          {day?.day}
        </div>
      </Tooltip>
    ))}
    </div>
  );
}
