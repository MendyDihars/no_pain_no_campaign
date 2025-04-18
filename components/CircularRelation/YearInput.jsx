import { useMemo } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { roxborough } from "@root/lib/fonts";
import DATime from "@root/lib/da-time";
import { cn } from "@root/lib/utils";
import { isNil } from "lodash";
function NumberInput({ value, onChange, min = 0, size = "normal" }) {
  const val = +value;
  function handleChangeUp() {
    if (!onChange) return;
    if (val === 9) {
      onChange(min);
    } else {
      onChange(val + 1);
    }
  }
  
  function handleChangeDown() {
    if (!onChange) return;
    if (val === min) {
      onChange(9);
    } else {
      onChange(val - 1);
    }
  }

  const sizeClass = () => {
    if (size === "small") return "text-md";
    if (size === "large") return "text-4xl";
    return "text-xl";
  }

  return (
    <div className={`flex flex-col items-center ${roxborough.className} ${sizeClass()}`}>
      <ChevronUpIcon className="cursor-pointer h-8 w-8 hover:bg-primary/30 rounded-full p-1" onClick={handleChangeUp} />
      {val}
      <ChevronDownIcon className="cursor-pointer h-8 w-8 hover:bg-primary/30 rounded-full p-1" onClick={handleChangeDown} />
    </div>
  )
}

export default function YearInput({ onChange, date, className }) {
  const yearSplitted = useMemo(() => {
    if (isNil(date?.year)) return ['0', '0', '0', '0'];
    const splitted = DATime.convertYearToString(date.year).replace(/:/, '').split('');
    if (splitted.length === 3) return ['0', ...splitted];
    return splitted;
  }, [date]);

  function handleYearChange(index) {
    return (value) => {
      const clone = [...yearSplitted];
      clone[index] = value.toString();
      const yearStr = `${clone[0] === '0' ? '' : clone[0]}${clone[1]}:${clone[2]}${clone[3]}`;
      const splitted = date.formatDate().split('/');
      if (onChange) {
        onChange(new DATime(`${splitted[0]}/${splitted[1]}/${yearStr}`));
      }
    }
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <NumberInput value={yearSplitted[0]} onChange={handleYearChange(0)} />
      <NumberInput value={yearSplitted[1]} onChange={handleYearChange(1)} min={1} />
      :
      <NumberInput value={yearSplitted[2]} onChange={handleYearChange(2)} />
      <NumberInput value={yearSplitted[3]} onChange={handleYearChange(3)} />
    </div>
  )
}
