import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CircuitLine = () => {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const target = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPoints();
    };

    const initPoints = () => {
      points.current = [];
      for (let x = 0; x < window.innerWidth; x += window.innerWidth / 20) {
        for (let y = 0; y < window.innerHeight; y += window.innerHeight / 20) {
          const px = x + Math.random() * window.innerWidth / 20;
          const py = y + Math.random() * window.innerHeight / 20;
          const p = { x: px, originX: px, y: py, originY: py };
          points.current.push(p);
        }
      }
      findClosestPoints();
    };

    const findClosestPoints = () => {
      points.current.forEach(p1 => {
        const closest = [];
        points.current.forEach(p2 => {
          if (p1 !== p2) {
            if (closest.length < 5) {
              closest.push(p2);
            } else {
              for (let i = 0; i < 5; i++) {
                if (getDistance(p1, p2) < getDistance(p1, closest[i])) {
                  closest[i] = p2;
                  break;
                }
              }
            }
          }
        });
        p1.closest = closest;
      });
    };

    const getDistance = (p1, p2) => {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    };

    const drawLines = (p) => {
      if (!p.active) return;
      ctx.beginPath();
      p.closest.forEach(closeP => {
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(closeP.x, closeP.y);
      });
      ctx.strokeStyle = `rgba(156, 217, 249, ${p.active})`;
      ctx.stroke();
    };

    const animatePoints = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.current.forEach(p => {
        const dist = getDistance(target.current, p);
        if (dist < 4000) p.active = 0.3;
        else if (dist < 20000) p.active = 0.1;
        else if (dist < 40000) p.active = 0.02;
        else p.active = 0;
        drawLines(p);
      });
      requestAnimationFrame(animatePoints);
    };

    const shiftPoint = (p) => {
      gsap.to(p, {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        duration: 1 + Math.random(),
        ease: 'circ.inOut',
        onComplete: () => shiftPoint(p),
      });
    };

    const handleMouseMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    resizeCanvas();
    points.current.forEach(shiftPoint);
    animatePoints();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />;
};

export default CircuitLine;