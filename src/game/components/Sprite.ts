import Component from "../Component";

export default class Sprite extends Component {
	private sprite_: string = "";
	filter: string;

	constructor(sprite: string, filter?: string) {
		super();
		this.sprite_ = sprite;
		this.filter = filter ? filter : "";
	}

	get sprite() {
		return this.sprite_;
	}

	setSprite(sprite: string) {
		this.sprite_ = sprite;
	}
}
