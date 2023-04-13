import Object from "./Object";
import Vector2 from "./Vector2";

export default class Scene {
	children: Object[] = [];
	cameraPosition: Vector2 = new Vector2(0, 0);
	private sceneObject: Object = new Object();

	add(object: Object) {
		object.parent = this.sceneObject;
		this.children.push(object);
	}
}
