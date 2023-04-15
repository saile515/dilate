import { keyMap, keyboard } from "./keyboard";

import Vector2 from "../core/Vector2";

export type InputMethod = "keyboard/mouse" | "onScreenControls";

export type InputType = Vector2 | number | boolean;

export class InputAction<T extends InputType> {
	name: string;
	private value_: T;
	thisFrame: boolean;
	delta: T;

	constructor(name: string) {
		this.name = name;
	}

	get value() {
		return this.value_;
	}

	setValue(value: T) {
		if (typeof value == "number") {
			this.delta = (value - (this.value_ as number)) as T;
		} else if (value instanceof Vector2) {
			this.delta = new Vector2(
				value.x - (this.value_ as Vector2).x,
				value.y - (this.value_ as Vector2).y
			) as T;
		} else {
			this.delta = null;
		}

		if (typeof value == "boolean") {
			if (value == true && this.value_ == false) this.thisFrame = true;
			else this.thisFrame = false;
		} else {
			this.thisFrame = null;
		}

		this.value_ = value;
	}
}

export default class InputHandler {
	private actions: InputAction<InputType>[] = [];
	inputMethod: InputMethod = "keyboard/mouse";

	constructor() {
		if (/Android|iPhone/i.test(navigator.userAgent)) {
			this.inputMethod = "onScreenControls";
			console.log(this.inputMethod);
		}
	}

	addAction(action: InputAction<InputType>) {
		this.actions.push(action);
	}

	getAction(name: string) {
		return this.actions.find((action) => action.name == name);
	}

	update() {
		if (this.inputMethod == "keyboard/mouse") {
			keyMap.forEach((action, key) => {
				this.getAction(action).setValue(keyboard.get(key));
			});
		}
	}
}
