import { THREE } from "~/exp"

/**
 *
 */
export class THREEEX {
	static newRandomColor = () => {
		return new THREE.Color(Math.random(), Math.random(), Math.random())
	}
}
