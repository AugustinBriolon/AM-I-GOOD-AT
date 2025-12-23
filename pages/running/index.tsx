import { FormRefHandle, RunningForm } from "@/composants/Form/RunningForm";
import { ResultsRefHandle, RunnnigModal } from "@/composants/Modal/RunnnigModal";
import PageHeader from "@/composants/PageHeader";
import { RunningDataType, runningPercentile } from "@/lib/running-percentile";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function Running() {
  const formRef = useRef<FormRefHandle>(null);
  const resultsRef = useRef<ResultsRefHandle>(null);
  const formItemsRef = useRef<HTMLDivElement[]>([]);

  const [runningData, setRunningData] = useState<RunningDataType>({
    oneKm: "",
    fiveKm: "",
    tenKm: "",
    hasHalfMarathon: false,
    halfMarathonTime: "",
    hasMarathon: false,
    marathonTime: "",
  });

  const [score, setScore] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useGSAP(() => {
    if (!formRef.current) return;

    const tl = gsap.timeline();

    formRef.current.animate(tl);

    if (formItemsRef.current) {
      tl.from(formItemsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.4,
        ease: "power1.out",
      });
    }
  }, []);

  const handleFieldChange = (name: string, value: string) => {
    if (name === "halfMarathonTime") {
      setRunningData((prev) => ({
        ...prev,
        [name]: value,
        hasHalfMarathon: value !== "",
      }));
    } else if (name === "marathonTime") {
      setRunningData((prev) => ({
        ...prev,
        [name]: value,
        hasMarathon: value !== "",
      }));
    } else {
      setRunningData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = (): boolean => {
    const hasOneKm = runningData.oneKm.trim() !== "";
    const hasFiveKm = runningData.fiveKm.trim() !== "";
    const hasTenKm = runningData.tenKm.trim() !== "";
    const hasHalfMarathon = runningData.halfMarathonTime.trim() !== "";
    const hasMarathon = runningData.marathonTime.trim() !== "";

    const hasAtLeastOneTime = hasOneKm || hasFiveKm || hasTenKm || hasHalfMarathon || hasMarathon;

    if (!hasAtLeastOneTime) {
      setValidationError("Please enter at least one running time");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return toast.error("Please enter at least one running time");
    }

    const calculatedScore = runningPercentile(runningData);
    setScore(calculatedScore);
    setFormSubmitted(true);

    if (resultsRef.current) {
      resultsRef.current.show();
    }
  };

  const handleCloseResults = () => {
    setFormSubmitted(false);
    setScore(null);
  };

  return (
    <div className="relative flex min-h-dvh w-screen flex-col items-center justify-start bg-white px-4">
      <PageHeader title="Running" />

      <RunningForm
        ref={formRef}
        formFieldRefs={formItemsRef}
        runningData={runningData}
        validationError={validationError}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
      />

      {formSubmitted && (
        <RunnnigModal
          ref={resultsRef}
          isVisible={formSubmitted}
          runningData={runningData}
          score={score}
          onClose={handleCloseResults}
        />
      )}
    </div>
  );
}
