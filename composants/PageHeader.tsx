import { BackButton } from "@/composants/BackBoutton";
import { Title } from "@/composants/Title";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function PageHeader({ title }: { title: string }) {
  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const formItemsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline();

    if (titleRef.current) {
      tl.from(titleRef.current, {
        opacity: 0,
        filter: "blur(10px)",
        y: -30,
        duration: 1,
        ease: "power1.out",
      });
    }

    if (formItemsRef.current) {
      tl.from(formItemsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.4,
        ease: "power1.out",
      });
    }

    if (backButtonRef.current) {
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
    }
  }, []);

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
    <div className="fixed z-20 flex w-full items-center justify-center bg-white py-12">
      <BackButton ref={backButtonRef} onClick={navigateBack} />
      <Title ref={titleRef}>Am I Good At {title}?</Title>
    </div>
  );
}
