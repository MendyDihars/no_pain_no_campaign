import {
  Select as SelectPrimitive,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@root/components/ui/select-primitive";
import { cn } from "@root/lib/utils";

export default function Select({
  id,
  options,
  placeholder,
  className,
  itemClassName,
  contentClassName,
  value,
  onChange,
}) {
  return (
    <SelectPrimitive id={id} value={value} onValueChange={onChange}>
      <SelectTrigger className={cn('border-0 rounded-none cursor-pointer text-md', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={cn('border-0 bg-secondary text-background', contentClassName)}>
        <SelectGroup>
          {options.map(({ label, value }) => (
            <SelectItem
              key={value}
              value={value}
              className={cn('cursor-pointer text-md rounded-none bg-background text-secondary', itemClassName)}
            >
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectPrimitive>
  );
}

