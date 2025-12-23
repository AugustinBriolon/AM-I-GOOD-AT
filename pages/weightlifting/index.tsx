import { FormRefHandle, WeightliftingForm } from "@/composants/Form/WeightliftingForm";
import { ResultsRefHandle, WeightliftingModal } from "@/composants/Modal/WeightliftingModal";
import PageHeader from "@/composants/PageHeader";
import { WeightliftingDataType, weightliftingPercentile } from "@/lib/weightlifting-percentile";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function Weightlifting() {
  const formRef = useRef<FormRefHandle>(null);
  const resultsRef = useRef<ResultsRefHandle>(null);
  const formItemsRef = useRef<HTMLDivElement[]>([]);

  const [weightliftingData, setWeightliftingData] = useState<WeightliftingDataType>({
    benchPress: "",
    squat: "",
    deadlift: "",
    overheadPress: "",
    pullUp: "",
    bodyweight: "",
    gender: "male",
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
    setWeightliftingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const hasBodyweight = weightliftingData.bodyweight.trim() !== "";
    const hasBenchPress = weightliftingData.benchPress.trim() !== "";
    const hasSquat = weightliftingData.squat.trim() !== "";
    const hasDeadlift = weightliftingData.deadlift.trim() !== "";
    const hasOverheadPress = weightliftingData.overheadPress.trim() !== "";
    const hasPullUp = weightliftingData.pullUp.trim() !== "";

    if (!hasBodyweight) {
      setValidationError("Please enter your bodyweight");
      return false;
    }

    const hasAtLeastOneExercise =
      hasBenchPress || hasSquat || hasDeadlift || hasOverheadPress || hasPullUp;

    if (!hasAtLeastOneExercise) {
      setValidationError("Please enter at least one exercise");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return toast.error(
        validationError || "Please enter your bodyweight and at least one exercise",
      );
    }

    const calculatedScore = weightliftingPercentile(weightliftingData);
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
      <PageHeader title="Weightlifting" />

      <WeightliftingForm
        ref={formRef}
        formFieldRefs={formItemsRef}
        validationError={validationError}
        weightliftingData={weightliftingData}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
      />

      {formSubmitted && (
        <WeightliftingModal
          ref={resultsRef}
          isVisible={formSubmitted}
          score={score}
          weightliftingData={weightliftingData}
          onClose={handleCloseResults}
        />
      )}
    </div>
  );
}
