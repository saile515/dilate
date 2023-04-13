import Component from "./Component";
import Transform from "./components/Transform";

export default class Object {
	private components: Component[] = [];
	children: Object[] = [];
	parent: Object = null;

	constructor() {
		this.addComponent(new Transform());
	}

	addComponent(component: Component) {
		component.parent = this;
		this.components.push(component);
	}

	getComponent<T extends Component>(type: any) {
		return this.components.find((component) => component instanceof (type as any)) as
			| T
			| undefined;
	}

	add(object: Object) {
		object.parent = this;
		this.children.push(object);
	}
}
