import { formatTime, getTimeRangeText, timeToSeconds } from "@/lib/running-percentile";

export const ResultItem = ({
  label,
  value,
  eliteValue,
  category,
}: {
  label: string;
  value: string;
  eliteValue: number;
  category: "oneKm" | "fiveKm" | "tenKm" | "halfMarathon" | "marathon";
}) => {
  const timeInSeconds = timeToSeconds(value);
  const eliteTimeInSeconds = eliteValue;

  const percentageOfElite = Math.min(100, Math.round((eliteTimeInSeconds / timeInSeconds) * 100));

  const getColor = () => {
    if (percentageOfElite >= 95) return "bg-green-500";
    if (percentageOfElite >= 80) return "bg-green-400";
    if (percentageOfElite >= 65) return "bg-yellow-400";
    if (percentageOfElite >= 50) return "bg-yellow-500";
    return "bg-orange-500";
  };

  const timeRangeText = getTimeRangeText(category, value);

  return (
    <div className="rounded-lg border border-gray-200 p-4 text-black">
      <div className="flex items-center justify-between">
        <span className="font-medium">{label}</span>
        <span className="text-lg">{timeRangeText}</span>
      </div>

      <div className="mt-2">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs text-gray-500">Elite: {formatTime(eliteTimeInSeconds)}</span>
          <span className="text-xs font-medium text-gray-700">
            {percentageOfElite}% of elite pace
          </span>
        </div>

        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className={`h-2 rounded-full ${getColor()}`}
            style={{ width: `${percentageOfElite}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
