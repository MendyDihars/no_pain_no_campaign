'use client';

import { useStoredDate } from '@root/contexts/StoredDateContext';

export default function HeadDate() {
  const { date } = useStoredDate();

  return (
    <div>{date?.formatDateReadable()}</div>
  );
}
