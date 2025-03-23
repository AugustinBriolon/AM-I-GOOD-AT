import {
  getPerformanceColor,
  getPerformanceLabel,
  referenceData,
  RunningDataType,
} from "@/lib/running-percentile";
import { forwardRef, useImperativeHandle, useRef } from "react";

import { Modal, ModalRefHandle } from "./Modal";
import { ResultItem } from "../ResultItem";

export type ResultsRefHandle = {
  show: () => void;
  hide: () => void;
};

export const RunnnigModal = forwardRef<
  ResultsRefHandle,
  {
    score: number | null;
    runningData: RunningDataType;
    isVisible: boolean;
    onClose: () => void;
  }
>((props, ref) => {
  const { score, runningData, isVisible, onClose } = props;
  const modalRef = useRef<ModalRefHandle>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const scoreTextRef = useRef<HTMLSpanElement>(null);
  const scoreInfoRef = useRef<HTMLDivElement>(null);

  const messageFromScore = (score: number) => {
    if (score >= 90) {
      return "You're an elite runner with exceptional times!";
    } else if (score >= 70) {
      return "You're a strong runner with impressive times.";
    } else if (score >= 40) {
      return "You have solid running abilities. Keep up the good work!";
    }
    return "You're just starting your running journey. Every step counts!";
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      modalRef.current?.show();
    },
    hide: () => {
      modalRef.current?.hide();
    },
  }));

  // Déterminer quelles sections montrer en fonction des données
  const showOneKm = runningData.oneKm.trim() !== "";
  const showFiveKm = runningData.fiveKm.trim() !== "";
  const showTenKm = runningData.tenKm.trim() !== "";
  const showHalfMarathon =
    runningData.hasHalfMarathon && runningData.halfMarathonTime.trim() !== "";
  const showMarathon = runningData.hasMarathon && runningData.marathonTime.trim() !== "";

  return (
    <Modal ref={modalRef} isVisible={isVisible} title="Your Running Performance" onClose={onClose}>
      {score !== null && (
        <div className="mb-8 space-y-6 overflow-y-scroll">
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
            {messageFromScore(score)}
          </div>

          <hr className="my-6 border-gray-200" />

          <div className="space-y-4">
            <h3 className="text-xl font-medium text-black">Your Results</h3>

            {showOneKm && (
              <ResultItem
                category="oneKm"
                eliteValue={referenceData.oneKm.elite}
                label="1km"
                value={runningData.oneKm}
              />
            )}

            {showFiveKm && (
              <ResultItem
                category="fiveKm"
                eliteValue={referenceData.fiveKm.elite}
                label="5km"
                value={runningData.fiveKm}
              />
            )}

            {showTenKm && (
              <ResultItem
                category="tenKm"
                eliteValue={referenceData.tenKm.elite}
                label="10km"
                value={runningData.tenKm}
              />
            )}

            {showHalfMarathon && (
              <ResultItem
                category="halfMarathon"
                eliteValue={referenceData.halfMarathon.elite}
                label="Half Marathon"
                value={runningData.halfMarathonTime}
              />
            )}

            {showMarathon && (
              <ResultItem
                category="marathon"
                eliteValue={referenceData.marathon.elite}
                label="Marathon"
                value={runningData.marathonTime}
              />
            )}
          </div>

          <div className="mt-6 rounded-lg bg-blue-50 p-4 text-blue-700">
            <h3 className="mb-2 font-medium">Training Tips</h3>
            <p className="text-sm">
              To improve your running performance, consider incorporating interval training,
              strength work, and adequate recovery into your routine. Consistency is key!
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
});
RunnnigModal.displayName = "RunnnigModal";
