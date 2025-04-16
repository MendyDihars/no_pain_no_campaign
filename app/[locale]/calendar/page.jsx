import CalendarWrapper from "@root/components/Calendar/CalendarWrapper";
import { StoredDateContextProvider } from "@root/contexts/StoredDateContext";
import knex from "@root/lib/db";

export default async function Page() {
  const events = await knex.select('*').from('events');

  return (
    <StoredDateContextProvider>
      <div className="h-full w-full p-20">
        <CalendarWrapper events={events} />
      </div>
    </StoredDateContextProvider>
  );
}
