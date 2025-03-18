import { forwardRef, ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(({ children }, ref) => {
  return (
    <h1
      ref={ref}
      className="absolute top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-5xl text-black"
    >
      {children}
    </h1>
  );
});
