'use client';

import { useMemo, useState, memo } from "react";
import { cn } from "@root/lib/utils";
import OutsideAlerter from "../OutsideAlerter";
import PocketCalendar from "./PocketCalendar";
import DATime from "@root/lib/da-time";

export default memo(
  function Datepicker({
    date: _date,
    onChange,
    className,
    size = 'medium',
    position = 'right',
  }) {
    const [isOpen, setIsOpen] = useState(false);
    
    const getPosition = () => {
      switch (position) {
        case 'top':
          return 'absolute -top-100 left-0';
        case 'bottom':
          return 'absolute -bottom-100 left-0';
        case 'left':
          return 'absolute -bottom-50 -left-100';
        case 'right':
        default:
          return 'absolute -bottom-50 -right-100';
      }
    }
  
    const date = useMemo(() => {
      if (_date && _date instanceof DATime) return _date;
      if (_date && !(_date instanceof DATime)) return new DATime(_date);
      return new DATime(1);
    }, [_date])
  
  
    return (
      <div className={cn(className, 'cursor-pointer relative hover:bg-primary/30')} onClick={() => setIsOpen(true)}>
        {date?.formatDateReadable()} ({date?.formatDate()})
        {isOpen ? (
          <OutsideAlerter onClickOutside={() => setIsOpen(false)}>
            <div className={cn(getPosition(), 'w-100 h-100 rounded-md z-10')}>
              <PocketCalendar date={date} onChange={onChange} dayClassName="h-6" size={size} />
            </div>
          </OutsideAlerter>
        ) : null}
      </div>
    )
  }
);
