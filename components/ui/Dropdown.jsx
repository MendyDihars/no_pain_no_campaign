import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@root/components/ui/dropdown-menu";

export default function Dropdown({ children, items, side, align }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side={side} align={align}>
        {items.map((item) => (
          <DropdownMenuItem key={item.id}>{item.render()}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
