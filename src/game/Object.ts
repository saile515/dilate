import Component from "./Component";

export default class Object {
	private components: Component[] = [];
	private children: Object[] = [];
	parent: Object = null;

	addComponent(component: Component) {
		component.parent = this;
		this.components.push(component);
	}

	add(object: Object) {
		object.parent = this;
		this.children.push(object);
	}
}
