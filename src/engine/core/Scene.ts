import InputHandler from "../input/InputHandler";
import Object from "./Object";
import Vector2 from "./Vector2";

export default class Scene {
	private children: Object[] = [];
	cameraPosition: Vector2 = new Vector2(0, 0);
	sceneObject: Object = new Object();
	ctx: CanvasRenderingContext2D;
	windowSize = new Vector2(window.innerWidth, window.innerHeight);
	clearColor: string = "#020617";
	inputHandler = new InputHandler();

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;

		window.addEventListener("resize", () => {
			this.windowSize.set(window.innerWidth, window.innerHeight);
		});
	}

	add(object: Object) {
		object.parent = this.sceneObject;
		this.children.push(object);
	}

	render() {
		this.ctx.fillStyle = this.clearColor;
		this.ctx.fillRect(0, 0, this.windowSize.x, this.windowSize.y);

		this.children.forEach((object) => {
			object.update();
		});
	}
}
