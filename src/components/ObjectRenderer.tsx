import { useEffect, useState } from "react";

import Object from "../game/Object";
import Sprite from "../game/components/Sprite";
import Transform from "../game/components/Transform";
import useWindowSize from "../hooks/getWindowSize";

export default function ObjectRenderer(props: { object: Object }) {
	const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [scale, setScale] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const windowSize = useWindowSize();

	useEffect(() => {
		const transform = props.object.getComponent<Transform>(Transform);

		setPosition({
			x: transform.position.x - transform.scale.x / 2,
			y: transform.position.y - transform.scale.y / 2,
		});

		const scaleFactor = windowSize.width / 10;
		setScale({ x: transform.scale.x * scaleFactor, y: transform.scale.y * scaleFactor });
	}, [windowSize]);

	return (
		<div
			className="absolute"
			style={{ left: position.x, top: position.y, width: scale.x, height: scale.y }}>
			<img src={props.object.getComponent<Sprite>(Sprite).sprite} alt="" />
			<div className="relative">
				{props.object.children.map((child, index) =>
					child.getComponent<Sprite>(Sprite) ? (
						<ObjectRenderer key={index} object={child} />
					) : null
				)}
			</div>
		</div>
	);
}
