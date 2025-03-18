import { forwardRef } from "react";

export const BackButton = forwardRef<
  HTMLButtonElement,
  {
    onClick: () => void;
  }
>((props, ref) => {
  return (
    <button
      ref={ref}
      className="absolute top-8 left-6 flex cursor-pointer items-center text-gray-400 transition-colors duration-300 hover:text-gray-600"
      onClick={props.onClick}
    >
      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
      </svg>
      Back to Skills
    </button>
  );
});
BackButton.displayName = "BackButton";
