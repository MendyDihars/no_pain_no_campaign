'use client';

import DATime from '@root/lib/da-time';
import {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import { getCurrentDate, setCurrentDate } from '@root/actions/settings';

export const CircularContext = createContext({
  date: undefined,
  setDate: () => {},
});

export function CircularProvider({ children }) {
  const [date, setOnlyDate] = useState(undefined);

  useEffect(() => {
    async function fetchDate() {
      const date = new DATime(await getCurrentDate());
      setDate(date);
    }
    fetchDate();
  }, []);

  async function setDate(date) {
    await setCurrentDate(typeof date === 'number' ? date : date.timestamp);
    setOnlyDate(typeof date === 'number' ? new DATime(date) : date);
  }

  const value = useMemo(() => ({ date, setDate }), [date]);

  return (
    <CircularContext.Provider value={value}>
      {children}
    </CircularContext.Provider>
  );
}

export const useCircular = () => {
  return useContext(CircularContext);
};

