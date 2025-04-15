import Calendar from "@root/components/Calendar/Calendar";
import { CircularProvider } from "@root/contexts/CircularContext";

export default function Page() {
  return (
    <CircularProvider>
      <div className="h-full w-full p-20">
        <Calendar />
      </div>
    </CircularProvider>
  );
}
