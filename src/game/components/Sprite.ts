import Component from "../Component";
import Transform from "./Transform";
import worldToScreen from "../utils/worldToScreen";

export default class Sprite extends Component {
	private sprite_: string = "";
	private htmlImage: HTMLImageElement = document.createElement("img");

	constructor(sprite: string) {
		super();

		this.setSprite(sprite);
	}

	get sprite() {
		return this.sprite_;
	}

	setSprite(sprite: string) {
		this.sprite_ = sprite;
		this.htmlImage.src = this.sprite;
	}

	update() {
		const transform = this.parent.getComponent<Transform>(Transform);

		const screenSpace = worldToScreen(transform);

		globalThis.scene.ctx.drawImage(
			this.htmlImage,
			screenSpace.position.x,
			screenSpace.position.y,
			screenSpace.scale.x,
			screenSpace.scale.y
		);
	}
}
