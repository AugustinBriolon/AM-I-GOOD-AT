export type RunningDataType = {
  oneKm: string;
  fiveKm: string;
  tenKm: string;
  hasHalfMarathon: boolean;
  halfMarathonTime: string;
  hasMarathon: boolean;
  marathonTime: string;
};

export type TimeRange = {
  label: string;
  value: string;
  min?: number;
  max?: number;
};

export function timeToSeconds(timeStr: string): number {
  if (!timeStr) return 0;

  const parts = timeStr.split(":").map(Number);

  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  return 0;
}

export const referenceData = {
  oneKm: {
    elite: 180,
    good: 240,
    average: 300,
    beginner: 420,
  },
  fiveKm: {
    elite: 1080,
    good: 1380,
    average: 1680,
    beginner: 2100,
  },
  tenKm: {
    elite: 2280,
    good: 2880,
    average: 3600,
    beginner: 4500,
  },
  halfMarathon: {
    elite: 4800,
    good: 6000,
    average: 7200,
    beginner: 9000,
  },
  marathon: {
    elite: 10800,
    good: 13500,
    average: 16200,
    beginner: 19800,
  },
};

export const timeRanges = {
  oneKm: [
    { label: "> 3:00", value: "2:45", max: 180 },
    { label: "3:00 - 4:00", value: "3:30", min: 180, max: 240 },
    { label: "4:00 - 5:00", value: "4:30", min: 240, max: 300 },
    { label: "5:00 - 7:00", value: "6:00", min: 300, max: 420 },
    { label: "< 7:00", value: "8:00", min: 420 },
  ],
  fiveKm: [
    { label: "> 18:00", value: "17:00", max: 1080 },
    { label: "18:00 - 23:00", value: "20:30", min: 1080, max: 1380 },
    { label: "23:00 - 28:00", value: "25:30", min: 1380, max: 1680 },
    { label: "28:00 - 35:00", value: "31:30", min: 1680, max: 2100 },
    { label: "< 35:00", value: "40:00", min: 2100 },
  ],
  tenKm: [
    { label: "> 38:00", value: "35:00", max: 2280 },
    { label: "38:00 - 48:00", value: "43:00", min: 2280, max: 2880 },
    { label: "48:00 - 60:00", value: "54:00", min: 2880, max: 3600 },
    { label: "60:00 - 75:00", value: "67:30", min: 3600, max: 4500 },
    { label: "< 75:00", value: "85:00", min: 4500 },
  ],
  halfMarathon: [
    { label: "> 1:20:00", value: "1:15:00", max: 4800 },
    { label: "1:20:00 - 1:40:00", value: "1:30:00", min: 4800, max: 6000 },
    { label: "1:40:00 - 2:00:00", value: "1:50:00", min: 6000, max: 7200 },
    { label: "2:00:00 - 2:30:00", value: "2:15:00", min: 7200, max: 9000 },
    { label: "< 2:30:00", value: "2:45:00", min: 9000 },
  ],
  marathon: [
    { label: "> 3:00:00", value: "2:50:00", max: 10800 },
    { label: "3:00:00 - 3:45:00", value: "3:22:30", min: 10800, max: 13500 },
    { label: "3:45:00 - 4:30:00", value: "4:07:30", min: 13500, max: 16200 },
    { label: "4:30:00 - 5:30:00", value: "5:00:00", min: 16200, max: 19800 },
    { label: "< 5:30:00", value: "6:00:00", min: 19800 },
  ],
};

export function runningPercentile(data: RunningDataType): number {
  let totalScore = 0;
  let divisor = 0;

  if (data.oneKm) {
    const seconds = timeToSeconds(data.oneKm);
    if (seconds <= referenceData.oneKm.elite) totalScore += 95;
    else if (seconds <= referenceData.oneKm.good) totalScore += 75;
    else if (seconds <= referenceData.oneKm.average) totalScore += 50;
    else if (seconds <= referenceData.oneKm.beginner) totalScore += 25;
    else totalScore += 10;
    divisor++;
  }

  if (data.fiveKm) {
    const seconds = timeToSeconds(data.fiveKm);
    if (seconds <= referenceData.fiveKm.elite) totalScore += 95;
    else if (seconds <= referenceData.fiveKm.good) totalScore += 75;
    else if (seconds <= referenceData.fiveKm.average) totalScore += 50;
    else if (seconds <= referenceData.fiveKm.beginner) totalScore += 25;
    else totalScore += 10;
    divisor++;
  }

  if (data.tenKm) {
    const seconds = timeToSeconds(data.tenKm);
    if (seconds <= referenceData.tenKm.elite) totalScore += 95;
    else if (seconds <= referenceData.tenKm.good) totalScore += 75;
    else if (seconds <= referenceData.tenKm.average) totalScore += 50;
    else if (seconds <= referenceData.tenKm.beginner) totalScore += 25;
    else totalScore += 10;
    divisor++;
  }

  if (data.hasHalfMarathon) {
    const seconds = timeToSeconds(data.halfMarathonTime);
    if (seconds <= referenceData.halfMarathon.elite) totalScore += 95;
    else if (seconds <= referenceData.halfMarathon.good) totalScore += 75;
    else if (seconds <= referenceData.halfMarathon.average) totalScore += 50;
    else if (seconds <= referenceData.halfMarathon.beginner) totalScore += 25;
    else totalScore += 15;
    divisor++;
  }

  if (data.hasMarathon) {
    const seconds = timeToSeconds(data.marathonTime);
    if (seconds <= referenceData.marathon.elite) totalScore += 95;
    else if (seconds <= referenceData.marathon.good) totalScore += 75;
    else if (seconds <= referenceData.marathon.average) totalScore += 50;
    else if (seconds <= referenceData.marathon.beginner) totalScore += 25;
    else totalScore += 20;
    divisor++;
  }

  if (divisor === 0) return 50;
  const averageScore = totalScore / divisor;
  return Math.round(averageScore);
}

export function formatTime(seconds: number): string {
  if (seconds < 3600) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
}

export function getPerformanceLabel(score: number): string {
  if (score >= 90) return "Elite";
  if (score >= 70) return "Good";
  if (score >= 40) return "Average";
  if (score >= 20) return "Beginner";
  return "Novice";
}

export function getPerformanceColor(score: number): string {
  if (score >= 90) return "#4CAF50";
  if (score >= 70) return "#8BC34A";
  if (score >= 40) return "#FFC107";
  if (score >= 20) return "#FF9800";
  return "#F44336";
}

export function getTimeRangeText(category: keyof typeof timeRanges, value: string): string {
  const ranges = timeRanges[category];
  const range = ranges.find((r) => r.value === value);
  return range ? range.label : value;
}
