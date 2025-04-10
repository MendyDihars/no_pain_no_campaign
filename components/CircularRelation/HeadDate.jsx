'use client';

import { useCircular } from '@root/contexts/CircularContext';

export default function HeadDate() {
  const { date } = useCircular();

  return (
    <div>{date?.formatDateReadable()}</div>
  );
}
