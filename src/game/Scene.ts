import Object from "./Object";

export default class Scene {
	private children: Object[] = [];
	private sceneObject: Object = new Object();

	add(object: Object) {
		object.parent = this.sceneObject;
		this.children.push(object);
	}
}
