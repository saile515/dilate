import { useEffect, useState } from "react";

import Object from "../game/Object";
import ObjectRenderer from "./ObjectRenderer";
import { init } from "../game/main";
import useWindowSize from "../hooks/getWindowSize";

export default function Game() {
	const [objects, setObjects] = useState<Object[]>([]);
	const windowSize = useWindowSize();

	useEffect(() => {
		init(setObjects);
	}, []);

	return (
		<div className="w-screen h-screen">
			<div className="relative min-h-screen w-screen">
				{objects.map((object, index) => (
					<ObjectRenderer key={index} object={object} />
				))}
			</div>
		</div>
	);
}
