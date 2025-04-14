import {
  Select as SelectPrimitive,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@root/components/ui/select-primitive";

export default function Select({
  id,
  options,
  placeholder,
  className,
  itemClassName,
  contentClassName,
  value,
}) {
  return (
    <SelectPrimitive id={id} value={value}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={contentClassName}>
        <SelectGroup>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value} className={itemClassName}>{label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectPrimitive>
  );
}

