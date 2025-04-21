"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight * 0.9; // Just hero height

    const dots = [];
    const dotCount = 80;
    const maxDistance = 100;

    for (let i = 0; i < dotCount; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    let mouse = { x: null, y: null };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot, i) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        // bounce off edges
        if (dot.x <= 0 || dot.x >= width) dot.vx *= -1;
        if (dot.y <= 0 || dot.y >= height) dot.vy *= -1;

        // draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#888"; // soft gray
        ctx.fill();

        // draw lines
        for (let j = i + 1; j < dotCount; j++) {
          const dx = dot.x - dots[j].x;
          const dy = dot.y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(136, 136, 136, ${1 - dist / maxDistance})`;
            ctx.stroke();
          }
        }

        // mouse interaction
        if (mouse.x && mouse.y) {
          const dx = dot.x - mouse.x;
          const dy = dot.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / maxDistance})`;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight * 0.9;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", () => {});
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Hi, I'm [Your Name]</h1>
        <p className="text-xl max-w-xl mx-auto">
          I build clean, interactive websites and digital experiences.
        </p>
      </div>
    </section>
  );
}
