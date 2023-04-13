import Object from "../game/Object";
import { useState } from "react";

export default function Game() {
	const [objects, setObjects] = useState<Object[]>([]);

	return (
		<div className="w-screen h-screen">
			<div className=""></div>
		</div>
	);
}
