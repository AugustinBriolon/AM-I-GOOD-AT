import { forwardRef, ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(({ children }, ref) => {
  return (
    <h1
      ref={ref}
      className="text-center text-3xl text-black md:absolute md:top-12 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:transform md:text-5xl md:whitespace-nowrap"
    >
      {children}
    </h1>
  );
});
