import Object from "./Object";
import Vector2 from "./Vector2";
import useWindowSize from "../hooks/useWindowSize";

export default class Scene {
	children: Object[] = [];
	cameraPosition: Vector2 = new Vector2(0, 0);
	private sceneObject: Object = new Object();
	private ctx: CanvasRenderingContext2D;
	private windowSize = new Vector2(window.innerWidth, window.innerHeight);

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
		this.ctx.fillStyle = "#020617";
		this.ctx.fillRect(0, 0, this.windowSize.x, this.windowSize.y);
	}
}
