import { SKILLS } from "@/lib/type";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function Home() {
  const router = useRouter();
  const skills = Object.values(SKILLS);
  const circleRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const textAnimationRef = useRef<gsap.core.Animation | null>(null);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);

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

  const playExitAnimation = (url: string) => {
    if (!circleRef.current || !titleRef.current) return;

    const bubbles = circleRef.current.querySelectorAll(".skill-bubble");
    const timeline = gsap.timeline({
      onComplete: () => {
        router.push(url);
      },
    });

    timeline.to(titleRef.current, {
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.5,
      ease: "power1.in",
    });

    if (subtitleRef.current && subtitleRef.current.style.opacity !== "0") {
      timeline.to(
        subtitleRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power1.in",
        },
        "-=0.3",
      );
    }

    bubbles.forEach((bubble, index) => {
      timeline.to(
        bubble,
        {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          ease: "back.in(1.7)",
        },
        `-=${index > 0 ? 0.2 : 0}`,
      );
    });

    return timeline;
  };

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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    setTargetUrl(url);
    playExitAnimation(url);
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
          <h2 ref={subtitleRef} className="h-8 text-2xl text-black">
            {displaySkill ? `At ${displaySkill}` : ""}
          </h2>
        </div>
      </div>

      <div ref={circleRef} className="absolute top-1/2 left-1/2 h-0 w-0">
        {skills.map((skill, index) => {
          const skillName = getNameFromEmoji(skill);
          const url = `/${skillName?.toLowerCase()}`;
          return (
            <a
              key={index}
              className="skill-bubble absolute z-10 flex aspect-square h-14 w-14 scale-0 cursor-pointer items-center justify-center rounded-full border border-black/20 bg-white p-2 text-xl opacity-0 shadow-sm hover:bg-black/5 hover:shadow-md"
              href={url}
              onClick={(e) => handleLinkClick(e, url)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <p>{skill}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
