import * as THREE from 'three';

// Create a reusable MouseTracker class
class MouseTracker {
  constructor() {
    this.mouse = new THREE.Vector2();
    this.onPointerMove = this.onPointerMove.bind(this);
  }

  // Update mouse position
  onPointerMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  // Start tracking mouse movements
  start() {
    window.addEventListener('mousemove', this.onPointerMove, false);
  }

  // Stop tracking mouse movements
  stop() {
    window.removeEventListener('mousemove', this.onPointerMove, false);
  }
}

// Export an instance of MouseTracker
const mouseTracker = new MouseTracker();
mouseTracker.start();

export { mouseTracker };