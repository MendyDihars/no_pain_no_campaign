'use client';

import {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import DATime from '@root/lib/da-time';
import { DEFAULT_DATE } from '@root/lib/decorators/character.helper';

export const StoredDateContext = createContext({
  date: undefined,
  setDate: () => {},
});

export function StoredDateContextProvider({ children }) {
  const [date, setDate] = useState(undefined);

  useEffect(() => {
    const date = +localStorage.getItem('date') || DEFAULT_DATE;
    setDate(new DATime(date));
  }, []);

  useEffect(() => {
    if (date) {
      localStorage.setItem('date', date.timestamp);
    }
  }, [date])

  const value = useMemo(() => ({ date, setDate }), [date]);

  return (
    <StoredDateContext.Provider value={value}>
      {children}
    </StoredDateContext.Provider>
  );
}

export const useStoredDate = () => {
  return useContext(StoredDateContext);
};

