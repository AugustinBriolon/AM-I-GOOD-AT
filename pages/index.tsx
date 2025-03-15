import { SKILLS } from "@/lib/type";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Home() {
  const skills = Object.values(SKILLS);
  const circleRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const textAnimationRef = useRef<gsap.core.Animation | null>(null);

  const getNameFromEmoji = (emoji: string) => {
    return Object.entries(SKILLS).find(([key, value]) => value === emoji)?.[0];
  };

  useGSAP(() => {
    if (!circleRef.current || !titleRef.current || !subtitleRef.current) return;

    const bubbles = circleRef.current.querySelectorAll(".skill-bubble");
    const radius = 250;
    const totalItems = bubbles.length;

    gsap.from(titleRef.current, {
      opacity: 0,
      filter: "blur(10px)",
      duration: 1,
      ease: "power1.out",
    });

    gsap.set(subtitleRef.current, {
      opacity: 0,
      y: 20,
    });

    bubbles.forEach((bubble, index) => {
      const angle = (index / totalItems) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      gsap.set(bubble, {
        x: x,
        y: y,
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        scale: 0,
      });

      gsap.to(bubble, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: 0.1 + index * 0.1,
        ease: "elastic.out(1,0.3)",
      });
    });
  }, []);

  const isExitingRef = useRef(false);

  useGSAP(() => {
    if (!subtitleRef.current) return;

    if (textAnimationRef.current) {
      textAnimationRef.current.kill();
    }

    if (hoveredSkill) {
      isExitingRef.current = false;
      textAnimationRef.current = gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else if (!isExitingRef.current) {
      isExitingRef.current = true;
      textAnimationRef.current = gsap
        .timeline({
          onComplete: () => {
            isExitingRef.current = false;
          },
        })
        .to(subtitleRef.current, {
          y: -20,
          duration: 0.3,
          ease: "power1.in",
        })
        .to(
          subtitleRef.current,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power1.in",
          },
          "-=0.1",
        )
        .set(subtitleRef.current, {
          y: 20,
        });
    }
  }, [hoveredSkill]);

  const handleMouseEnter = (index: number) => {
    const emojiValue = skills[index];
    const skillName = getNameFromEmoji(emojiValue);

    const formattedName = skillName
      ? skillName.charAt(0).toUpperCase() + skillName.slice(1).toLowerCase()
      : null;
    setHoveredSkill(formattedName);
  };

  const handleMouseLeave = () => {
    setHoveredSkill(null);
  };

  const [displaySkill, setDisplaySkill] = useState<string | null>(null);

  useGSAP(() => {
    if (hoveredSkill) {
      setDisplaySkill(hoveredSkill);
    }
  }, [hoveredSkill]);

  return (
    <div className="relative flex h-dvh w-screen flex-col items-center justify-center overflow-hidden bg-white">
      <div className="z-10 text-center">
        <h1 ref={titleRef} className="text-5xl text-black">
          Am I Good At
        </h1>

        <div className="mt-4 overflow-hidden">
          <h2 ref={subtitleRef} className="text-2xl text-black">
            {displaySkill ? `At ${displaySkill}` : ""}
          </h2>
        </div>
      </div>

      <div ref={circleRef} className="absolute top-1/2 left-1/2 h-0 w-0">
        {skills.map((skill, index) => (
          <Link
            key={index}
            className="skill-bubble absolute z-10 flex aspect-square h-14 w-14 scale-0 items-center justify-center rounded-full border border-black/20 bg-white p-2 text-xl opacity-0 shadow-sm"
            href={`/${getNameFromEmoji(skill)?.toLowerCase()}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <p>{skill}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
