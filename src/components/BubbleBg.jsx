import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const BubbleBackground = () => {
  const containerRef = useRef(null);
  const interactiveRef = useRef(null);

  useEffect(() => {
    const animateBubble = (className) => {
      gsap.to(`.${className}`, {
        x: `${Math.random() * 200 - 100}%`,
        y: `${Math.random() * 200 - 100}%`,
        opacity: Math.random() * 0.7 + 0.3,
        scale: Math.random() * 0.5 + 0.5,
        duration: 2 + Math.random() * 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    };

    for (let i = 1; i <= 30; i++) {
      animateBubble(`g${i}`);
    }

    const handleMouseMove = (e) => {
      gsap.to(interactiveRef.current, {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
        ease: "power1.out",
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const randomPosition = () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  });

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-black z-[1] h-screen w-full"
    >
      <svg className="absolute top-0 left-0 w-0 h-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 12 -6"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Bubbles (Stars) */}
      <div className="absolute inset-0 filter-[url(#goo)] blur-[8px] opacity-100">
        {[...Array(30)].map((_, i) => {
          const { top, left } = randomPosition();
          const colors = [
            "rgba(75,0,130,0.9)", // Dark Purple
            "rgba(93,63,211,0.9)", // Deep Violet
            "rgba(139,0,139,0.9)", // Dark Magenta
            "rgba(153,50,204,0.9)", // Dark Orchid
            "rgba(72,61,139,0.9)", // Dark Slate Purple
          ];
          return (
            <div
              key={i}
              className={`g${i + 1} absolute w-[24px] h-[24px] rounded-full`}
              style={{
                top,
                left,
                background: `radial-gradient(circle at center, ${colors[i % colors.length]} 0%, rgba(0,0,0,0) 70%)`,
                mixBlendMode: "screen",
                opacity: 0.9,
              }}
            />
          );
        })}

        {/* Mouse Interaction */}
        <div
          ref={interactiveRef}
          className="interactive absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(75,0,130,0.8)_0,rgba(75,0,130,0)_50%)] mix-blend-screen opacity-70"
        />
      </div>
    </div>
  );
};

export default BubbleBackground;
