import Transform from "../components/Transform";
import Vector2 from "../core/Vector2";

export default function worldToScreen(transform: Transform) {
	const scaleFactor = scene.windowSize.x / 10;

	const x =
		(transform.position.x - transform.scale.x / 2 - scene.cameraPosition.x) * scaleFactor +
		scene.windowSize.x / 2;
	const y =
		(-transform.position.y - transform.scale.y / 2 + scene.cameraPosition.y) * scaleFactor +
		scene.windowSize.y / 2;

	const width = transform.scale.x * scaleFactor;
	const height = transform.scale.y * scaleFactor;

	const screenSpace = new Transform();
	screenSpace.setPosition(new Vector2(x, y));
	screenSpace.setScale(new Vector2(width, height));

	return screenSpace;
}
