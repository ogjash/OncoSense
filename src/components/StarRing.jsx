import React,{ useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const particleColors = [
  '#FF00FF',
  '#DA70D6',
  '#BA55D3',
  '#9400D3',
  '#1E90FF',
  '#4169E1',
  '#0000FF',
  '#4B0082',
];

const getRandomColor = () => {
  return particleColors[Math.floor(Math.random() * particleColors.length)];
};

const StarRing = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const particleEmitters = useRef([]);
  const innerStars = useRef([]);
  const fps = 120;
  const radius = 200;
  const numInnerStars = 150;
  const starSize = 3;

  // Create particles for the ring
  const createParticles = () => {
    const numParticles = 2;
    let particles = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        position: { x: 0, y: 0 },
        velocity: { x: 0, y: Math.random() - 0.4 },
        alpha: 1,
        fadingSpeed: Math.random() * 0.03 + 0.005,
      });
    }

    return particles;
  };

  // Create inner stars
  const createInnerStars = () => {
    let stars = [];
    for (let i = 0; i < numInnerStars; i++) {
      stars.push({
        x: Math.random() * radius * 2 - radius,
        y: Math.random() * radius * 2 - radius,
        size: starSize,
        color: getRandomColor(),
      });
    }
    return stars;
  };

  // Update ring particles
  const updateParticles = () => {
    for (let emitter of particleEmitters.current) {
      for (let particle of emitter) {
        particle.position.x += Math.random() * 2 - 1;
        particle.position.y -= particle.velocity.y;
        particle.alpha -= particle.fadingSpeed;

        if (particle.alpha < 0) {
          particle.position = { x: 0, y: 0 };
          particle.velocity = { x: 0, y: Math.random() - 0.4 };
          particle.alpha = 1;
          particle.fadingSpeed = Math.random() * 0.03 + 0.005;
        }
      }
    }
  };

  // Render canvas
  const renderParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ring of particles
    for (let i = 0; i < particleEmitters.current.length; i++) {
      const emitter = particleEmitters.current[i];

      context.save();
      context.translate(canvas.width / 1.4, canvas.height / 2);
      context.rotate((i * Math.PI) / 180);

      for (let particle of emitter) {
        context.globalAlpha = particle.alpha;
        context.beginPath();
        context.arc(
          particle.position.x,
          radius - particle.position.y,
          starSize,
          0,
          Math.PI * 2
        );
        context.fillStyle = getRandomColor();
        context.fill();
        context.closePath();
      }

      context.restore();
    }

    // Draw inner moving stars
    innerStars.current.forEach((star) => {
      context.beginPath();
      context.arc(
        canvas.width / 1.4 + star.x,
        canvas.height / 2 + star.y,
        star.size,
        0,
        Math.PI * 2
      );
      context.fillStyle = star.color;
      context.fill();
      context.closePath();
    });
  };

  // Animate inner stars
  const animateInnerStars = () => {
    innerStars.current.forEach((star) => {
      gsap.to(star, {
        x: Math.random() * radius * 2 - radius,
        y: Math.random() * radius * 2 - radius,
        duration: Math.random() * 3 + 1,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create ring particles and inner stars
    particleEmitters.current = Array.from({ length: 360 }, createParticles);
    innerStars.current = createInnerStars();

    // Start GSAP animations
    animateInnerStars();

    // Update loop for ring particles
    const ticker = gsap.ticker.add(() => {
      updateParticles();
      renderParticles();
    });
    gsap.ticker.fps(fps);

    // Handle canvas resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initial pop-out animation
    gsap.fromTo(containerRef.current,
      {
        scale: 0.1,
        opacity: 0,
        transformOrigin: `${window.innerWidth / 1.4}px ${window.innerHeight / 2}px`
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)"
      }
    );

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[2]">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full blur-[1px] opacity-90"
      />
    </div>
  );
};

export default StarRing;
