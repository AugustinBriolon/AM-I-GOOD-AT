import { BackButton } from "@/composants/BackBoutton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function Page404() {
  const router = useRouter();
  const numberRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!numberRef.current || !backButtonRef.current || !messageRef.current) return;
    const tl = gsap.timeline();

    tl.from(numberRef.current, { opacity: 0, y: 30, duration: 0.7, ease: "power2.out" });
    tl.from(messageRef.current, { opacity: 0, y: 30, duration: 0.7, ease: "power2.out" }, "<+0.2");
    tl.from(
      backButtonRef.current,
      { opacity: 0, scale: 0.8, duration: 0.5, ease: "back.out(1.7)" },
      "<+0.1",
    );
  }, []);

  const playExitAnimation = () => {
    return new Promise<void>((resolve) => {
      const elements = [numberRef.current, messageRef.current, backButtonRef.current].filter(
        Boolean,
      );
      const tl = gsap.timeline({ onComplete: () => resolve() });
      tl.to(elements, {
        opacity: 0,
        y: 30,
        duration: 0.4,
        stagger: 0.15,
        ease: "power2.in",
      });
    });
  };

  const navigateBack = async () => {
    await playExitAnimation();
    router.push("/");
  };

  return (
    <div className="grain-bg relative flex min-h-dvh w-screen flex-col items-center justify-center overflow-hidden bg-white px-4">
      <div className="relative z-10 flex w-full flex-col items-center justify-center">
        <div
          ref={numberRef}
          className="animate-float bg-gradient-to-br from-black via-gray-700 to-gray-400 bg-clip-text text-[7rem] leading-none font-extrabold tracking-tight text-transparent drop-shadow-lg select-none md:text-[12rem]"
        >
          404
        </div>
        <div
          ref={messageRef}
          className="mt-4 mb-8 text-center text-lg font-medium text-gray-700 md:text-2xl"
        >
          Oups, cette page n'existe pas (encore)…
          <br />
          <span className="text-base text-gray-400">Mais tu peux revenir à tes skills !</span>
        </div>
        <BackButton ref={backButtonRef} onClick={navigateBack} />
      </div>
    </div>
  );
}
