import Color from "./core/Color";
import Object from "./core/Object";
import Transform from "./components/Transform";
import Vector2 from "./core/Vector2";
import worldToScreen from "./utils/worldToScreen";

class Particle {
	transform: Transform = new Transform();
	velocity: Vector2 = new Vector2(0, 0);
	acceleration: Vector2 = new Vector2(0, 0);
	lifespan: number = 1;
	destroy: () => void;

	constructor(lifespan: number) {
		this.lifespan = lifespan;
	}

	update() {
		this.velocity.add(this.acceleration.x, this.acceleration.y);
		this.transform.position.add(this.velocity.x, this.velocity.y);
		this.lifespan -= globalThis.scene.deltaTime;

		if (this.lifespan < 0) {
			this.destroy();
		}
	}
}

export default class ParticleSystem extends Object {
	color1: Color = new Color(255, 0, 0);
	color2: Color = new Color(128, 128, 0);
	intensity: number = 5;
	spread: number = 0.5;
	size: number = 3;
	lifespan: number = 0.5;
	direction: Vector2 = new Vector2(0, 1);
	speed: number = 1;
	private particles: Particle[] = [];

	update() {
		const transform = worldToScreen(this.getComponent<Transform>(Transform));
		const ctx = globalThis.scene.ctx;
		for (let i = 0; i < this.intensity; i++) {
			const particle = new Particle(this.lifespan);
			particle.acceleration.set(
				this.direction.x * this.speed + (Math.random() - 0.5) * this.spread,
				this.direction.y * this.speed + (Math.random() - 0.5) * this.spread
			);
			this.particles.push(particle);
		}

		this.particles.forEach((particle, index) => {
			particle.destroy = () => {
				this.particles.splice(index, 1);
			};

			particle.update();

			ctx.beginPath();
			ctx.arc(
				particle.transform.position.x + transform.position.x,
				particle.transform.position.y + transform.position.y,
				this.size,
				0,
				Math.PI * 2
			);
			ctx.fillStyle = `rgb(${
				(this.color1.r - this.color2.r) * (particle.lifespan / this.lifespan) +
				this.color2.r
			}, ${
				(this.color1.g - this.color2.g) * (particle.lifespan / this.lifespan) +
				this.color2.g
			}, ${
				(this.color1.b - this.color2.b) * (particle.lifespan / this.lifespan) +
				this.color2.b
			})`;
			ctx.fill();
		});
	}
}
