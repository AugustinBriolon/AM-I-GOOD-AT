import { BackButton } from "@/composants/BackBoutton";
import { RunnnigModal, ResultsRefHandle } from "@/composants/Modal/RunnnigModal";
import { FormRefHandle, RunningForm } from "@/composants/Form/RunningForm";
import { Title } from "@/composants/Title";
import { RunningDataType, runningPercentile } from "@/lib/running-percentile";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function Running() {
  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
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
    if (!titleRef.current || !formRef.current || !backButtonRef.current) return;

    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      opacity: 0,
      filter: "blur(10px)",
      y: -30,
      duration: 1,
      ease: "power1.out",
    });

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

    tl.from(
      backButtonRef.current,
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=0.2",
    );
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

  const playExitAnimation = () => {
    return new Promise<void>((resolve) => {
      const elements = [titleRef.current, backButtonRef.current, formItemsRef.current].filter(
        Boolean,
      );

      const tl = gsap.timeline({
        onComplete: () => resolve(),
      });

      tl.to(elements, {
        opacity: 0,
        y: 30,
        duration: 0.4,
        stagger: 0.2,
        ease: "power2.in",
      });
    });
  };

  const navigateBack = async () => {
    await playExitAnimation();
    router.push("/");
  };

  return (
    <div className="relative flex min-h-dvh w-screen flex-col items-center justify-start bg-white px-4">
      <div className="fixed z-20 flex w-full items-center justify-center bg-white py-12">
        <BackButton ref={backButtonRef} onClick={navigateBack} />
        <Title ref={titleRef}>Am I Good At Running?</Title>
      </div>

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
