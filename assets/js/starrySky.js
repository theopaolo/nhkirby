export function initializeStarrySky(starsCanvas) {
  const ctx = starsCanvas.getContext('2d');
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  const stars = [];

  function createStar() {
    return {
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      radius: random(0.1, 0.7),
      opacity: random(0.2, 0.6),
      speed: random(0.0003, 0.0007),
      positionChangeTimer: random(500, 1000)
    };
  }

  function createStars() {
    const numberOfStars = 100;
    for (let i = 0; i < numberOfStars; i++) {
      stars.push(createStar());
    }
  }

  function drawStars() {
    ctx.fillStyle = 'rgba(13, 13, 13, 0.4)';
    ctx.fillRect(0, 0, starsCanvas.width, starsCanvas.height);

    stars.forEach(star => {
      star.positionChangeTimer--;
      if (star.positionChangeTimer <= 0) {
        star.x = Math.random() * starsCanvas.width;
        star.y = Math.random() * starsCanvas.height;
        star.positionChangeTimer = random(500, 1000);
      }

      // Draw star
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();

      // Star glow
      const gradient = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.radius * 3
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.3})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
      ctx.fill();

      // Update twinkling
      star.opacity += star.speed;
      if (star.opacity > 0.6 || star.opacity < 0.2) {
        star.speed = -star.speed;
      }
    });

    requestAnimationFrame(drawStars);
  }

  createStars();
  drawStars();

  window.addEventListener('resize', () => {
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
    stars.length = 0;
    createStars();
  });
}
