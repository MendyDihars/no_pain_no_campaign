'use client';

import { useStoredDate } from "@root/contexts/StoredDateContext";
import Calendar from "./Calendar";
import PocketCalendar from "./PocketCalendar";
export default function CalendarWrapper({ events }) {
  const { date, setDate } = useStoredDate();

  return (
    <div className="flex flex-col gap-4">
      <Calendar date={date} onChange={setDate} events={events} />
    </div>
  )
}