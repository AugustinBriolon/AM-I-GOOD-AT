type RunningData = {
  oneKm: string;
  fiveKm: string;
  tenKm: string;
  hasHalfMarathon: boolean;
  halfMarathonTime: string;
  hasMarathon: boolean;
  marathonTime: string;
};

function timeToSeconds(timeStr: string): number {
  if (!timeStr) return 0;

  const parts = timeStr.split(":").map(Number);

  if (parts.length === 2) {
    // mm:ss format
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    // hh:mm:ss format
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  return 0;
}

const referenceData = {
  oneKm: {
    elite: 180, // 3:00
    good: 240, // 4:00
    average: 300, // 5:00
    beginner: 420, // 7:00
  },
  fiveKm: {
    elite: 1080, // 18:00
    good: 1380, // 23:00
    average: 1680, // 28:00
    beginner: 2100, // 35:00
  },
  tenKm: {
    elite: 2280, // 38:00
    good: 2880, // 48:00
    average: 3600, // 60:00
    beginner: 4500, // 75:00
  },
  halfMarathon: {
    elite: 4800, // 1:20:00
    good: 6000, // 1:40:00
    average: 7200, // 2:00:00
    beginner: 9000, // 2:30:00
  },
  marathon: {
    elite: 10800, // 3:00:00
    good: 13500, // 3:45:00
    average: 16200, // 4:30:00
    beginner: 19800, // 5:30:00
  },
};

export function calculateRunningPercentile(data: RunningData): number {
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
