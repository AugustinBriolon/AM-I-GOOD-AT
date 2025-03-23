import { RunningDataType, timeRanges } from "@/lib/running-percentile";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { FormField } from "./FormFiled";

export type FormRefHandle = {
  animate: (timeline: gsap.core.Timeline) => void;
};

export const RunningForm = forwardRef<
  FormRefHandle,
  {
    runningData: RunningDataType;
    onFieldChange: (name: string, value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    validationError: string | null;
    formFieldRefs: React.MutableRefObject<HTMLDivElement[]>;
  }
>((props, ref) => {
  const { runningData, onFieldChange, onSubmit, formFieldRefs } = props;
  const formRef = useRef<HTMLFormElement>(null);

  const addFormItemRef = (el: HTMLDivElement | null) => {
    if (el && !formFieldRefs.current.includes(el)) {
      formFieldRefs.current.push(el);
    }
  };

  useImperativeHandle(ref, () => ({
    animate: (timeline: gsap.core.Timeline) => {
      if (!formRef.current) return;

      timeline.from(formRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    },
  }));

  return (
    <form ref={formRef} className="my-40 flex w-full max-w-md flex-col gap-8" onSubmit={onSubmit}>
      <FormField
        ref={addFormItemRef}
        label="1km Time"
        name="oneKm"
        ranges={timeRanges.oneKm}
        selectedValue={runningData.oneKm}
        onChange={onFieldChange}
      />

      <FormField
        ref={addFormItemRef}
        label="5km Time"
        name="fiveKm"
        ranges={timeRanges.fiveKm}
        selectedValue={runningData.fiveKm}
        onChange={onFieldChange}
      />

      <FormField
        ref={addFormItemRef}
        label="10km Time"
        name="tenKm"
        ranges={timeRanges.tenKm}
        selectedValue={runningData.tenKm}
        onChange={onFieldChange}
      />

      <FormField
        ref={addFormItemRef}
        label="Half Marathon Time"
        name="halfMarathonTime"
        ranges={timeRanges.halfMarathon}
        selectedValue={runningData.halfMarathonTime}
        onChange={onFieldChange}
      />

      <FormField
        ref={addFormItemRef}
        label="Marathon Time"
        name="marathonTime"
        ranges={timeRanges.marathon}
        selectedValue={runningData.marathonTime}
        onChange={onFieldChange}
      />

      <div ref={addFormItemRef} className="w-full">
        <button
          className="w-full cursor-pointer rounded-md bg-black py-2 text-white transition duration-200 hover:bg-gray-900"
          type="submit"
        >
          Evaluate
        </button>
      </div>
    </form>
  );
});
RunningForm.displayName = "RunningForm";
