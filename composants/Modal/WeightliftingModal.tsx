import {
  getPerformanceColor,
  getPerformanceLabel,
  WeightliftingDataType,
  formatWeight,
  referenceData,
  calculateActualWeight,
  getRatioFromSelection,
  calculatePercentOfElite,
  getStrengthColor,
  getMotivationalMessage,
} from "@/lib/weightlifting-percentile";
import { forwardRef, useImperativeHandle, useRef } from "react";

import { Modal, ModalRefHandle } from "./Modal";

export type ResultsRefHandle = {
  show: () => void;
  hide: () => void;
};

export const WeightliftingModal = forwardRef<
  ResultsRefHandle,
  {
    score: number | null;
    weightliftingData: WeightliftingDataType;
    isVisible: boolean;
    onClose: () => void;
  }
>((props, ref) => {
  const { score, weightliftingData, isVisible, onClose } = props;
  const modalRef = useRef<ModalRefHandle>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const scoreTextRef = useRef<HTMLSpanElement>(null);
  const scoreInfoRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    show: () => {
      modalRef.current?.show();
    },
    hide: () => {
      modalRef.current?.hide();
    },
  }));

  const showBenchPress = weightliftingData.benchPress.trim() !== "";
  const showSquat = weightliftingData.squat.trim() !== "";
  const showDeadlift = weightliftingData.deadlift.trim() !== "";
  const showOverheadPress = weightliftingData.overheadPress.trim() !== "";
  const showPullUp = weightliftingData.pullUp.trim() !== "";

  const bodyweight = parseFloat(weightliftingData.bodyweight);
  const { gender } = weightliftingData;

  return (
    <Modal
      ref={modalRef}
      isVisible={isVisible}
      title="Your Weightlifting Performance"
      onClose={onClose}
    >
      {score !== null && (
        <div className="mb-8 space-y-6">
          <div className="mx-auto w-48">
            <div ref={gaugeRef} className="relative h-48 w-48">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span
                  ref={scoreTextRef}
                  className="text-5xl font-bold"
                  style={{ color: getPerformanceColor(score) }}
                >
                  {score}%
                </span>
                <span className="text-lg font-medium text-gray-600">
                  {getPerformanceLabel(score)}
                </span>
              </div>
            </div>
          </div>

          <div ref={scoreInfoRef} className="text-center text-gray-700">
            {getMotivationalMessage(score)}
          </div>

          <div className="rounded-lg bg-gray-100 p-3 text-center">
            <span className="font-medium">Bodyweight:</span> {formatWeight(bodyweight)}
          </div>

          <hr className="my-6 border-gray-200" />

          <div className="space-y-4">
            <h3 className="text-xl font-medium">Your Results</h3>

            {showBenchPress && (
              <div className="mb-3 rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Bench Press</span>
                  <div className="flex space-x-2">
                    <span className="text-lg">
                      {calculateActualWeight(weightliftingData.benchPress, bodyweight).toFixed(1)}{" "}
                      kg
                    </span>
                    <span className="text-gray-500">
                      ({getRatioFromSelection(weightliftingData.benchPress).toFixed(2)}× BW)
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Target: {(bodyweight * referenceData[gender].benchPress.elite).toFixed(1)} kg
                      ({referenceData[gender].benchPress.elite}× BW)
                    </span>
                    {parseFloat(weightliftingData.benchPress) > 0 && (
                      <span className="text-xs font-medium text-gray-700">
                        {calculatePercentOfElite(
                          weightliftingData.benchPress,
                          "benchPress",
                          gender,
                        )}
                        % of elite
                      </span>
                    )}
                  </div>

                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full ${getStrengthColor(
                        calculatePercentOfElite(weightliftingData.benchPress, "benchPress", gender),
                      )}`}
                      style={{
                        width: `${calculatePercentOfElite(weightliftingData.benchPress, "benchPress", gender)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {showSquat && (
              <div className="mb-3 rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Squat</span>
                  <div className="flex space-x-2">
                    <span className="text-lg">
                      {calculateActualWeight(weightliftingData.squat, bodyweight).toFixed(1)} kg
                    </span>
                    <span className="text-gray-500">
                      ({getRatioFromSelection(weightliftingData.squat).toFixed(2)}× BW)
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Target: {(bodyweight * referenceData[gender].squat.elite).toFixed(1)} kg (
                      {referenceData[gender].squat.elite}× BW)
                    </span>
                    {parseFloat(weightliftingData.squat) > 0 && (
                      <span className="text-xs font-medium text-gray-700">
                        {calculatePercentOfElite(weightliftingData.squat, "squat", gender)}% of
                        elite
                      </span>
                    )}
                  </div>

                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full ${getStrengthColor(
                        calculatePercentOfElite(weightliftingData.squat, "squat", gender),
                      )}`}
                      style={{
                        width: `${calculatePercentOfElite(weightliftingData.squat, "squat", gender)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {showDeadlift && (
              <div className="mb-3 rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Deadlift</span>
                  <div className="flex space-x-2">
                    <span className="text-lg">
                      {calculateActualWeight(weightliftingData.deadlift, bodyweight).toFixed(1)} kg
                    </span>
                    <span className="text-gray-500">
                      ({getRatioFromSelection(weightliftingData.deadlift).toFixed(2)}× BW)
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Target: {(bodyweight * referenceData[gender].deadlift.elite).toFixed(1)} kg (
                      {referenceData[gender].deadlift.elite}× BW)
                    </span>
                    {parseFloat(weightliftingData.deadlift) > 0 && (
                      <span className="text-xs font-medium text-gray-700">
                        {calculatePercentOfElite(weightliftingData.deadlift, "deadlift", gender)}%
                        of elite
                      </span>
                    )}
                  </div>

                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full ${getStrengthColor(
                        calculatePercentOfElite(weightliftingData.deadlift, "deadlift", gender),
                      )}`}
                      style={{
                        width: `${calculatePercentOfElite(weightliftingData.deadlift, "deadlift", gender)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {showOverheadPress && (
              <div className="mb-3 rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Overhead Press</span>
                  <div className="flex space-x-2">
                    <span className="text-lg">
                      {calculateActualWeight(weightliftingData.overheadPress, bodyweight).toFixed(
                        1,
                      )}{" "}
                      kg
                    </span>
                    <span className="text-gray-500">
                      ({getRatioFromSelection(weightliftingData.overheadPress).toFixed(2)}× BW)
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Target: {(bodyweight * referenceData[gender].overheadPress.elite).toFixed(1)}{" "}
                      kg ({referenceData[gender].overheadPress.elite}× BW)
                    </span>
                    {parseFloat(weightliftingData.overheadPress) > 0 && (
                      <span className="text-xs font-medium text-gray-700">
                        {calculatePercentOfElite(
                          weightliftingData.overheadPress,
                          "overheadPress",
                          gender,
                        )}
                        % of elite
                      </span>
                    )}
                  </div>

                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full ${getStrengthColor(
                        calculatePercentOfElite(
                          weightliftingData.overheadPress,
                          "overheadPress",
                          gender,
                        ),
                      )}`}
                      style={{
                        width: `${calculatePercentOfElite(weightliftingData.overheadPress, "overheadPress", gender)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {showPullUp && (
              <div className="mb-3 rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Pull-ups</span>
                  <span className="text-lg">{weightliftingData.pullUp} reps</span>
                </div>

                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Target: {referenceData[gender].pullUp.elite} reps (elite)
                    </span>
                    {parseFloat(weightliftingData.pullUp) > 0 && (
                      <span className="text-xs font-medium text-gray-700">
                        {calculatePercentOfElite(weightliftingData.pullUp, "pullUp", gender)}% of
                        elite
                      </span>
                    )}
                  </div>

                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full ${getStrengthColor(
                        calculatePercentOfElite(weightliftingData.pullUp, "pullUp", gender),
                      )}`}
                      style={{
                        width: `${calculatePercentOfElite(weightliftingData.pullUp, "pullUp", gender)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-lg bg-blue-50 p-4 text-blue-700">
            <h3 className="mb-2 font-medium">Training Tips</h3>
            <p className="text-sm">
              To improve your weightlifting performance, focus on progressive overload, proper form,
              and adequate nutrition and recovery. Consider compound movements for overall strength
              development.
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
});
WeightliftingModal.displayName = "WeightliftingModal";
