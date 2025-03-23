import { forwardRef, useImperativeHandle, useRef, ReactNode, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

export type ModalRefHandle = {
  show: () => void;
  hide: () => void;
};

export const Modal = forwardRef<
  ModalRefHandle,
  {
    children: ReactNode;
    isVisible: boolean;
    onClose: () => void;
    title?: string;
    maxWidth?: string;
  }
>((props, ref) => {
  const { children, isVisible, onClose, title, maxWidth = "max-w-lg" } = props;
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(() => {
    if (isVisible) {
      lenis?.stop();
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(modalRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    } else {
      lenis?.start();
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: "back.in(1.7)",
      });
    }
  }, [isVisible]);

  useEffect(() => {
    const modalContent = contentRef.current;

    if (!modalContent) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isVisible) return;

      const { deltaY } = e;
      const { scrollTop, scrollHeight, clientHeight } = modalContent;

      const isAtTop = scrollTop === 0;
      const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 1;

      if ((deltaY > 0 && !isAtBottom) || (deltaY < 0 && !isAtTop)) {
        e.stopPropagation();
      }
    };

    modalContent.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      modalContent.removeEventListener("wheel", handleWheel);
    };
  }, [isVisible]);

  useImperativeHandle(ref, () => ({
    show: () => {
      lenis?.stop();
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
      if (modalRef.current) {
        gsap.to(modalRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        });
      }
    },
    hide: () => {
      lenis?.start();
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
      if (modalRef.current) {
        gsap.to(modalRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.4,
          ease: "back.in(1.7)",
          onComplete: onClose,
        });
      }
    },
  }));

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      if (ref && typeof ref === "object" && "current" in ref && ref.current?.hide) {
        ref.current.hide();
      }
    }
  };

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white/60 p-4 backdrop-blur-sm md:p-0 ${
        isVisible ? "pointer-events-auto" : "pointer-events-none opacity-0"
      }`}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`w-full ${maxWidth} flex max-h-[90dvh] scale-90 flex-col rounded-xl bg-white p-6 opacity-0 shadow-lg md:max-h-[75dvh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={() => {
            if (ref && typeof ref === "object" && "current" in ref && ref.current?.hide) {
              ref.current.hide();
            } else {
              onClose();
            }
          }}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            />
          </svg>
        </button>

        {title && <h2 className="mb-6 flex-shrink-0 text-center text-2xl text-black">{title}</h2>}

        <div
          ref={contentRef}
          className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex-grow overflow-y-auto pr-2 text-black"
        >
          {children}
        </div>
      </div>
    </div>
  );
});
Modal.displayName = "Modal";
