import { WeightliftingDataType, weightRanges } from "@/lib/weightlifting-percentile";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { FormField } from "./FormFiled";

export type FormRefHandle = {
  animate: (timeline: gsap.core.Timeline) => void;
};

export const WeightliftingForm = forwardRef<
  FormRefHandle,
  {
    weightliftingData: WeightliftingDataType;
    onFieldChange: (name: string, value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    validationError: string | null;
    formFieldRefs: React.MutableRefObject<HTMLDivElement[]>;
  }
>((props, ref) => {
  const { weightliftingData, onFieldChange, onSubmit, formFieldRefs } = props;
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
    <form
      ref={formRef}
      className="my-40 flex w-full max-w-md flex-col gap-8 text-black"
      onSubmit={onSubmit}
    >
      <div ref={addFormItemRef} className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Gender</label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                checked={weightliftingData.gender === "male"}
                className="h-4 w-4"
                name="gender"
                type="radio"
                value="male"
                onChange={(e) => onFieldChange("gender", e.target.value)}
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                checked={weightliftingData.gender === "female"}
                className="h-4 w-4"
                name="gender"
                type="radio"
                value="female"
                onChange={(e) => onFieldChange("gender", e.target.value)}
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Bodyweight (kg)</label>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            max="200"
            min="30"
            name="bodyweight"
            step="0.1"
            type="number"
            value={weightliftingData.bodyweight}
            onChange={(e) => onFieldChange("bodyweight", e.target.value)}
          />
        </div>
      </div>

      <FormField
        ref={addFormItemRef}
        label="Bench Press (kg)"
        name="benchPress"
        ranges={weightRanges[weightliftingData.gender].benchPress}
        selectedValue={weightliftingData.benchPress}
        onChange={onFieldChange}
      />

      <FormField
        ref={addFormItemRef}
        label="Squat (kg)"
        name="squat"
        ranges={weightRanges[weightliftingData.gender].squat}
        selectedValue={weightliftingData.squat}
        onChange={onFieldChange}
      />

      <FormField
        ref={addFormItemRef}
        label="Deadlift (kg)"
        name="deadlift"
        ranges={weightRanges[weightliftingData.gender].deadlift}
        selectedValue={weightliftingData.deadlift}
        onChange={onFieldChange}
      />

      <FormField
        ref={addFormItemRef}
        label="Overhead Press (kg)"
        name="overheadPress"
        ranges={weightRanges[weightliftingData.gender].overheadPress}
        selectedValue={weightliftingData.overheadPress}
        onChange={onFieldChange}
      />

      <FormField
        ref={addFormItemRef}
        label="Pull-ups (reps)"
        name="pullUp"
        ranges={weightRanges[weightliftingData.gender].pullUp}
        selectedValue={weightliftingData.pullUp}
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
WeightliftingForm.displayName = "WeightliftingForm";
