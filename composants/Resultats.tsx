import {
  getPerformanceColor,
  getPerformanceLabel,
  referenceData,
  RunningDataType,
} from "@/lib/running-percentile";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { ResultItem } from "./ResultItem";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export type ResultsRefHandle = {
  show: () => void;
  hide: () => void;
};

export const Results = forwardRef<
  ResultsRefHandle,
  {
    score: number | null;
    runningData: RunningDataType;
    isVisible: boolean;
    onClose: () => void;
  }
>((props, ref) => {
  const { score, runningData, isVisible, onClose } = props;
  const resultsRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const scoreTextRef = useRef<HTMLSpanElement>(null);
  const scoreInfoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const messageFromScrorer = (score: number) => {
    if (score >= 90) {
      return "You're an elite runner with exceptional times!";
    } else if (score >= 70) {
      return "You're a strong runner with impressive times.";
    } else if (score >= 40) {
      return "You have solid running abilities. Keep up the good work!";
    }
    return "You're just starting your running journey. Every step counts!";
  };

  useGSAP(() => {
    if (isVisible) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(resultsRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(resultsRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: "back.in(1.7)",
      });
    }
  }, [isVisible]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 p-4 backdrop-blur-sm md:p-0"
      onClick={() => ref && typeof ref === "object" && "current" in ref && ref.current?.hide()}
    >
      <div
        ref={resultsRef}
        className="no-scrollbar max-h-[90dvh] w-full max-w-lg -space-y-4 overflow-y-auto rounded-xl bg-white p-6 shadow-lg md:max-h-[75dvh]"
      >
        <button
          aria-label="Close results"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            />
          </svg>
        </button>

        <h2 className="mb-10 text-center text-2xl">Your Running Performance</h2>
      </div>
    </div>
  );
});
Results.displayName = "Results";
