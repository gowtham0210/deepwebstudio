import { useEffect, useRef } from 'react';
import logoImage from '../assets/logo.png';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  angle: number;
  distance: number;
}

export default function ParticleLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const img = new Image();
    img.src = logoImage;

    img.onload = () => {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.6;
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;

      tempCanvas.width = scaledWidth;
      tempCanvas.height = scaledHeight;
      tempCtx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

      const imageData = tempCtx.getImageData(0, 0, scaledWidth, scaledHeight);
      const data = imageData.data;

      particles.current = [];
      const density = 3;

      for (let y = 0; y < scaledHeight; y += density) {
        for (let x = 0; x < scaledWidth; x += density) {
          const index = (y * scaledWidth + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 128) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 1000 + Math.random() * 500;

            particles.current.push({
              x: canvas.width / 2 + Math.cos(angle) * distance,
              y: canvas.height / 2 + Math.sin(angle) * distance,
              targetX: x + (canvas.width - scaledWidth) / 2,
              targetY: y + (canvas.height - scaledHeight) / 2,
              vx: 0,
              vy: 0,
              size: 1 + Math.random() * 1.5,
              opacity: 0.6 + Math.random() * 0.4,
              angle: angle,
              distance: distance,
            });
          }
        }
      }

      startTime.current = Date.now();
      animate();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const elapsed = Date.now() - startTime.current;
      const animationDuration = 1800;
      const progress = Math.min(elapsed / animationDuration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      particles.current.forEach((particle) => {
        let targetX = particle.targetX;
        let targetY = particle.targetY;

        const dx = mousePos.current.x - particle.x;
        const dy = mousePos.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 150;

        if (dist < repelRadius && dist > 0) {
          const force = (1 - dist / repelRadius) * 8;
          targetX = particle.targetX - (dx / dist) * force * 30;
          targetY = particle.targetY - (dy / dist) * force * 30;
        }

        if (progress < 1) {
          particle.x = particle.targetX + Math.cos(particle.angle) * particle.distance * (1 - easeProgress);
          particle.y = particle.targetY + Math.sin(particle.angle) * particle.distance * (1 - easeProgress);
        } else {
          const springStrength = 0.03;
          const damping = 0.85;

          particle.vx += (targetX - particle.x) * springStrength;
          particle.vy += (targetY - particle.y) * springStrength;

          particle.vx *= damping;
          particle.vy *= damping;

          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        const hue = 240;
        const brightness = 50 + Math.random() * 20;
        ctx.fillStyle = `hsla(${hue}, 100%, ${brightness}%, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ cursor: 'none' }}
    />
  );
}
