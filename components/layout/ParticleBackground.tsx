"use client"; // Make sure to add this to the component

import { useEffect } from "react";

const ParticleEffect = () => {
  useEffect(() => {
    // Create canvas and set up particle animation
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    document.body.appendChild(canvas);

    // Initialize canvas size
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "-1";
    canvas.style.pointerEvents = "none";
    let num=20; 

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
        if (window.innerWidth<=768)
            num = 20
        else
        num = 100
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const particles = Array.from({ length: num }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1, // Random radius for particles
      dx: Math.random() - 0.5, // Random direction on x-axis
      dy: Math.random() - 0.5, // Random direction on y-axis
      speed: Math.random() * 0.5 + 0.5, // Random speed for each particle
      vx: 0, // Velocity on x-axis for easing
      vy: 0, // Velocity on y-axis for easing
    }));

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        // Draw the particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fillStyle = "#a78bfa";
        ctx.fill();

        // Move the particles freely
        particle.x += particle.dx * particle.speed;
        particle.y += particle.dy * particle.speed;

        // Interaction logic: Gradual movement away from the cursor
        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // If the particle is near the cursor (within 100px), move it away smoothly
        if (dist < 100) {
          const force = 0.2; // Gentle force for smooth movement
          particle.vx += (dx / dist) * force; // Apply force in x direction
          particle.vy += (dy / dist) * force; // Apply force in y direction
        }

        // Apply velocities with damping for smooth movement
        particle.vx *= 0.95; // Damping factor
        particle.vy *= 0.95; // Damping factor
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Ensure particles don't go out of bounds
        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
      });

      // Keep animating
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      canvas.remove();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return null;
};

export default ParticleEffect;
