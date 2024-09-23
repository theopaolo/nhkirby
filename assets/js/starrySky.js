export function initializeStarrySky(starsCanvas) {
  const ctx = starsCanvas.getContext('2d');

  // Set canvas size to the size of the window
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;

  // Function to generate a random number within a range
  function random(min, max) {
      return Math.random() * (max - min) + min;
  }

  // Create an array to store star objects
  const stars = [];

  function createStars() {
      const numberOfStars = 300; // Number of stars to draw

      for (let i = 0; i < numberOfStars; i++) {
          stars.push({
              x: Math.random() * starsCanvas.width,
              y: Math.random() * starsCanvas.height,
              radius: random(0.1, 0.7),
              opacity: random(0.2, .6),
              speed: random(0.005, 0.01),
          });
      }
  }

  // Function to draw stars
  function drawStars() {
      ctx.fillStyle = '#0d0d0d';
      ctx.fillRect(0, 0, starsCanvas.width, starsCanvas.height);

      stars.forEach(star => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.fill();

          // Update the opacity to create a twinkling effect
          star.opacity += star.speed;
          if (star.opacity > 1 || star.opacity < 0) {
              star.speed = -star.speed; // Reverse direction when reaching limits
          }
      });

      requestAnimationFrame(drawStars); // Animate
  }

  // Create the stars and start the animation
  createStars();
  drawStars();

  // Redraw on window resize
  window.addEventListener('resize', () => {
      starsCanvas.width = window.innerWidth;
      starsCanvas.height = window.innerHeight;
      stars.length = 0; // Clear existing stars
      createStars(); // Recreate stars for the new size
  });
}
