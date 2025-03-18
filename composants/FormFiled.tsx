import { forwardRef } from "react";

export const FormField = forwardRef<
  HTMLDivElement,
  {
    label: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
  }
>((props, ref) => {
  const { label, name, placeholder, value, onChange, required } = props;

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <label className="block text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input
        className="w-full border-b border-gray-200 bg-transparent px-0 py-1 text-gray-800 transition-colors focus:border-gray-400 focus:outline-none"
        name={name}
        placeholder={placeholder}
        required={required}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
});
FormField.displayName = "FormField";
