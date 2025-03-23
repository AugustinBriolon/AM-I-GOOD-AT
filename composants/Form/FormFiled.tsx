import { forwardRef } from "react";

export type TimeRange = {
  label: string;
  value: string;
};

type FormFieldProps = {
  label: string;
  name: string;
  ranges: TimeRange[];
  selectedValue?: string;
  onChange: (name: string, value: string) => void;
};

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, name, ranges, selectedValue, onChange }, ref) => {
    const handleClick = (clickedValue: string) => {
      if (clickedValue === selectedValue) {
        onChange(name, "");
      } else {
        onChange(name, clickedValue);
      }
    };

    return (
      <div ref={ref} className="flex flex-col gap-2">
        <label className="block text-black">{label}</label>
        <div className="grid gap-2 md:grid-cols-2">
          {ranges.map((range, i) => {
            const isSelected = range.value === selectedValue;

            return (
              <button
                key={i}
                type="button"
                className={`cursor-pointer rounded border ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 text-black hover:bg-gray-100"
                } px-2.5 py-1 shadow transition duration-200`}
                onClick={() => handleClick(range.value)}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);
FormField.displayName = "FormField";
