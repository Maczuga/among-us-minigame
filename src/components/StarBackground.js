import "./StarBackground.scss";
import {random} from "../lib";

const MIN_SIZE = 1;
const MAX_SIZE = 5;
const MAX_CIRCLES = 100;

export class StarBackground extends HTMLCanvasElement {
  constructor() {
    super();

    this.circles = [];
    this.resizeTimeout = null;

    window.addEventListener("resize", () => this.onResize());
  }

  connectedCallback() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.buildCircles();
    this.animate();
  }

  onResize() {
    clearTimeout(this.resizeTimeout);

    const context = this.getContext("2d");
    context.clearRect(0, 0, this.width, this.height);

    this.resizeTimeout = setTimeout(() => {
      if (this.animationFrame)
        this.cancelAnimationFrame()(this.animationFrame);

      this.connectedCallback();
    }, 100);
  }

  animate() {
    const context = this.getContext("2d");
    context.clearRect(0, 0, this.width, this.height);

    this.buildFrame();
    this.animationFrame = this.requestAnimationFrame()(() => this.animate());
  }

  buildFrame() {
    const canvas = this;
    const context = this.getContext("2d");

    for (let i = 0; i < this.circles.length; i++) {
      const circle = this.circles[i];

      context.fillStyle = "white";
      context.beginPath();

      if (circle.left > canvas.width + circle.size) {
        // Outside, move to the start
        circle.left = 0 - circle.size;
      } else {
        // Move forward
        circle.left = circle.left + circle.speed;
      }

      this.drawCircle(context, circle);

      context.closePath();
      context.fill();
    }
  }

  drawCircle(context, circle) {
    context.arc(circle.left, circle.top, circle.size, 0, 2 * Math.PI, false);
  }

  buildCircles() {
    const canvas = this;

    this.circles = [];
    for (let i = 0; i < MAX_CIRCLES; i++) {
      const left = random(0, canvas.width);
      const top = random(0, canvas.height);
      const size = random(MIN_SIZE, MAX_SIZE);

      const speed = Math.max(1, MAX_SIZE - size) / 5; // The bigger the slower

      const circle = {left, top, size, speed, expandState: true};
      this.circles.push(circle);
    }
  }

  requestAnimationFrame(callback) {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function () {
        window.setTimeout(callback, 1000 / 60);
      };
  }

  cancelAnimationFrame(id) {
    return window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      window.msCancelAnimationFrame ||
      function () {
        window.clearTimeout(id);
      };
  }

}

customElements.define("star-background", StarBackground, {extends: "canvas"});
