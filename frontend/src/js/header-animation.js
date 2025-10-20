const particleColor = '#12f7d6';
const particleSize = 4;
const particlesGap = 20;
const mouseRadius = 3000;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const animation = document.querySelector('.about__animation');

canvas.width = animation.offsetWidth * window.devicePixelRatio;
canvas.height = animation.offsetHeight * window.devicePixelRatio;
canvas.style.width = `${animation.offsetWidth}px`;
canvas.style.height = `${animation.offsetHeight}px`;

class Paricle {
  constructor(x, y, effect) {
    this.originX = x;
    this.originY = y;
    this.effect = effect;
    this.x = Math.floor(x); // Current x position
    this.y = Math.floor(y); // Current y position
    this.ctx = this.effect.ctx;
    this.ctx.fillStyle = particleColor;
    this.vx = 0;
    this.vy = 0;
    this.ease = 0.2; // Ease factor for returning to original position
    this.friction = 0.95; // Friction to slow down the particle
    this.dx = 0; // Difference in x between particle and mouse
    this.dy = 0; // Difference in y between particle and mouse
    this.distance = 0; // Distance from particle to mouse
    this.force = 0; // Force applied to the particle
    this.angle = 0; // Angle between particle and mouse
    this.size = Math.floor(Math.random() * particleSize); // Random particle size
    this.draw();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  // Update the particle's position and draw it
  update() {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy; // Squared distance for performance
    this.force = (-this.effect.mouse.radius / this.distance) * 8; // Calculate force based on distance

    // If the particle is within the mouse's influence radius
    if (this.distance < this.effect.mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx); // Calculate angle to mouse
      this.vx += this.force * Math.cos(this.angle); // Apply force in x direction
      this.vy += this.force * Math.sin(this.angle); // Apply force in y direction
    }

    // Update position with velocity and apply ease factor
    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
    this.draw();
  }
}

class Effect {
  constructor(width, height, context) {
    this.width = width;
    this.height = height;
    this.ctx = context;
    this.particlesArray = [];
    this.gap = particlesGap;
    this.mouse = {
      radius: mouseRadius, // Radius of mouse influence
      x: 0,
      y: 0,
    };

    animation.addEventListener('mousemove', (e) => {
      const rect = e.target.getBoundingClientRect();
      this.mouse.x = (e.clientX - rect.left) * window.devicePixelRatio;
      this.mouse.y = (e.clientY - rect.top) * window.devicePixelRatio;
    });

    animation.addEventListener('resize', () => {
      canvas.width = animation.innerWidth * window.devicePixelRatio;
      canvas.height = animation.innerHeight * window.devicePixelRatio;
      this.width = canvas.width;
      this.height = canvas.height;
      canvas.style.width = `${animation.innerWidth}px`;
      canvas.style.height = `${animation.innerHeight}px`;

      this.particlesArray = [];
      this.init();
    });

    this.init(); // Initial call to create particles
  }

  // Initialize particles in a grid pattern
  init() {
    for (let x = 0; x < this.width; x += this.gap) {
      for (let y = 0; y < this.height; y += this.gap) {
        this.particlesArray.push(new Paricle(x, y, this));
      }
    }
  }

  // Update all particles and clear the canvas for redrawing
  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.particlesArray.length; i++) {
      this.particlesArray[i].update();
    }
  }
}

let effect = new Effect(canvas.width, canvas.height, ctx);
function animate() {
  effect.update();
  requestAnimationFrame(animate); // Recursive call to animate
}
animate();
