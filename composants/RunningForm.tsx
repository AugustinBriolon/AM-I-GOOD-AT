import { RunningDataType } from "@/lib/running-percentile";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { FormField } from "./FormFiled";

export type FormRefHandle = {
  animate: (timeline: gsap.core.Timeline) => void;
};

export const RunningForm = forwardRef<
  FormRefHandle,
  {
    runningData: RunningDataType;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    validationError: string | null;
    formFieldRefs: React.MutableRefObject<HTMLDivElement[]>;
  }
>((props, ref) => {
  const { runningData, onInputChange, onSubmit, validationError, formFieldRefs } = props;
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
        y: 30,
        duration: 0.5,
        ease: "power2.out",
      });
    },
  }));

  return (
    <form
      ref={formRef}
      className="relative z-10 flex w-full max-w-md flex-col gap-8 bg-white p-6"
      onSubmit={onSubmit}
    >
      <FormField
        ref={addFormItemRef}
        label="1km Time (mm:ss)"
        name="oneKm"
        placeholder="e.g. 4:30"
        value={runningData.oneKm}
        required
        onChange={onInputChange}
      />

      <FormField
        ref={addFormItemRef}
        label="5km Time (mm:ss)"
        name="fiveKm"
        placeholder="e.g. 25:00"
        value={runningData.fiveKm}
        required
        onChange={onInputChange}
      />

      <FormField
        ref={addFormItemRef}
        label="10km Time (hh:mm:ss)"
        name="tenKm"
        placeholder="e.g. 55:30"
        value={runningData.tenKm}
        required
        onChange={onInputChange}
      />

      <FormField
        ref={addFormItemRef}
        label="Half Marathon Time (hh:mm:ss)"
        name="halfMarathonTime"
        placeholder="e.g. 1:45:30"
        value={runningData.halfMarathonTime}
        onChange={onInputChange}
      />

      <FormField
        ref={addFormItemRef}
        label="Marathon Time (hh:mm:ss)"
        name="marathonTime"
        placeholder="e.g. 3:45:00"
        value={runningData.marathonTime}
        onChange={onInputChange}
      />

      {validationError && <div className="mb-4 text-sm text-red-500">{validationError}</div>}

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
