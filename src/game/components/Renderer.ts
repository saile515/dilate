import Component from "../Component";

export default class Sprite extends Component {
	private sprite_: string = "";

	constructor(sprite: string) {
		super();
		this.sprite_ = sprite;
	}

	get sprite() {
		return this.sprite_;
	}

	setSprite(sprite: string) {
		this.sprite_ = sprite;
	}
}
