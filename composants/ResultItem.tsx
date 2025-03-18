import { formatTime } from "@/lib/running-percentile";

export const ResultItem = ({
  label,
  time,
  eliteTime,
}: {
  label: string;
  time: string;
  eliteTime: number;
}) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}</span>
    <div className="text-right">
      <span className="font-light">{time}</span>
      <span className="mt-1 block text-xs text-gray-400">Elite: {formatTime(eliteTime)}</span>
    </div>
  </div>
);
