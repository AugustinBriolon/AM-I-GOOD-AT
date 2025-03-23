export type WeightliftingDataType = {
  benchPress: string;
  squat: string;
  deadlift: string;
  overheadPress: string;
  pullUp: string;
  bodyweight: string;
  gender: "male" | "female";
};

export type WeightRange = {
  label: string;
  value: string;
  min?: number;
  max?: number;
};

export function weightToNumber(weightStr: string): number {
  if (!weightStr) return 0;
  return parseFloat(weightStr);
}

export const referenceData = {
  male: {
    benchPress: {
      elite: 1.5,
      good: 1.2,
      average: 0.9,
      beginner: 0.6,
    },
    squat: {
      elite: 2.0,
      good: 1.6,
      average: 1.2,
      beginner: 0.8,
    },
    deadlift: {
      elite: 2.5,
      good: 2.0,
      average: 1.5,
      beginner: 1.0,
    },
    overheadPress: {
      elite: 0.9,
      good: 0.7,
      average: 0.5,
      beginner: 0.3,
    },
    pullUp: {
      elite: 20,
      good: 12,
      average: 6,
      beginner: 2,
    },
  },
  female: {
    benchPress: {
      elite: 1.1,
      good: 0.8,
      average: 0.6,
      beginner: 0.4,
    },
    squat: {
      elite: 1.6,
      good: 1.3,
      average: 1.0,
      beginner: 0.7,
    },
    deadlift: {
      elite: 2.0,
      good: 1.6,
      average: 1.2,
      beginner: 0.8,
    },
    overheadPress: {
      elite: 0.7,
      good: 0.5,
      average: 0.3,
      beginner: 0.2,
    },
    pullUp: {
      elite: 12,
      good: 8,
      average: 3,
      beginner: 1,
    },
  },
};

export const weightRanges = {
  male: {
    benchPress: [
      { label: "> 1.5× Bodyweight", value: "1.6", max: 1.5 },
      { label: "1.2 - 1.5× Bodyweight", value: "1.35", min: 1.2, max: 1.5 },
      { label: "0.9 - 1.2× Bodyweight", value: "1.05", min: 0.9, max: 1.2 },
      { label: "0.6 - 0.9× Bodyweight", value: "0.75", min: 0.6, max: 0.9 },
      { label: "< 0.6× Bodyweight", value: "0.45", min: 0, max: 0.6 },
    ],
    squat: [
      { label: "> 2.0× Bodyweight", value: "2.2", max: 2.0 },
      { label: "1.6 - 2.0× Bodyweight", value: "1.8", min: 1.6, max: 2.0 },
      { label: "1.2 - 1.6× Bodyweight", value: "1.4", min: 1.2, max: 1.6 },
      { label: "0.8 - 1.2× Bodyweight", value: "1.0", min: 0.8, max: 1.2 },
      { label: "< 0.8× Bodyweight", value: "0.6", min: 0, max: 0.8 },
    ],
    deadlift: [
      { label: "> 2.5× Bodyweight", value: "2.75", max: 2.5 },
      { label: "2.0 - 2.5× Bodyweight", value: "2.25", min: 2.0, max: 2.5 },
      { label: "1.5 - 2.0× Bodyweight", value: "1.75", min: 1.5, max: 2.0 },
      { label: "1.0 - 1.5× Bodyweight", value: "1.25", min: 1.0, max: 1.5 },
      { label: "< 1.0× Bodyweight", value: "0.75", min: 0, max: 1.0 },
    ],
    overheadPress: [
      { label: "> 0.9× Bodyweight", value: "1.0", max: 0.9 },
      { label: "0.7 - 0.9× Bodyweight", value: "0.8", min: 0.7, max: 0.9 },
      { label: "0.5 - 0.7× Bodyweight", value: "0.6", min: 0.5, max: 0.7 },
      { label: "0.3 - 0.5× Bodyweight", value: "0.4", min: 0.3, max: 0.5 },
      { label: "< 0.3× Bodyweight", value: "0.2", min: 0, max: 0.3 },
    ],
    pullUp: [
      { label: "> 20 reps", value: "25", max: 20 },
      { label: "12 - 20 reps", value: "16", min: 12, max: 20 },
      { label: "6 - 12 reps", value: "9", min: 6, max: 12 },
      { label: "2 - 6 reps", value: "4", min: 2, max: 6 },
      { label: "< 2 reps", value: "1", min: 0, max: 2 },
    ],
  },
  female: {
    benchPress: [
      { label: "> 1.1× Bodyweight", value: "1.2", max: 1.1 },
      { label: "0.8 - 1.1× Bodyweight", value: "0.95", min: 0.8, max: 1.1 },
      { label: "0.6 - 0.8× Bodyweight", value: "0.7", min: 0.6, max: 0.8 },
      { label: "0.4 - 0.6× Bodyweight", value: "0.5", min: 0.4, max: 0.6 },
      { label: "< 0.4× Bodyweight", value: "0.3", min: 0, max: 0.4 },
    ],
    squat: [
      { label: "> 1.6× Bodyweight", value: "1.8", max: 1.6 },
      { label: "1.3 - 1.6× Bodyweight", value: "1.45", min: 1.3, max: 1.6 },
      { label: "1.0 - 1.3× Bodyweight", value: "1.15", min: 1.0, max: 1.3 },
      { label: "0.7 - 1.0× Bodyweight", value: "0.85", min: 0.7, max: 1.0 },
      { label: "< 0.7× Bodyweight", value: "0.5", min: 0, max: 0.7 },
    ],
    deadlift: [
      { label: "> 2.0× Bodyweight", value: "2.2", max: 2.0 },
      { label: "1.6 - 2.0× Bodyweight", value: "1.8", min: 1.6, max: 2.0 },
      { label: "1.2 - 1.6× Bodyweight", value: "1.4", min: 1.2, max: 1.6 },
      { label: "0.8 - 1.2× Bodyweight", value: "1.0", min: 0.8, max: 1.2 },
      { label: "< 0.8× Bodyweight", value: "0.6", min: 0, max: 0.8 },
    ],
    overheadPress: [
      { label: "> 0.7× Bodyweight", value: "0.8", max: 0.7 },
      { label: "0.5 - 0.7× Bodyweight", value: "0.6", min: 0.5, max: 0.7 },
      { label: "0.3 - 0.5× Bodyweight", value: "0.4", min: 0.3, max: 0.5 },
      { label: "0.2 - 0.3× Bodyweight", value: "0.25", min: 0.2, max: 0.3 },
      { label: "< 0.2× Bodyweight", value: "0.15", min: 0, max: 0.2 },
    ],
    pullUp: [
      { label: "> 12 reps", value: "15", max: 12 },
      { label: "8 - 12 reps", value: "10", min: 8, max: 12 },
      { label: "3 - 8 reps", value: "5", min: 3, max: 8 },
      { label: "1 - 3 reps", value: "2", min: 1, max: 3 },
      { label: "0 reps", value: "0", min: 0, max: 1 },
    ],
  },
};

export function weightliftingPercentile(data: WeightliftingDataType): number {
  let totalScore = 0;
  let divisor = 0;

  const bodyweight = weightToNumber(data.bodyweight);
  const genderData = referenceData[data.gender];

  if (!bodyweight) return 50;

  if (data.benchPress) {
    const ratio = parseFloat(data.benchPress);

    if (ratio >= genderData.benchPress.elite) totalScore += 95;
    else if (ratio >= genderData.benchPress.good) totalScore += 75;
    else if (ratio >= genderData.benchPress.average) totalScore += 50;
    else if (ratio >= genderData.benchPress.beginner) totalScore += 25;
    else totalScore += 10;

    divisor++;
  }

  if (data.squat) {
    const ratio = parseFloat(data.squat);

    if (ratio >= genderData.squat.elite) totalScore += 95;
    else if (ratio >= genderData.squat.good) totalScore += 75;
    else if (ratio >= genderData.squat.average) totalScore += 50;
    else if (ratio >= genderData.squat.beginner) totalScore += 25;
    else totalScore += 10;

    divisor++;
  }

  if (data.deadlift) {
    const ratio = parseFloat(data.deadlift);

    if (ratio >= genderData.deadlift.elite) totalScore += 95;
    else if (ratio >= genderData.deadlift.good) totalScore += 75;
    else if (ratio >= genderData.deadlift.average) totalScore += 50;
    else if (ratio >= genderData.deadlift.beginner) totalScore += 25;
    else totalScore += 10;

    divisor++;
  }

  if (data.overheadPress) {
    const ratio = parseFloat(data.overheadPress);

    if (ratio >= genderData.overheadPress.elite) totalScore += 95;
    else if (ratio >= genderData.overheadPress.good) totalScore += 75;
    else if (ratio >= genderData.overheadPress.average) totalScore += 50;
    else if (ratio >= genderData.overheadPress.beginner) totalScore += 25;
    else totalScore += 10;

    divisor++;
  }

  if (data.pullUp) {
    const reps = weightToNumber(data.pullUp);

    if (reps >= genderData.pullUp.elite) totalScore += 95;
    else if (reps >= genderData.pullUp.good) totalScore += 75;
    else if (reps >= genderData.pullUp.average) totalScore += 50;
    else if (reps >= genderData.pullUp.beginner) totalScore += 25;
    else totalScore += 10;

    divisor++;
  }

  if (divisor === 0) return 50;
  const averageScore = totalScore / divisor;
  return Math.round(averageScore);
}

export function formatWeight(weight: number): string {
  return weight.toFixed(1) + " kg";
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

export function getWeightRangeText(
  gender: "male" | "female",
  category: keyof typeof weightRanges.male,
  value: string,
): string {
  const ranges = weightRanges[gender][category];
  const range = ranges.find((r) => r.value === value);
  return range ? range.label : value;
}

export function calculateOneRepMax(weight: number, reps: number): number {
  if (reps >= 37) return weight * 2;
  return weight * (36 / (37 - reps));
}

export function estimateWeightForReps(oneRepMax: number, targetReps: number): number {
  if (targetReps >= 37) return oneRepMax / 2;
  return oneRepMax * ((37 - targetReps) / 36);
}

export function calculateActualWeight(selectedValue: string, bodyweight: number): number {
  return parseFloat(selectedValue) * bodyweight;
}

export function getRatioFromSelection(selectedValue: string): number {
  return parseFloat(selectedValue);
}

export function calculatePercentOfElite(
  selectedValue: string,
  category: keyof typeof referenceData.male,
  gender: "male" | "female",
): number {
  const ratio = parseFloat(selectedValue);
  const eliteValue = referenceData[gender][category].elite;
  return Math.min(100, Math.round((ratio / eliteValue) * 100));
}

export function getStrengthColor(percentOfElite: number): string {
  if (percentOfElite >= 95) return "bg-green-500";
  if (percentOfElite >= 80) return "bg-green-400";
  if (percentOfElite >= 65) return "bg-yellow-400";
  if (percentOfElite >= 50) return "bg-yellow-500";
  return "bg-orange-500";
}

export function getMotivationalMessage(score: number): string {
  if (score >= 90) {
    return "You're an elite lifter with exceptional strength!";
  } else if (score >= 70) {
    return "You're a strong lifter with impressive numbers.";
  } else if (score >= 40) {
    return "You have solid lifting abilities. Keep up the good work!";
  }
  return "You're just starting your strength journey. Every rep counts!";
}
